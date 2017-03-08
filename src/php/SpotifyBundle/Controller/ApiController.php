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
    public function playlistAction(string $playlist)
    {
        $spotify = $this->get('spotify');

        if (!preg_match('(^spotify:user:(?P<user>[^:]+):playlist:(?P<playlist>[^:]+)$)', $playlist, $match)) {
            throw new \OutOfBoundsException("Invalid playlist specifier");
        }

        $playlist = $spotify->getUserPlaylist($match['user'], $match['playlist']);
        // @TODO: If we reached the limit of 100 tracks we must paginate

        return new JsonResponse($playlist);
    }
}
