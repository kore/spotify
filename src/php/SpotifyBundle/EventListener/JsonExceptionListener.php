<?php

namespace Kore\Spotify\SpotifyBundle\EventListener;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

use Kore\Spotify\SpotifyBundle\Controller\Index\ErrorResult;

class JsonExceptionListener
{
    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        if (!$event->getRequest()->isXmlHttpRequest()) {
            return;
        }

        $exception = $event->getException();

        $errorData = [
            'error' => $exception->getMessage(),
        ];

        if (\AppKernel::getDebug()) {
            $errorData['file'] = $exception->getFile();
            $errorData['line'] = $exception->getLine();
            $errorData['stack'] = explode(PHP_EOL, $exception->getTraceAsString());
        }

        $event->setResponse(new JsonResponse(new ErrorResult($errorData), 500));
    }
}
