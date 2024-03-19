<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    private $categories;
    public function __construct(Category $categories)
    {
        $this->categories = $categories;
    }
    public function index()
    {
        $categories = $this->categories->all();
        if ($categories->count() > 0) {
            return response()->json([
                'status' => 'success',
                'message' => 'Categories Data Retrieved Successfully',
                'data' => $categories
            ], 200);
        } else {
            return response()->json([
                'status' => "failed",
                'message' => "No Records Found"
            ], 404);
        }
    }

    public function store(CategoryRequest $cateRequest)
    {
        $category = Category::create([
            'name' => $cateRequest->category_name,
            'parent_id' => $cateRequest->parent_id
        ]); // nếu chỗ này kh pass, front-end sẽ nhận được lỗi(define inside CategoryRequest) và dừng tại lúc này
        if ($category) {
            return response()->json([
                'status' => "success",
                'message' => "Category Created Successfully",
                'category' => $category
            ], 201);
        }
    }

    public function show($id)
    {
        $category = $this->categories->find($id);
        if ($category) {
            return response()->json([
                'status' => 'success',
                'message' => "Category Data Retrieved Successfully",
                'data' => $category
            ], 200);
        } else {
            return response()->json([
                'status' => "failed",
                'message' => "No Such Category Found"
            ], 404);
        }
    }

    public function update($id, CategoryRequest $cateRequest)
    {
        $category = $this->categories->find($id);
        if ($category) {

            $isUpdateSuccess = $category->update([
                'name' => $cateRequest->category_name,
                'parent_id' => $cateRequest->parent_id
            ]);

            if ($isUpdateSuccess)
                return response()->json([
                    'status' => "success",
                    'message' => "Category Updated Successfully",
                    'data' => $category
                ], 200);
        } else {
            $data = [
                'status' => "failed",
                'message' => "No Such Category Found"
            ];
            return response()->json($data, 404);
        }
    }

    public function destroy($id)
    {
        $category = $this->categories->find($id);
        if ($category) {
            $isDeleteSuccess = $category->delete();
            if ($isDeleteSuccess)
                return response()->json([
                    'status' => "success",
                    'message' => "Category Deleted Successfully",
                    'data' => $category
                ], 200);
        } else {
            $data = [
                'status' => "failed",
                'message' => "No Such Category Found"
            ];
            return response()->json($data, 404);
        }
    }
}
