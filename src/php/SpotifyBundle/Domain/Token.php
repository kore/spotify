<?php

namespace Kore\Spotify\SpotifyBundle\Domain;

use Kore\DataObject\DataObject;

class Token extends DataObject
{
    public $type;
    public $line;
    public $position;
    public $match;

    public function __construct($type, $line, $position, $match)
    {
        $this->type = $type;
        $this->line = $line;
        $this->position = $position;
        $this->match = $match;
    }
}
