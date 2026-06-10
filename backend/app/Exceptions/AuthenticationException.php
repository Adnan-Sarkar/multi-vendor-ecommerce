<?php

namespace App\Exceptions;

use Exception;

class AuthenticationException extends Exception
{

    public function __construct($message = 'Invalid credentials', $code = 401)
    {
        parent::__construct($message, $code);
    }
}
