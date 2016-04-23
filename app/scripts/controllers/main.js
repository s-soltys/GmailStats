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

    this.loadData = function loadGmailData() {
      gmailApi.authorize().then(function (authResult) {
        gmailApi.getMessages().then(function messagesReceived(messages) {
          messages.forEach(function (message) {
            gmailApi.getMessageById(message.id).then(function (messageContent) {
              $scope.$apply(function () {
                main.messages.push({ id: message.id, snippet: messageContent.snippet })
              })
            });
          });
        });
      });
    };

  }]);
