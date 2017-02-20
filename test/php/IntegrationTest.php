<?php

namespace Kore\Spotify;

use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;;

require __DIR__ . '/../../app/AppKernel.php';

abstract class IntegrationTest extends \PHPUnit_Framework_TestCase
{
    private static $container;

    protected static function getContainer()
    {
        if (!self::$container) {
            $kernel = new \AppKernel('test', true);
            $kernel->boot();
            self::$container = $kernel->getContainer();
        }

        return self::$container;
    }

    public static function setUpBeforeClass()
    {
        self::$container = null;
    }
}
