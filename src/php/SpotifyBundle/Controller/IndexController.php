<?php

namespace Kore\Spotify\SpotifyBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Route;

use QafooLabs\MVC\TokenContext;

use Kore\Spotify\SpotifyBundle\Controller\Index\Context;
use Kore\Spotify\SpotifyBundle\Domain\DbusResponseParser;

class IndexController extends Controller
{
    public function currentSongAction(TokenContext $context)
    {
        $result = shell_exec("dbus-send --print-reply --reply-timeout=100 --session --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.freedesktop.DBus.Properties.Get string:'org.mpris.MediaPlayer2.Player' string:'Metadata'");
        $parser = new DbusResponseParser();
        $result = $parser->parse($result);

        return new JsonResponse(
            array(
                'song' => $result,
            )
        );
    }

    public function tokensAction(Request $request)
    {
        $session = new \SpotifyWebAPI\Session(
            $this->getParameter('spotify.client.id'),
            $this->getParameter('spotify.client.secret'),
            $this->getParameter('spotify.redirect_url')
        );
		$api = new \SpotifyWebAPI\SpotifyWebAPI();

		$session->requestAccessToken($request->get('code'));

        return [
            'accessToken' => $session->getAccessToken(),
            'refreshToken' => $session->getRefreshToken(),
        ];
    }
}
