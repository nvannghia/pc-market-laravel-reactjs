<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrdersController extends Controller
{
    private $order;
    private $orderDetail;
    public function __construct(Order $order, OrderDetail $orderDetail)
    {
        $this->order = $order;
        $this->orderDetail = $orderDetail;
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
        try {
            DB::beginTransaction();
            //insert into order table
            $order = $this->order->create([
                'amount' => $request->amount,
                'full_name' => $request->fullName,
                'phone_number' => $request->phoneNumber,
                'addr' => $request->address,
                'note' => $request->note,
                'user_id' => $request->userId
            ]);

            $orderID = $order->id;

            // insert into order detail table
            //ý tưởng insert order detail
            //  - front end - truyền lên server:
            //       + 1 orderId 
            //       + 1 mảng product's id
            //       + 1 mảng quantity 
            //       + 1 mảng unit price  
            $dataOrderDetailInsert = [];
            $productsLength = count($request->productsId);
            for ($i = 0; $i < $productsLength; $i++) {

                array_push($dataOrderDetailInsert, [
                    'order_id' => $orderID,
                    'product_id' => $request->productsId[$i],
                    'quantity' => $request->quantities[$i],
                    'unit_price' => $request->unitPrices[$i]
                ]);
            }
            $this->orderDetail->insert($dataOrderDetailInsert);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Order Created Successfully',
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage()
            ]);
        }


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

    public function getAllOrderByUserId(Request $request)
    {
        $userId = $request->userId;
        $orders = $this->order->where('user_id', $userId)->get();
        if (count($orders) > 0) {
            return response()->json([
                'status' => 'success',
                'message' => 'Orders Data Retrieved Successfully',
                'orders' => $orders
            ], 200);
        }

        return response()->json([
            'status' => 'failed',
            'message' => 'No Orders Found'
        ], 404);
    }
}
