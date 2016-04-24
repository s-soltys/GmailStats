(function () {
  'use strict';
  
  var messageList = ['$scope', '$element', '$attrs', '$q', function MessageList($scope, $element, $attrs, $q) {
    var ctrl = this;
  }];
  
  angular
    .module('gmailHistogramApp')
    .component('messageList', {
      templateUrl: 'messages/message-list/message-list.html',
      controller: messageList,
      bindings: {
        messages: '<',
        showDetails: '&'
      }
    });
} ());