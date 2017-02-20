<?php

namespace Kore\Spotify\SpotifyBundle\Domain;

class DbusResponseParserTest extends \PHPUnit_Framework_TestCase
{
    public function testParseResult()
    {
        $parser = new DbusResponseParser();
        $result = $parser->parse(file_get_contents(__DIR__ . '/_fixtures/response.txt'));

        $this->assertEquals(
            new Result(array(
                'metaData' => array (
                    'time' => '1487584592.064077',
                    'sender' => ':1.2311',
                    'destination' => ':1.2390',
                    'serial' => '130',
                    'reply_serial' => '2',
                ),
                'result' => array (
                    'mpris:trackid' => 'spotify:track:4JdreOkSMxe3jMJsg7LhC4',
                    'mpris:length' => 259866000,
                    'mpris:artUrl' => 'https://open.spotify.com/image/5cec7b8cac92785b29bc4ad6f0515084479ef66e',
                    'xesam:album' => 'Oracle',
                    'xesam:albumArtist' => array (
                        'Michael Hedges',
                    ),
                    'xesam:artist' => array (
                        'Michael Hedges',
                    ),
                    'xesam:autoRating' => 0.33000000000000002,
                    'xesam:discNumber' => 1,
                    'xesam:title' => 'When I Was 4',
                    'xesam:trackNumber' => 13,
                    'xesam:url' => 'https://open.spotify.com/track/4JdreOkSMxe3jMJsg7LhC4',
                ),
            )),
            $result
        );
    }

    public function parseFileData()
    {
        return array_map(
            function (string $path) {
                return [$path];
            },
            glob(__DIR__ . '/_fixtures/example_*.txt')
        );
    }

    /**
     * @dataProvider parseFileData
     */
    public function testParseFile($file)
    {
        $parser = new DbusResponseParser();
        $result = $parser->parse(file_get_contents($file));
    }
}
