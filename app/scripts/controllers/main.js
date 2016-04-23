'use strict';

/**
 * @ngdoc function
 * @name gmailHistogramApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gmailHistogramApp
 */
angular.module('gmailHistogramApp')
  .controller('MainCtrl', ['$scope', 'gmailApi', '$q', function ($scope, gmailApi, $q) {
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
      var items = _
        .chain(vm.messages)
        .map(function (msg) { return msg.snippet; })
        .flatMap(function (s) { return s.split('') })
        .map(function (s) { return s.toLowerCase(); })
        .filter(function (s) { return s.match(/[a-z]/i); })
        .groupBy()
        .map(function (items, key) { return { "name": key, "size": items.length } })
        .value();

      vm.chartData = {
        "name": "flare",
        "children": items
      };
    };
    
  }]);
