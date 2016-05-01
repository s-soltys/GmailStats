(function () {
    'use strict';

    angular
    .module('gmailHistogramApp')
    .component('messageLoader', {
        templateUrl: 'messages/message-loader/message-loader.html',
        controller: MessageLoaderController,
        bindings: {
            onLoadMessages: '&'
        }
    });

    MessageLoaderController.$inject = ['$scope', '$element', '$attrs', '$q', 'gmailApi'];
    
    function MessageLoaderController($scope, $element, $attrs, $q, gmailApi) {
        var ctrl = this;
        ctrl.waiting = false;
        ctrl.messages = [];

        ctrl.loadMockData = function loadMockData() {
            var msgs = [
                { id: 13, snippet: 'dfsdfsdfsdfs' },
                { id: 10, snippet: 'aaaaaaaaaaaaaaaa' }
            ];

            ctrl.onLoadMessages({ messages: msgs });
        };

        ctrl.authAndLoadData = function loadGmailData() {
            ctrl.waiting = true;
            gmailApi.authorize().then(this.loadMessages);
        };

        ctrl.loadMessages = function loadMessages() {
            gmailApi.getMessageList().then(function messagesReceived(messages) {
                var loadMessageByIdPromises = messages.map(function (m) { return gmailApi.getMessageById(m.id) });

                loadMessageByIdPromises.forEach(function (loadMessagePromise, index) {
                    loadMessagePromise.then(function (results) {
                        $scope.$apply(function () {
                            ctrl.messages.push({ id: results.id, snippet: results.snippet });
                            ctrl.onLoadMessages({ messages: ctrl.messages });
                        });
                    });
                });

                $q.all(loadMessageByIdPromises).then(function (results) {
                    ctrl.waiting = false;
                });
            });
        };
    };
    
} ());