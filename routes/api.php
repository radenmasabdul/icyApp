<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Student\StudentController;
use App\Http\Controllers\Course\CourseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//auth
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LogoutController::class, 'logout']);
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//admin
Route::middleware('auth:api')->prefix('admin')->group(function () {
    Route::get('/get', [AdminController::class, 'index']);
    Route::post('/store', [AdminController::class, 'store']);
    Route::get('/show/{id}', [AdminController::class, 'show']);
    Route::post('/update/{id}', [AdminController::class, 'update']);
    Route::delete('/delete/{id}', [AdminController::class, 'destroy']);
});

//student
Route::middleware('auth:api')->prefix('students')->group(function () {
    Route::get('/get', [StudentController::class, 'index']);
    Route::post('/store', [StudentController::class, 'store']);
    Route::get('/show/{id}', [StudentController::class, 'show']);
    Route::post('/update/{id}', [StudentController::class, 'update']);
    Route::delete('/delete/{id}', [StudentController::class, 'destroy']);
});

//course
Route::middleware('auth:api')->prefix('course')->group(function () {
    Route::get('/get', [CourseController::class, 'index']);
    Route::post('/store', [CourseController::class, 'store']);
    Route::get('/show/{id}', [CourseController::class, 'show']);
    Route::post('/update/{id}', [CourseController::class, 'update']);
    Route::delete('/delete/{id}', [CourseController::class, 'destroy']);
});
