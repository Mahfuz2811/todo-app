<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'task_name' => ['required', 'string', 'between:2,100'],
            'user_id' => ['required', 'integer']
        ];
    }
}
