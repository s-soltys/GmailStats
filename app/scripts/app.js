'use strict';

/**
 * @ngdoc overview
 * @name gmailHistogramApp
 * @description
 * # gmailHistogramApp
 *
 * Main module of the application.
 */
angular
  .module('gmailHistogramApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
