'use strict';

/**
 * @ngdoc function
 * @name gmailHistogramApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gmailHistogramApp
 */
angular.module('gmailHistogramApp')
  .controller('MainCtrl', ['$scope', 'gmailApi', 'letterHistogram', '$q', function ($scope, gmailApi, letterHistogram, $q) {
    var vm = this;
    vm.messages = [];
    vm.chartData = null;

    this.onLoadMessages = function onLoadMessages(messages) {
      vm.messages = messages;
      var msgArray = messages.map(function (msg) { return msg.snippet; });
      var histogram = letterHistogram.create(msgArray);
      var chartChildren = _.map(histogram, function (count, letter) { return { "name": letter, "size": count }; });

      vm.chartData = {
        "name": "flare",
        "children": chartChildren
      };
    };

  }]);
