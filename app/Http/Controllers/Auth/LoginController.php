<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    /**
     * Handle user login.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // Set validation
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        // If validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Get credentials from request
        $credentials = $request->only('email', 'password');

        // Check if email exists
        $user = Auth::guard('api')->getProvider()->retrieveByCredentials(['email' => $credentials['email']]);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Email is incorrect'
            ], 401);
        }

        // If auth failed
        if (!Auth::guard('api')->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Password is incorrect'
            ], 401);
        }

        // If auth success
        $token = Auth::guard('api')->tokenById($user->id);

        return response()->json([
            'success' => true,
            'user'    => Auth::guard('api')->user(),
            'token'   => $token
        ], 200);
    }
}
