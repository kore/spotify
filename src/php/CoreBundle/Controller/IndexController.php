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

        return new Context([
            'version' => $this->getParameter('version'),
            'routes' => array_map(
                function (Route $route) {
                    return $route->getPath();
                },
                iterator_to_array($router->getRouteCollection())
            ),
        ]);
    }
}
