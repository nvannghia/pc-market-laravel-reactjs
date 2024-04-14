<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    private $order;
    public function __construct(Order $order)
    {
        $this->order = $order;
    }
    public function index()
    {
        $orders = $this->order->all();
        if (count($orders) > 0) {
            return response()->json([
                'status' => 'success',
                'message' => 'Orders Data Retrieved Successfully',
                'data' => $orders
            ], 200);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'No Orders Found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $order = $this->order->create([
            'amount' => $request->amount,
            'full_name' => $request->fullName,
            'phone_number' => $request->phoneNumber,
            'addr' => $request->address,
            'note' => $request->note,
            'user_id' => $request->userId
        ]);

        if ($order) {
            return response()->json([
                'status' => 'success',
                'message' => 'Order Created Successfully',
                'data' => $order
            ], 201);
        }
        return response()->json([
            'status' => 'failed',
            'message' => 'Failed!',
            'data' => $order
        ], 404);
    }
}
