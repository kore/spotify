<?php

namespace Kore\Spotify\SpotifyBundle\Domain;

use Symfony\Component\Process\Process;

class DbusCommand
{
    private $parser;

    public function __construct(DbusResponseParser $parser)
    {
        $this->parser = $parser;
    }

    public function command(string $command)
    {
        $process = new Process(
            "dbus-send " .
            "--print-reply " .
            "--reply-timeout=100 " .
            "--dest=org.mpris.MediaPlayer2.spotify " .
            "/org/mpris/MediaPlayer2 " .
            "org.mpris.MediaPlayer2.Player." . $command
        );
        $process->run();
    }

    public function query(): Result
    {
        $process = new Process(
            "dbus-send " .
            "--print-reply " .
            "--reply-timeout=100 " .
            "--session " .
            "--dest=org.mpris.MediaPlayer2.spotify " .
            "/org/mpris/MediaPlayer2 " .
            "org.freedesktop.DBus.Properties.Get " .
            "string:'org.mpris.MediaPlayer2.Player' " .
            "string:'Metadata'"
        );
        $process->run();

        return $this->parser->parse($process->getOutput());
    }
}
