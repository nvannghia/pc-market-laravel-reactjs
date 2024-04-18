<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\OrdersDetailController;
use App\Http\Controllers\ProductsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//categories API routes
Route::get('/categories', [CategoriesController::class, 'index']); // this route use for cusomer and admin
Route::get('/products', [ProductsController::class, 'index']); // this route use for cusomer and admin
Route::middleware('check.token.and.role')->group(function () {

    Route::post('/categories', [CategoriesController::class, 'store']);
    Route::get('/categories/{id}', [CategoriesController::class, 'show']);
    Route::put('/categories/{id}', [CategoriesController::class, 'update']);
    Route::delete('/categories/{id}', [CategoriesController::class, 'destroy']);
});

//products API routes
Route::middleware('check.token.and.role')->group(function () {

    Route::post('/products', [ProductsController::class, 'store']);
    Route::get('/products/{id}', [ProductsController::class, 'show']);
    Route::post('/products/update/{id}', [ProductsController::class, 'update']); // kh dùng put vì nó không hoạt động khi dungf postman form-data, có thể qua js đổi lại xem sao
    Route::delete('/products/{id}', [ProductsController::class, 'destroy']);
});




//orders API routes
Route::get('/orders', [OrdersController::class, 'index']);
Route::post('/orders', [OrdersController::class, 'store']);


//order-detail API routes
Route::get('/orderdetail', [OrdersDetailController::class, 'index']);
Route::post('/orderdetail', [OrdersDetailController::class, 'store']);
