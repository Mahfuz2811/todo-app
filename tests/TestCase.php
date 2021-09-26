<?php

namespace Tests;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    use HasFactory;

    protected function createUserTask(int $count = 1, array $attributes = [])
    {
        User::factory()->count($count)->hasTasks(10)->create();
    }
}
