(function () {
    'use strict';

    angular
    .module('gs.messages')
    .component('messageLoader', {
        template: require('./message-loader.html'),
        controller: MessageLoaderController,
        controllerAs: 'vm',
        bindings: {
            onLoadMessages: '&'
        }
    });

    MessageLoaderController.$inject = ['$scope', '$element', '$attrs', '$q', 'gmailApi'];
    
    function MessageLoaderController($scope, $element, $attrs, $q, gmailApi) {
        var vm = this;
        vm.waiting = false;
        vm.messages = [];

        vm.loadMockData = function loadMockData() {
            var msgs = [
                { id: 13, snippet: 'dfsdfsdfsdfs' },
                { id: 10, snippet: 'aaaaaaaaaaaaaaaa' }
            ];

            vm.onLoadMessages({ messages: msgs });
        };

        vm.authAndLoadData = function loadGmailData() {
            vm.waiting = true;
            gmailApi.authorize().then(this.loadMessages);
        };

        vm.loadMessages = function loadMessages() {
            gmailApi.getMessageList().then(function messagesReceived(messages) {
                var loadMessageByIdPromises = messages.map(function (m) { return gmailApi.getMessageById(m.id) });

                loadMessageByIdPromises.forEach(function (loadMessagePromise, index) {
                    loadMessagePromise.then(function (results) {
                        vm.messages.push({ id: results.id, snippet: results.snippet });
                        vm.onLoadMessages({ messages: vm.messages });
                    });
                });

                $q.all(loadMessageByIdPromises).then(function (results) {
                    vm.waiting = false;
                });
            });
        };
    };
    
} ());