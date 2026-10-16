<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\VerifyCodeController;
use App\Http\Controllers\CategoriesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/verifyCode', [VerifyCodeController::class, 'verifyCode']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'forgotPassword']);
Route::post('/password-reset', [PasswordResetController::class, 'passwordReset']);

// Protected routes requiring login
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/categories', [CategoriesController::class, 'index']);
    Route::get('/logout', [LogoutController::class, 'logout']);
});
