<?php

namespace App\Exceptions;

use Exception;

class BaseException extends Exception
{
    public function __construct($message = 'Internal server error', $code = 500)
    {
        parent::__construct($message, $code);
    }
}
