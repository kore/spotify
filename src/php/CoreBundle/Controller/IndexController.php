<?php

namespace Kore\Spotify\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Route;

use QafooLabs\MVC\TokenContext;

use Kore\Spotify\CoreBundle\Controller\Index\Context;

class IndexController extends Controller
{
    public function indexAction(TokenContext $context)
    {
        $router = $this->get('router');
        $spotify = $this->get('spotify');

        $hasClientConfiguration = $this->getParameter('spotify.client.id') &&
            $this->getParameter('spotify.client.secret');

        $isAuthentificated = false;
        if ($hasClientConfiguration) {
            $isAuthentificated = $spotify->isAuthentificated();
        }

        $authentifactionUrl = null;
        $user = null;
        if (!$isAuthentificated) {
            $authentifactionUrl = $spotify->getAuthorizeUrl();
        } else {
            $user = $spotify->me();
        }

        return new Context([
            'version' => $this->getParameter('version'),
            'routes' => array_map(
                function (Route $route) {
                    return $route->getPath();
                },
                iterator_to_array($router->getRouteCollection())
            ),
            'session' => [
                'hasClientConfiguration' => $hasClientConfiguration,
                'isAuthentificated' => $isAuthentificated,
                'authentifactionUrl' => $authentifactionUrl,
                'playlists' => $this->getParameter('playlists') ?: [],
                'user' => $user,
            ],
        ]);
    }
}
