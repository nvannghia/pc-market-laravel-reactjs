<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'bail|required|string|max:100',
            'category_id' => 'bail|required|numeric',
            'price' => 'bail|required|numeric',
            'description' => 'bail|required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'product_name.required' => 'Product name is required',
            'product_name.string' => 'Product name must be a string',
            'product_name.max' => 'Product name must be less than 100 characters',
            'category_id.required' => 'Category ID is required',
            'category_id.numeric' => 'Category ID must be a number',
            'price.required' => 'Price is required',
            'price.numeric' => 'Price must be a number',
            'description.required' => 'Description is required',
            'description.string' => 'Description must be a string',
            'description.max' => 'Description must be less than 255 characters',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
