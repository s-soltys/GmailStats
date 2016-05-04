(function () {
  'use strict';
  
  angular
  .module('gmailHistogramApp')
  .component('messageList', {
    templateUrl: 'messages/message-list/message-list.html',
    controller: MessageListController,
    controllerAs: 'vm',
    bindings: {
      messages: '<',
      showDetails: '&'
    }
  });
    
  MessageListController.$inject = ['$scope', '$element', '$attrs', '$q'];
  
  function MessageListController($scope, $element, $attrs, $q) {
    var vm = this;
  };
  
} ());