<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class CheckTokenAndRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $token = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Lấy thông tin người dùng từ token
        $user = $request->user();

        //nếu là đặt hàng, get đơn hàng thì không cần check role
        if ($request->action === 'order' || $request->action === 'orders')
            return $next($request);

        // Kiểm tra vai trò của người dùng, dùng cho các action chỉ dành cho admin
        if (!$user || $user->role !== 'ADMIN') {
            return response()->json(['error' => 'Unauthorized', $user], 403);
        }

        // Nếu token hợp lệ và người dùng có vai trò phù hợp, cho phép request tiếp tục
        return $next($request);
    }
}
