<?php

namespace Kore\Spotify\SpotifyBundle\Domain;

class Spotify
{
    private $accessToken;
    private $refreshToken;

    public function __construct(string $accessToken, string $refreshToken)
    {
        $this->accessToken = $accessToken;
        $this->refreshToken = $refreshToken;

		$this->api = new \SpotifyWebAPI\SpotifyWebAPI();
        $this->api->setAccessToken($accessToken);

        // @TODO: Find a sensible way to refresh the token
    }

    public function __call(string $method, array $arguments)
    {
        return call_user_func_array([$this->api, $method], $arguments);
    }
}
