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
    public function myPlaylistsAction()
    {
        $spotify = $this->get('spotify');
        return new JsonResponse(
            $spotify->getMyPlaylists()
        );
    }
}
