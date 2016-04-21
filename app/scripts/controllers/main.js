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
    var main = this;

    gmailApi.authorize().then(function (authResult) {

      gmailApi.getMessages().then(function messagesReceived(messages) {
        main.messages = messages;
      });

      gmailApi.getLabels().then(function listLabels(labels) {
        main.labels = labels;
      });
    });

  }]);
