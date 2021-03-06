<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Kernel
{
    /**
     * Configuration
     *
     * @var array
     */
    private static $configuration;

    public function registerBundles()
    {
        $bundles = array(
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Symfony\Bundle\TwigBundle\TwigBundle(),
            new Symfony\Bundle\MonologBundle\MonologBundle(),
            new Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),
            new QafooLabs\Bundle\NoFrameworkBundle\QafooLabsNoFrameworkBundle(),

            new Kore\Spotify\CoreBundle\SpotifyCoreBundle(),
            new Kore\Spotify\SpotifyBundle\SpotifySpotifyBundle(),
        );

        return $bundles;
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        if (in_array($this->getEnvironment(), array('dev', 'test'))) {
            $loader->load(__DIR__ . '/config/config_dev.yml');
        } else {
            $loader->load(__DIR__ . '/config/config.yml');
        }
    }

    /**
     * Builds the service container.
     *
     * @return ContainerBuilder The compiled service container
     *
     * @throws \RuntimeException
     */
    protected function buildContainer()
    {
        $container = parent::buildContainer();

        foreach (self::getConfiguration() as $key => $value) {
            $container->setParameter($key, $value);
        }

        return $container;
    }

    /**
     * Initialize configuration
     *
     * @return void
     */
    public static function getConfiguration()
    {
        if (self::$configuration) {
            return self::$configuration;
        }

        self::$configuration = array(
            'env' => 'prod',
            'secret' => 'secret',
            'mailer_transport' => 'sendmail',
            'debug' => false,
            'monolog_action_level' => 'error',
        );

        foreach (static::getAdditionalConfigFiles() as $file) {
            if (file_exists($file)) {
                self::$configuration = array_merge(self::$configuration, parse_ini_file($file));
            }
        }

        return self::$configuration;
    }

    /**
     * Get environment
     *
     * @return string
     */
    public static function getEnvironmentFromConfiguration()
    {
        return self::getConfiguration()['env'];
    }

    /**
     * Get additional config files
     *
     * @return string[]
     */
    public static function getAdditionalConfigFiles()
    {
        $files = array(
            __DIR__ . '/../environment',
            __DIR__ . '/../environment.local',
        );

        if (getenv("CONFIG")) {
            $files[] = getenv("CONFIG");
        }
        return $files;
    }

    /**
     * Get debug
     *
     * @return bool
     */
    public static function getDebug()
    {
        return in_array(self::getEnvironmentFromConfiguration(), array('dev', 'test'));
    }
}
