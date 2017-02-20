<?php

namespace Kore\Spotify\SpotifyBundle\Controller\Index;

use Kore\DataObject\DataObject;

class Context extends DataObject
{
    /**
     * @var \Kore\Spotify\UserBundle\Domain\Session
     */
    public $session;

    /**
     * @var string
     */
    public $version;

    /**
     * @var array
     */
    public $routes = [];
}
