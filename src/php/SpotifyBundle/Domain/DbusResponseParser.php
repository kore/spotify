<?php

namespace Kore\Spotify\SpotifyBundle\Domain;

use Kore\DataObject\DataObject;

class DbusResponseParser
{
    /**
     * Expressions for tokenizing the strings.
     *
     * @var array
     */
    protected $expressions = array(
        array(
            'type'  => self::T_WHITESPACE,
            'match' => '(\\A(?:\\s+|->))S'
        ),
        array(
            'type'  => self::T_RETURN,
            'match' => '(\\A(?P<name>method\\s+return))S'
        ),
        array(
            'type'  => self::T_META_DATA,
            'match' => '(\\A(?P<name>[a-z_]+)\\s*=\\s*(?P<value>\\S+))S'
        ),
        array(
            'type'  => self::T_DATA,
            'match' => '(\\A(?P<name>variant))S'
        ),
        array(
            'type'  => self::T_ARRAY_START,
            'match' => '(\\A(?P<name>array)\\s+\\[)S'
        ),
        array(
            'type'  => self::T_ARRAY_END,
            'match' => '(\\A\\])S'
        ),
        array(
            'type'  => self::T_PROPERTY_START,
            'match' => '(\\A(?P<name>dict)\\s+entry\\s*\\()S'
        ),
        array(
            'type'  => self::T_PROPERTY_END,
            'match' => '(\\A\\))S'
        ),
        array(
            'type'  => self::T_STRING,
            'match' => '(\\A(?P<type>string)\\s+"(?P<value>.*)"\\s*$)Sm'
        ),
        array(
            'type'  => self::T_INTEGER,
            'match' => '(\\A(?P<type>int16|uint16|int32|uint32|int64|uint64)\\s+(?P<value>[-0-9]+))Sm'
        ),
        array(
            'type'  => self::T_FLOAT,
            'match' => '(\\A(?P<type>double)\\s+(?P<value>[-0-9.]+))Sm'
        ),
        array(
            'type'  => self::T_VALUE,
            'match' => '(\\A(?P<type>int|char)\\s+(?P<name>[A-Za-z-]+)="(?P<value>[^"]+)"$)Sm'
        ),
    );

    /**
     * Tokens irrelevant to the parser, which will bee thrown away immediately
     *
     * @var array
     */
    protected $ignoreTokens = array(
        self::T_WHITESPACE,
    );

    const T_WHITESPACE      = 1;
    const T_EOF             = 3;
    const T_RETURN          = 10;
    const T_META_DATA       = 11;
    const T_DATA            = 12;
    const T_ARRAY_START     = 20;
    const T_ARRAY_END       = 21;
    const T_PROPERTY_START  = 22;
    const T_PROPERTY_END    = 23;
    const T_VALUE           = 30;
    const T_STRING          = 31;
    const T_INTEGER         = 32;
    const T_FLOAT           = 33;

    protected function tokenize(string $string): array
    {
        $line     = 1;
        $position = 1;
        $tokens   = array();

        while (strlen($string)) {
            foreach ($this->expressions as $rule) {
                if (!preg_match($rule['match'], $string, $match)) {
                    continue;
                }

                // Remove matched string from input
                $string = substr($string, strlen($match[0]));

                // Update position in file
                $line += substr_count($match[0], "\n");
                if (($pos = strrpos($match[0], "\n")) !== false) {
                    $position  = strrpos($match[0], "\n") + 1;
                } else {
                    $position += strlen($match[0]);
                }

                // Skip irrelevant rules
                if (in_array($rule['type'], $this->ignoreTokens)) {
                    continue 2;
                }

                // Add all other rules including their match to the token array
                $match = $this->removeNumericKeys($match);
                $tokens[] = new Token($rule['type'], $line, $position, $match);
                continue 2;
            }

            throw new \RuntimeException(
                "Could not parse string: '" . substr($string, 0, 20) . "' in line $line at position $position."
            );
        }

        $tokens[] = new Token(self::T_EOF, $line, $position, null);
        return $tokens;
    }

    protected function removeNumericKeys(array $array): array
    {
        foreach ($array as $key => $value) {
            if (!is_string($key)) {
                unset($array[$key]);
            }
        }

        return $array;
    }

    public function parse(string $string): Result
    {
        $tokens = new Stack($this->tokenize($string));

        $result = new Result();
        $this->reduceStruct($tokens, $result);

        return $result;
    }

    private function read(array $types, Stack $tokens): Token
    {
        $token = $tokens->shift();

        if (!in_array($token->type, $types, true)) {
            throw new \RuntimeException(
                "Expected one of: " . implode(', ', $types) . ", found " .
                $token->type .
                ". in line {$token->line} at position {$token->position}."
            );
        }

        return $token;
    }

    protected function reduceStruct(Stack $tokens, DataObject $parent)
    {
        $this->read(array(self::T_RETURN), $tokens);

        while (true) {
            switch ($tokens[0]->type) {
                case self::T_META_DATA:
                    $this->reduceMetaData($tokens, $parent);
                    continue 2;
                case self::T_DATA:
                    $this->reduceData($tokens, $parent);
                    continue 2;
                default:
                    $this->read(array(self::T_EOF), $tokens);
                    break 2;
            }
        }
    }

    protected function reduceMetaData(Stack $tokens, DataObject $parent)
    {
        $token = $this->read(array(self::T_META_DATA), $tokens);
        $parent->metaData[$token->match['name']] = $token->match['value'];
    }

    protected function reduceData(Stack $tokens, DataObject $parent)
    {
        $token = $this->read(array(self::T_DATA), $tokens);
        $parent->result = $this->reduceValue($tokens);
    }

    protected function reduceValue(Stack $tokens)
    {
        switch ($tokens[0]->type) {
            case self::T_ARRAY_START:
                return $this->reduceArray($tokens);
            case self::T_STRING:
                return $this->reduceString($tokens);
            case self::T_INTEGER:
                return $this->reduceInteger($tokens);
            case self::T_FLOAT:
                return $this->reduceFloat($tokens);
            default:
                $this->read(array(self::T_ARRAY_START, self::T_STRING, self::T_INTEGER, self::T_FLOAT), $tokens);
        }
    }

    protected function reduceArray(Stack $tokens)
    {
        $token = $this->read(array(self::T_ARRAY_START), $tokens);
        $array = new \ArrayObject();

        while (true) {
            switch ($tokens[0]->type) {
                case self::T_PROPERTY_START:
                    $this->reduceProperty($tokens, $array);
                    continue 2;
                case self::T_ARRAY_START:
                case self::T_STRING:
                case self::T_INTEGER:
                case self::T_FLOAT:
                    $array[] = $this->reduceValue($tokens);
                    continue 2;
                default:
                    $this->read(array(self::T_ARRAY_END), $tokens);
                    break 2;
            }
        }

        return $array->getArrayCopy();
    }

    protected function reduceProperty(Stack $tokens, \ArrayObject $parent)
    {
        $this->read(array(self::T_PROPERTY_START), $tokens);
        $name = $this->read(array(self::T_STRING), $tokens);
        $this->read(array(self::T_DATA), $tokens);
        $parent[$name->match['value']] = $this->reduceValue($tokens);
        $this->read(array(self::T_PROPERTY_END), $tokens);
    }

    protected function reduceString(Stack $tokens)
    {
        $value = $this->read(array(self::T_STRING), $tokens);
        return $value->match['value'];
    }

    protected function reduceInteger(Stack $tokens)
    {
        $value = $this->read(array(self::T_INTEGER), $tokens);
        return (int) $value->match['value'];
    }

    protected function reduceFloat(Stack $tokens)
    {
        $value = $this->read(array(self::T_FLOAT), $tokens);
        return (float) $value->match['value'];
    }
}
