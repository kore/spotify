<?php

namespace Kore\Spotify\CoreBundle\Controller\Index;

use Kore\DataObject\DataObject;

class ErrorResult extends DataObject
{
    public $error;
    public $file;
    public $line;
    public $stack = [];

    public function __construct($data)
    {
        if (is_array($data)) {
            parent::__construct($data);
        } else {
            $this->error = $data;
        }
    }
}
