<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use Illuminate\Http\Request;

class OrdersDetailController extends Controller
{
    private $orderDetail;
    public function __construct(OrderDetail $orderDetail)
    {
        $this->orderDetail = $orderDetail;
    }
    public function index()
    {
        $orderDetail = $this->orderDetail->all();
        if (count($orderDetail) > 0) {
            return response()->json([
                'status' => 'success',
                'message' => 'Order Details Data Retrieved Successfully',
                'data' => $orderDetail
            ], 200);
        }
        return response()->json([
            'status' => 'failed',
            'message' => 'No Orders detail Found'
        ], 404);
    }

    //ý tưởng insert order detail
    //  - front end - truyền lên server:
    //       + 1 orderId 
    //       + 1 mảng product's id
    //       + 1 mảng quantity 
    //       + 1 mảng unit price  
    public function store(Request $request)
    {
        // c.bi data de luu
        $dataOrderDetailInsert = [];
        $productsLength = count($request->productsId);
        for ($i = 0; $i < $productsLength; $i++) {

            array_push($dataOrderDetailInsert, [
                'order_id' => $request->orderId,
                'product_id' => $request->productsId[$i],
                'quantity' => $request->quantities[$i],
                'unit_price' => $request->unitPrices[$i]
            ]);
        }

        //tien hanh luu du lieu
        $orderDetailInserted = $this->orderDetail->insert($dataOrderDetailInsert);
        if ($orderDetailInserted) {
            return response()->json([
                'status' => 'success',
                'message' => 'Order Detail Created Successfully',
                'data' => $orderDetailInserted
            ], 201);
        }

        return response()->json([
            'status' => 'failed',
            'message' => 'Order Detail Insert Failed'
        ], 400);
    }
}
