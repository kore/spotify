<?php

namespace Kore\Spotify\SpotifyBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class TokenCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('spotify:get-token')
            ->setDescription('Retrieves new access and refresh tokens');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $spotifyClientId = $this->getContainer()->getParameter('spotify.client.id');
        $spotifyClientSecret = $this->getContainer()->getParameter('spotify.client.secret');
        $spotifyRedirectUrl = $this->getContainer()->getParameter('spotify.redirect_url');

        $session = new \SpotifyWebAPI\Session($spotifyClientId, $spotifyClientSecret, 'http://music.nordmann.wedding:8080/tokens');
        $output->writeln("Open the follwing URL and confirm access:");
        $output->writeln($session->getAuthorizeUrl(['scopes' => ['playlist-read-private', 'playlist-modify-private']]));
    }
}
