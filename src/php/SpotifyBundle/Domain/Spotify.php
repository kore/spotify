<?php

namespace Kore\Spotify\SpotifyBundle\Domain;

use SpotifyWebAPI\Session as SpotifySession;
use Symfony\Component\HttpFoundation\Session\Session;

class Spotify
{
    const SESSION_KEY = 'spotifySession';

    private $authentificator;
    private $session;
    private $token;
    private $api;

    public function __construct(SpotifySession $authentificator, Session $session)
    {
        $this->authentificator = $authentificator;
        $this->session = $session;
        $this->token = $this->session->get(self::SESSION_KEY, null);

		$this->api = new \SpotifyWebAPI\SpotifyWebAPI();

        if ($this->token) {
            $this->api->setAccessToken($this->token->accessToken);
        }
    }

    public function getAuthorizeUrl(): string
    {
        return $this->authentificator->getAuthorizeUrl([
            'scopes' => [
                'playlist-read-private',
                'playlist-modify-private',
            ]
        ]);
    }

    public function authentificate(string $code)
    {
		$this->authentificator->requestAccessToken($code);

        $this->session->set(self::SESSION_KEY, new AccessToken([
            'accessToken' => $this->authentificator->getAccessToken(),
            'refreshToken' => $this->authentificator->getRefreshToken(),
            'validUntil' => $this->authentificator->getTokenExpiration(),
        ]));
    }

    public function isAuthentificated(): bool
    {
        if (!$this->token) {
            return false;
        }

        try {
            $this->me();
            return true;
        } catch (\SpotifyWebAPI\SpotifyWebAPIException $e) {
            return false;
        }
    }

    public function __call(string $method, array $arguments)
    {
        if ($this->token->shallRefresh()) {
            $this->authentificator->refreshAccessToken($this->token->refreshToken);

            $this->token = new AccessToken([
                'accessToken' => $this->authentificator->getAccessToken(),
                'refreshToken' => $this->authentificator->getRefreshToken(),
                'validUntil' => $this->authentificator->getTokenExpiration(),
            ]);
            $this->session->set(self::SESSION_KEY, $this->token);
            $this->api->setAccessToken($this->token->accessToken);
        }

        return call_user_func_array([$this->api, $method], $arguments);
    }
}
