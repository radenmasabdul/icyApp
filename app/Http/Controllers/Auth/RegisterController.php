<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /**
     * Handle user registration.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function register(Request $request){

        //validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:225',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:administrator, adminbranch',
        ]);

        //if validation fails
        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        //create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        //return json success
        if($user) {
            return response()->json([
                'success' => true,
                'user'    => $user,
            ], 201);
        }

        //return json failed
        return response()->json([
            'success' => false,
        ], 409);
    }

}
