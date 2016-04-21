'use strict';

/**
 * @ngdoc function
 * @name gmailHistogramApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gmailHistogramApp
 */
angular.module('gmailHistogramApp')
  .controller('MainCtrl', ['gmailApi', function (gmailApi) {
    
    var aaa = gmailApi.handleAuthClick();
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
