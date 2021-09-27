<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveRequest;
use App\Http\Requests\TaskRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class TaskController extends ApiController
{
    public function index(): JsonResponse
    {
        $tasks = Task::orderBy('created_at', 'DESC')->get();

        return $this->respondSuccess([
            'error' => false,
            'data' => $tasks
        ], 200);
    }

    public function store(TaskRequest $request): JsonResponse
    {
        $taskData = $request->only('task_name', 'user_id');
        Task::create($taskData);

        return $this->respondSuccess([
            'error' => false,
            'message' => 'Task stored successfully'
        ], 201);
    }

    public function saveTask(SaveRequest $request): JsonResponse
    {
        $data = [];
        $todos = $request->todos;
        foreach ($todos as $todo) {
            $data[] = [
                'task_name' => $todo['task_name'],
                'is_completed' => $todo['is_completed'],
                'completed_at' => $todo['is_completed'] ? $todo['completed_at'] : null,
                'user_id' => 1
            ];
        }

        Task::insert($data);

        return $this->respondSuccess([
            'error' => false,
            'message' => 'Task saved successfully'
        ], 201);
    }

    public function update(TaskUpdateRequest $request, $id): JsonResponse
    {
        $task = Task::findOrFail($id);
        if (!is_null($task->expire_at)) {
            return $this->respondError([
                'error' => true,
                'message' => 'Task already expired.'
            ]);
        }

        $task->is_completed = $request->is_completed ? Task::$isCompletedArray['complete'] : Task::$isCompletedArray['pending'];
        $task->completed_at = $request->is_completed ? Carbon::now() : null;
        $task->save();

        return $this->respondSuccess([
            'error' => false,
            'message' => 'Task updated successfully'
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return $this->respondSuccess([
            'error' => false,
            'message' => 'Task deleted successfully'
        ]);
    }
}
