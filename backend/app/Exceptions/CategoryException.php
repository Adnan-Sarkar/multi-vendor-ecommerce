<?php

namespace App\Exceptions;

use Exception;

class CategoryException extends BaseException
{

    public function __construct($message = 'Category not found', $code = 404)
    {
        parent::__construct($message, $code);
    }
}
