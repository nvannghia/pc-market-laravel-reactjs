<?php

namespace App\Http\Requests;


use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;


class CategoryRequest extends FormRequest
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
            'category_name' => 'bail|required|string|max:50',
            'parent_id' => 'bail|required|numeric',
        ];
    }

    public function messages(): array
    {
        return [
            'category_name.required' => 'Category name is required',
            'category_name.string' => 'Category name must be a string',
            'category_name.max' => 'Category name must be less than 50 characters',
            'parent_id.required' => 'Parent ID is required',
            'parent_id.numeric' => 'Parent ID must be a number',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
