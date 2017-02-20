<?php

namespace Kore\Spotify;

abstract class ApiTest extends IntegrationTest
{
    protected $httpClient;

    public function request(
        string $method,
        string $routeId,
        array $routeParameters = array(),
        $body = null,
        array $headers = []
    ) {
        $server = getenv('SERVER') ?: 'http://localhost:8080';
        $client = $this->getHttpClient();
        $client->addDefaultHeaders([
            'X-Requested-With: XMLHttpRequest',
        ]);

        $route = $this->getContainer()->get('router')->generate($routeId, $routeParameters);
        $this->assertNotNull($route, "Could not find route $routeId");

        $body = $body ? json_encode($body) : null;
        $response = $client->request($method, $server . $route, $body, $headers);

        if (isset($response->headers['set-cookie'])) {
            $cookie = explode(';', $response->headers['set-cookie'])[0];
            $client->addDefaultHeaders([
                'Cookie: ' . $cookie,
            ]);
        }

        $decoded = json_decode($response->body);
        $this->assertNotNull($decoded, 'Failed to decode response body: ' . strip_tags($response->body));
        $response->body = $decoded;
        return $response;
    }

    public function login($email = 'kore@example.com', $password = 'password')
    {
        $userService = $this->getContainer()->get('kabiko.user.domain.user_service');
        if (!$userService->exists($email)) {
            $user = new UserBundle\Domain\User(array(
                'email' => $email,
                'displayName' => 'Test User',
                'confirmed' => true,
            ));
            $user->setPassword($password);
            $userService->store($user);
        }

        $response = $this->request('POST', 'kabiko.user.login', [], [
            'email' => 'kore@example.com',
            'password' => 'password',
        ]);
        $this->assertTrue($response->body->loggedIn);
    }

    private function getHttpClient(): HttpClient
    {
        if (!$this->httpClient) {
            $this->httpClient = new HttpClient\Stream();
        }

        return $this->httpClient;
    }
}
