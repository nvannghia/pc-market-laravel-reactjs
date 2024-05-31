<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Thông tin đăng nhập không hợp lệ'], 401);
        }
        // Lấy thông tin người dùng từ token
        $user = JWTAuth::user();

        return response()->json(['token' => $token, 'status' => 'success', 'user' => $user], 200);
    }

    public function logout(Request $request)
    {
        JWTAuth::parseToken()->invalidate();

        return response()->json(['message' => 'Đã đăng xuất thành công'], 200); 
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role
        ]);


        return response()->json(['status' => 'success', 'user' => $user], 201);
    }
}
