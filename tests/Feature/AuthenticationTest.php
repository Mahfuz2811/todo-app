<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\DataProvider;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use DataProvider;
    use DatabaseMigrations;
    use RefreshDatabase;

    private $loginRoute = '/api/v1/auth/login';
    private $logout = '/api/v1/auth/logout';

    /**
     * @dataProvider invalidLoginData
     *
     * @param string $email
     * @param string $password
     * @param int $statusCode
     */
    public function testUserLoginRequestValidation(string $email, string $password, int $statusCode)
    {
        $this->json('POST', $this->loginRoute, [
            'email' => $email,
            'password' => $password
        ])->assertStatus($statusCode);
    }

    public function testInvalidUsernameOrPasswordCannotLogin()
    {
        $user = User::factory()->make();
        $this->json('POST', $this->loginRoute, [
            'email' => $user->email,
            'password' => '334324',
        ])->assertStatus(401);
    }

    public function testValidUsernameAndPasswordCanLogin()
    {
        $user = User::factory()->create();
        $this->json('POST', $this->loginRoute, [
            'email' => $user->email,
            'password' => 'password',
        ])->assertStatus(200);
    }

    public function testLogout()
    {
        $user = User::factory()->create();

        $login = $this->json('POST', $this->loginRoute, [
            'email' => $user->email,
            'password' => 'password',
        ])->assertStatus(200);

        $accessToken = $login->decodeResponseJson()['access_token'];

        $headers = [];
        $headers['Authorization'] = 'Bearer ' . $accessToken;

        $this->json('POST', $this->logout, [], $headers)->assertStatus(200);
    }
}
