<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'todos' => ['required', 'array'],
            'todos.*.task_name' => ['required', 'string'],
            'todos.*.is_completed' => ['required', 'in:0,1'],
            'todos.*.completed_at' => ['nullable', 'required_if:todos.*.is_completed,1', 'date_format:Y-m-d H:i:s']
        ];
    }
}
