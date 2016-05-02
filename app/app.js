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
    'ngTouch',
    'util.exception'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<messages-view></messages-view>'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
