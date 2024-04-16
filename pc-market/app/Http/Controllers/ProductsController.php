<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Traits\StorageImageTrait;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    use StorageImageTrait;
    private $product;
    public function __construct(Product $product)
    {
        $this->product = $product;
    }
    public function index()
    {
        $products = $this->product->all();
        if ($products->count() > 0) {
            return response()->json([
                'status' => 'success',
                'message' => 'Products Data Retrieved Ruccessfully',
                'products' => $products
            ], 200);
        } else {
            return response()->json([
                'status' => "failed",
                'message' => 'No Products Found'
            ], 404);
        }
    }

    public function store(ProductRequest $prodRequest)
    {
        $dataProductCreate = [
            'name' => $prodRequest->name,
            'price' => $prodRequest->price,
            'description' => $prodRequest->description,
            'category_id' => $prodRequest->category_id
        ];

        $dataUploadImage = $this->storageTraitUpload($prodRequest, 'image', 'products-photo');
        if ($dataUploadImage) {
            $dataProductCreate['image'] = $dataUploadImage;
        }

        $productInserted = $this->product->create($dataProductCreate);
        if ($productInserted) {
            return response()->json([
                'status' => 'success',
                'message' => 'Product Created Successfully',
                'product' => $productInserted
            ], 201);
        }
    }

    public function show($id)
    {
        $product = $this->product->find($id);
        if ($product) {
            return response()->json([
                'status' => 'success',
                'message' => 'Product Data Retrieved Successfully',
                'data' => $product
            ], 200);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'No Such Product Found'
            ], 404);
        }
    }
    private function deleteOldProductImage($path)
    {
        $urlImageDelete = substr($path, strpos($path, 'p'));
        Storage::delete("public/$urlImageDelete");
    }

    public function update($id, ProductRequest $prodRequest)
    {
        $product = $this->product->find($id);
        if ($product) {
            $dataProductUpdate = [
                'name' => $prodRequest->name,
                'price' => $prodRequest->price,
                'description' => $prodRequest->description,
                'category_id' => $prodRequest->category_id
            ];

            // rule: có upload img -> gỡ img cũ đi, otherwise dùng lại img cũ
            if ($prodRequest->hasFile('image')) {
                //xóa img cũ
                $this->deleteOldProductImage($product->image);

                //upload ảnh mới
                $dataUploadImage = $this->storageTraitUpload($prodRequest, 'image', 'products-photo');
                if ($dataUploadImage) {
                    $dataProductUpdate['image'] = $dataUploadImage;
                }
            } else {
                $dataProductUpdate['image'] = $product->image;
            }

            $productUpdated = $product->update($dataProductUpdate);
            if ($productUpdated) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Product Updated Successfully',
                    'data' => $product
                ], 200);
            }
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'No Such Product Found'
            ], 404);
        }
    }


    public function destroy($id)
    {
        //rule: khi delete thì delete cả ảnh của product đó
        $product = $this->product->find($id);
        if ($product) {
            //xóa image của sản phẩm
            $this->deleteOldProductImage($product->image);

            $isDeleteSuccess = $product->delete();
            if ($isDeleteSuccess) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Product Deleted Successfully',
                    'data' => $product
                ], 200);
            }
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'No Such Product Found'
            ], 404);
        }
    }
}
