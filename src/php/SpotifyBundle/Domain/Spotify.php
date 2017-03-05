<?php

namespace Kore\Spotify\SpotifyBundle\Domain;

use SpotifyWebAPI\Session;

class Spotify
{
    private $session;

    public function __construct(Session $session)
    {
        $this->session = $session;

		$this->api = new \SpotifyWebAPI\SpotifyWebAPI();
        // $this->api->setAccessToken($accessToken);
    }

    public function getAuthorizeUrl(): string
    {
        return $this->session->getAuthorizeUrl([
            'scopes' => [
                'playlist-read-private',
                'playlist-modify-private',
            ]
        ]);
    }

    public function isAuthentificated(): bool
    {
        try {
            $this->me();
            return true;
        } catch (\SpotifyWebAPI\SpotifyWebAPIException $e) {
            return false;
        }
    }

    public function __call(string $method, array $arguments)
    {
        return call_user_func_array([$this->api, $method], $arguments);
    }
}
