<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticalController extends Controller
{
    public function revenueStatistics(Request $request)
    {
        $statisticsBy = $request->statisticsBy;
        $date = $request->date;
        switch ($statisticsBy) {
            case 'byDay':
                // Chuyển đổi định dạng ngày thành yyyy-mm-dd
                $formattedDate = date('Y-m-d', strtotime(str_replace('/', '-', $date)));

                $revenueByDay = Order::select(DB::raw("DATE_FORMAT(created_at, '%Y-%m-%d') as date"), DB::raw('SUM(amount) as revenue'))
                    ->where(DB::raw("DATE_FORMAT(created_at, '%Y-%m-%d')"), $formattedDate)
                    ->groupBy(DB::raw("DATE_FORMAT(created_at, '%Y-%m-%d')"))
                    ->get();
                return response()->json([
                    'status' => 'success',
                    'info' => $revenueByDay
                ]);
                break;
            case 'byMonth':
                // Chuyển đổi định dạng ngày thành yyyy-mm-dd
                $formattedDate = date('Y-m', strtotime(str_replace('/', '-', '01/' . $date)));

                $revenueByMonth = Order::select(DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"), DB::raw('SUM(amount) as revenue'))
                    ->where(DB::raw("DATE_FORMAT(created_at, '%Y-%m')"), $formattedDate)
                    ->groupBy(DB::raw("DATE_FORMAT(created_at, '%Y-%m')"))
                    ->get();
                return response()->json([
                    'status' => 'success',
                    'info' => $revenueByMonth
                ]);
                break;
            case 'byYear':
                // Chuyển đổi định dạng ngày thành yyyy-mm-dd
                $formattedDate = date('Y', strtotime(str_replace('/', '-', '01/01/' . $date)));

                $revenueByYear = Order::select(DB::raw("DATE_FORMAT(created_at, '%Y') as year"), DB::raw('SUM(amount) as revenue'))
                    ->where(DB::raw("DATE_FORMAT(created_at, '%Y')"), $formattedDate)
                    ->groupBy(DB::raw("DATE_FORMAT(created_at, '%Y')"))
                    ->get();
                return response()->json([
                    'status' => 'success',
                    'info' => $revenueByYear
                ]);
                break;
        }
    }
}
