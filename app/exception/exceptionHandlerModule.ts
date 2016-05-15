import * as angular from 'angular';

angular
    .module('app.exception', [])
    .config(ExceptionConfig);

ExceptionConfig.$inject = ['$provide'];
export function ExceptionConfig($provide) {
    $provide.decorator('$exceptionHandler', ExtendExceptionHandler);
}

ExtendExceptionHandler.$inject = ['$delegate'];
export function ExtendExceptionHandler($delegate) {
    return function (exception, cause) {
        $delegate(exception, cause);
        var errorData = {
            exception: exception,
            cause: cause
        };

        console.log("Exception: " + exception + ", " + cause);
    };
}