<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(LoginRequest $request) {
        if (Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'You are already logged in.'
            ], 409);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user->email_verified_at) {
            return response()->json([
                'message' => 'Please verify your email first.'
            ], 403);
        }
        
        if(!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Credentials',
            ], 401);
        }
        

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => 'User logged in successfully',
            'user' => $user,
        ], 200);
    }
}
