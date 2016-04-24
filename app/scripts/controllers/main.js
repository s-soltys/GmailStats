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
    vm.waiting = false;
    
    this.authAndLoadData = function loadGmailData() {
      vm.waiting = true;
      gmailApi.authorize().then(this.loadMessages);
    };

    this.loadMessages = function loadMessages() {
      gmailApi.getMessageList().then(function messagesReceived(messages) {
        var loadMessageByIdPromises = messages.map(function (m) { return gmailApi.getMessageById(m.id) });

        $q.all(loadMessageByIdPromises).then(function (results) {
          vm.messages = results.map(function (r) { return { id: r.id, snippet: r.snippet } });
          vm.updateData();
          vm.waiting = false;
        });
      });
    };

    this.updateData = function updateData() {
      var msgArray = vm.messages.map(function(msg) { return msg.snippet; });
      var histogram = letterHistogram.create(msgArray);
      var chartChildren = _.map(histogram, function(count, letter) { return { "name": letter, "size": count }; });

      vm.chartData = {
        "name": "flare",
        "children": chartChildren
      };
    };
    
  }]);
