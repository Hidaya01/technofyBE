<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;
    protected $primaryKey = 'idAnswer';

    protected $fillable = ['content', 'is_correct', 'question_id', 'user_id'];

    public function question() {
        return $this->belongsTo(Question::class, 'question_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
