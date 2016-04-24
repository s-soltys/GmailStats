'use strict';

function MessageList($scope, $element, $attrs) {
  var ctrl = this;
};

angular
  .module('gmailHistogramApp')
  .component('messageList', {
    templateUrl: 'scripts/message-list/message-list.html',
    controller: MessageList,
    bindings: {
      messages: '<',
      showDetails: '&'
    }
  });