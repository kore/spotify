<?php

namespace Kore\Spotify\SpotifyBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Route;

use QafooLabs\MVC\TokenContext;
use QafooLabs\MVC\RedirectRouteResponse;

use Kore\Spotify\SpotifyBundle\Controller\Index\Context;
use Kore\Spotify\SpotifyBundle\Domain\DbusResponseParser;
use Kore\Spotify\SpotifyBundle\Domain\Session;

class IndexController extends Controller
{
    public function currentSongAction()
    {
        $command = $this->get('spotify.dbus.command');
        return new JsonResponse(
            array(
                'song' => $command->query(),
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

    public function tokensAction(Request $request)
    {
        $spotify = $this->get('spotify');
        $spotify->authentificate($request->get('code'));

        return new RedirectRouteResponse('spotify.frontend.index');
    }
}
