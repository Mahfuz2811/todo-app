<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['task_name', 'is_completed', 'completed_at', 'user_id'];

    public static $isCompletedArray = [
        'pending' => 0,
        'complete' => 1
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
