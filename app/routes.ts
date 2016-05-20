import * as angular from 'angular';

RouteConfig.$inject = ['$routeProvider', '$locationProvider'];
export function RouteConfig($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(false);

  $routeProvider
    .when('/', {
      template: '<messages-view></messages-view>'
    })
    .when('/messages', {
      template: '<messages-view></messages-view>'
    })
    .otherwise({
      redirectTo: '/messages'
    });
};