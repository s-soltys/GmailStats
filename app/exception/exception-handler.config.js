(function () {
    'use strict';
    
    angular
    .module('util.exception', [])
    .config(ExceptionConfig);

    ExceptionConfig.$inject = ['$provide'];

    function ExceptionConfig($provide) {
        $provide.decorator('$exceptionHandler', ExtendExceptionHandler);
    }

    ExtendExceptionHandler.$inject = ['$delegate'];

    function ExtendExceptionHandler($delegate) {
        return function (exception, cause) {
            $delegate(exception, cause);
            var errorData = {
                exception: exception,
                cause: cause
            };
            
            console.log("Exception: " + exception + ", " + cause);
        };
    }
})();