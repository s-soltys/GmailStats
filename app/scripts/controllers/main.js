'use strict';

/**
 * @ngdoc function
 * @name gmailHistogramApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gmailHistogramApp
 */
angular.module('gmailHistogramApp')
  .controller('MainCtrl', ['$scope', 'gmailApi', function ($scope, gmailApi) {
    var main = this;
    main.messages = [];

    this.authAndLoadData = function loadGmailData() {
      gmailApi.authorize().then(this.loadMessages);
    };

    this.loadMessages = function loadMessages() {
      gmailApi.getMessageList().then(function messagesReceived(messages) {
        messages.forEach(main.loadMessageById);
      });
    };

    this.loadMessageById = function loadMessageById(message) {
      gmailApi.getMessageById(message.id).then(function (messageContent) {
        $scope.$apply(function () {
          main.messages.push({ id: message.id, snippet: messageContent.snippet })
        })
      });
    };

  }]);
