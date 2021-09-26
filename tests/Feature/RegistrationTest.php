<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\DataProvider;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use DataProvider;
    use DatabaseMigrations;
    use RefreshDatabase;

    private $registrationRoute = '/api/v1/auth/register';

    /**
     * @dataProvider invalidRegistrationData
     *
     * @param string $name
     * @param string $email
     * @param string $password
     * @param string $confirmedPassword
     * @param int $statusCode
     */
    public function testUserRegistrationRequestValidation(string $name, string $email, string $password, string $confirmedPassword, int $statusCode)
    {
        $this->json('POST', $this->registrationRoute, [
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $confirmedPassword
        ])->assertStatus($statusCode);
    }

    public function testUserIsStoredInTheDatabase()
    {
        $this->json('POST', $this->registrationRoute, [
            'name' => 'Mahfuz',
            'email' => 'mahfuz@gmail.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ])->assertStatus(201);

        $this->assertDatabaseCount(User::class, 1);
    }
}
