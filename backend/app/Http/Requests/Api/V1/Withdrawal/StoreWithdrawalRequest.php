<?php

namespace App\Http\Requests\Api\V1\Withdrawal;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreWithdrawalRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'amount' => 'required|numeric|min:1',
            'method' => 'required|string|in:bank,bkash',
            'account_details' => 'required|array',

            // Required for both methods
            'account_details.account_number' => 'required|string',
            'account_details.account_name' => 'required|string',

            // Bank specific
            'account_details.bank_name' => 'required_if:method,bank|nullable|string',
            'account_details.branch_name' => 'required_if:method,bank|nullable|string',
            'account_details.routing_number' => 'sometimes|nullable|string',
        ];
    }
}
