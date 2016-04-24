(function () {
    'use strict';

    var messageLoaderController = ['$scope', '$element', '$attrs', '$q', 'gmailApi', function messageLoaderController($scope, $element, $attrs, $q, gmailApi) {
        var ctrl = this;
        ctrl.waiting = false;

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

                $q.all(loadMessageByIdPromises).then(function (results) {
                    ctrl.waiting = false;
                    var messages = results.map(function (r) { return { id: r.id, snippet: r.snippet } });
                    ctrl.onLoadMessages({ messages: messages });
                });
            });
        };
    }];

    angular
        .module('gmailHistogramApp')
        .component('messageLoader', {
            templateUrl: 'messages/message-loader/message-loader.html',
            controller: messageLoaderController,
            bindings: {
                onLoadMessages: '&'
            }
        });
} ());