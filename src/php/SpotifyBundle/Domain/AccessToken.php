<?php

namespace Kore\Spotify\SpotifyBundle\Domain;

use Kore\DataObject\DataObject;

class AccessToken extends DataObject
{
    public $accessToken;
    public $refreshToken;
    public $validUntil;

    public function shallRefresh(): bool
    {
        return $this->validUntil < (time() + 30 * 60);
    }
}
