<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class GoogleController extends Controller
{
    public function redirectToGoogle() {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(Request $request) {
        $frontendURL = config('app.frontend_url');

        if (Auth::check()) {
            return redirect($frontendURL);
        }

        try {
            $googleUser = Socialite::driver('google')->user();
            
            $user = User::where('email', $googleUser->email)->first();

            if(!$user){
                $user = User::firstOrCreate(
                    [
                        'name' => $googleUser->name,
                        'email' => $googleUser->email,
                        'google_id' => $googleUser->id,
                        'email_verified_at' => now(),
                        'password' => Hash::make(Str::random(32)),
                        ]
                    );
            } else if(!$user->google_id) {
                    $user->update(['google_id' => $googleUser->getId()]);
            }

                Auth::login($user);
                $request->session()->regenerate();
                    return redirect($frontendURL);
            } catch (Throwable $e) {
                report($e);
                return redirect($frontendURL . '/login?oauth_error=true');
        }
    }
}
