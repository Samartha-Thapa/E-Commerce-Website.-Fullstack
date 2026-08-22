<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Events\PasswordResetRequested;
use App\Models\User;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    public function forgotPassword(Request $request) {
        $request -> validate([
            'email' => 'email|max:255|required'
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user){
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }

        event(new PasswordResetRequested($user));

        return response()->json([
            'success' => true,
            'message' => 'Password Reset Link Sent',
        ], 200);

    }
}
