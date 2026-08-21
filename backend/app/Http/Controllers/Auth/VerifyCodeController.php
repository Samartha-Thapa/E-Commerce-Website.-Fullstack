<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\VerifyCodeRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VerifyCodeController extends Controller
{
    public function verifyCode(VerifyCodeRequest $request) {
        $user = User::where('email', $request->email)->first();

        if(!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }

        if(!$user->verification_code) {
            return response()->json([
                'success' => false,
                'message' => 'No verification code found',
            ], 400);
        }

        if(now()->gt($user->verification_expires_at)) {
            return response()->json([
                'success' => false,
                'message' => 'Verification code has expired',
            ], 400);
        }

        if($user->verification_code !== $request->code) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid verification code',
            ]);
        } 

        $user->update([
            'email_verified_at' => now(),
            'verification_code' => null,
            'verification_expires_at' => null,
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'user' => $user,
        ]);
    }   
}
