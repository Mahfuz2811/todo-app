<?php

namespace Database\Factories;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'task_name' => $this->faker->name(),
            'is_completed' => 1,
            'completed_at' => Carbon::now()
        ];
    }
}
