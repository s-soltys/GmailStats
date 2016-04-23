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
    var main = this;
    main.messages = [];
    main.chartData = null;
    main.waiting = false;

    this.authAndLoadData = function loadGmailData() {
      main.waiting = true;
      gmailApi.authorize().then(this.loadMessages);
    };

    this.loadMessages = function loadMessages() {
      gmailApi.getMessageList().then(function messagesReceived(messages) {
        var loadMessageByIdPromises = messages.map(function (m) { return gmailApi.getMessageById(m.id) });

        $q.all(loadMessageByIdPromises).then(function (results) {
          main.messages = results.map(function (r) { return { id: r.id, snippet: r.snippet } });
          main.updateData();
          main.waiting = false;
        });
      });
    };

    this.updateData = function updateData() {
      var items = _
        .chain(main.messages)
        .map(function (msg) { return msg.snippet; })
        .flatMap(function (s) { return s.split('') })
        .map(function (s) { return s.toLowerCase(); })
        .filter(function (s) { return s.match(/[a-z]/i); })
        .groupBy()
        .map(function (items, key) { return { "name": key, "size": items.length } })
        .value();

      main.chartData = {
        "name": "flare",
        "children": items
      };
    };
    
  }]);
