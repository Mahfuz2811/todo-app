<?php

namespace Tests;

use Illuminate\Support\Str;

trait DataProvider
{
    public function invalidLoginData(): array
    {
        return [
            'empty email' => ['', 'password', 422],
            'empty password' => ['mahfuz@gmail.com', '', 422],
            'empty all' => ['', '', 422],
            'password less then 6' => ['mahfuz@gmail.com', '12345', 422],
        ];
    }

    public function invalidRegistrationData(): array
    {
        return [
            'empty name' => ['', 'mahfuz@gmail.com', 'password', 'password', 422],
            'empty email' => ['Mahfuz', '', 'password', 'password', 422],
            'empty password' => ['Mahfuz', 'mahfuz@gmail.com', '', 'password', 422],
            'password gt 6' => ['Mahfuz', 'mahfuz@gmail.com', '12345', '12345', 422],
            'empty all' => ['', '', '', '', 422]
        ];
    }

    private function randomString(): string
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return str_shuffle($characters);
    }
}
