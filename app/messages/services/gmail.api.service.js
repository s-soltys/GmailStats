'use strict';

angular
    .module('gmailHistogramApp')
    .service('gmailApi', ['$q', function ($q) {
        var CLIENT_ID = '272636970927-ul1mrflj9a7sc697k9ldkt5r28pfahal.apps.googleusercontent.com';
        var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

        this.checkAuth = function checkAuth() {
            return $q(function (resolve, reject) {
                gapi.auth.authorize(
                    { 'client_id': CLIENT_ID, 'scope': SCOPES.join(' '), 'immediate': true },
                    function handleAuth(authResult) {
                        if (authResult && !authResult.error) {
                            resolve(authResult);
                        } else {
                            reject(authResult);
                        }
                    });
            });
        };

        this.authorize = function authorize(event) {
            return $q(function (resolve, reject) {
                gapi.auth.authorize(
                    { 'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false },
                    function handleAuth(authResult) {
                        if (authResult && !authResult.error) {
                            resolve(authResult);
                        } else {
                            reject(authResult);
                        }
                    });
            });
        };
        
        this.getMessageById = function getMessageById(messageId) {
            return gapi.client.load('gmail', 'v1')
                .then(function listMessagesResult() {
                    return gapi.client.gmail.users.messages.get({ 'userId': 'me', 'id': messageId, 'format': 'raw' });
                })
                .then(function getResult(response) {
                    return response.result;
                });
        }

        this.getMessageList = function getMessageList(params) {
            return gapi.client.load('gmail', 'v1')
                .then(function listMessagesResult() {
                    return gapi.client.gmail.users.messages.list({ 'userId': 'me' });
                })
                .then(function getResult(response) {
                    return response.result.messages;
                });
        };
    }]);