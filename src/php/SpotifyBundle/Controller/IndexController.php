<?php

namespace Kore\Spotify\SpotifyBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Route;

use QafooLabs\MVC\TokenContext;

use Kore\Spotify\SpotifyBundle\Controller\Index\Context;

class IndexController extends Controller
{
    public function currentSongAction(TokenContext $context)
    {
        // @TODO: Parse result
        $result = shell_exec("dbus-send --print-reply --session --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.freedesktop.DBus.Properties.Get string:'org.mpris.MediaPlayer2.Player' string:'Metadata'");

        return new JsonResponse(
            array(
                'song' => $result,
            )
        );
    }
}
