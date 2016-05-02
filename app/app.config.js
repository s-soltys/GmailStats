(function () {
    'use strict';

    angular
    .module('gmailHistogramApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<messages-view></messages-view>'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

})();
