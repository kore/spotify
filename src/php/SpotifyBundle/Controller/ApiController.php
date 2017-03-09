<?php

namespace Kore\Spotify\SpotifyBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Route;

use QafooLabs\MVC\TokenContext;

use Kore\Spotify\SpotifyBundle\Controller\Index\Context;
use Kore\Spotify\SpotifyBundle\Domain\DbusResponseParser;

class ApiController extends Controller
{
    public function currentSongAction()
    {
        $this->get('spotify')->refresh();
        return new JsonResponse(
            array(
                'song' => $this->get('spotify.dbus.command')->query(),
            )
        );
    }

    public function playAction()
    {
        $this->get('spotify.dbus.command')->command('Play');
        return new JsonResponse(['ok' => true]);
    }

    public function pauseAction()
    {
        $this->get('spotify.dbus.command')->command('Pause');
        return new JsonResponse(['ok' => true]);
    }

    public function nextAction()
    {
        $this->get('spotify.dbus.command')->command('Next');
        return new JsonResponse(['ok' => true]);
    }

    public function previousAction()
    {
        $this->get('spotify.dbus.command')->command('Previous');
        return new JsonResponse(['ok' => true]);
    }

    public function playlistAction(string $playlist)
    {
        $spotify = $this->get('spotify');

        if (!preg_match('(^spotify:user:(?P<user>[^:]+):playlist:(?P<playlist>[^:]+)$)', $playlist, $match)) {
            throw new \OutOfBoundsException("Invalid playlist specifier");
        }

        return new JsonResponse($spotify->getUserPlaylist($match['user'], $match['playlist']));
    }
}
