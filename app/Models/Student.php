<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'fullname',
        'username',
        'email',
        'password',
        'course',
        'phone',
        'gender',
    ];

    protected $hidden = [
        'password', // Hides the password field from the JSON output
    ];
}
