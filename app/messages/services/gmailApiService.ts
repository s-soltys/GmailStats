import * as angular from 'angular';

declare var gapi: any;

export class GmailApiService {
    public static $inject = ['$q'];
    
    private static CLIENT_ID: string = '272636970927-ul1mrflj9a7sc697k9ldkt5r28pfahal.apps.googleusercontent.com';
    private static SCOPES: string[] = ['https://www.googleapis.com/auth/gmail.readonly'];

    constructor(private $q: angular.IQService) {

    }

    checkAuth() {
        return this.$q(function (resolve, reject) {
            gapi.auth.authorize(
                { 'client_id': GmailApiService.CLIENT_ID, 'scope': GmailApiService.SCOPES.join(' '), 'immediate': true },
                function handleAuth(authResult) {
                    if (authResult && !authResult.error) {
                        resolve(authResult);
                    } else {
                        reject(authResult);
                    }
                });
        });
    };

    authorize(event) {
        return this.$q(function (resolve, reject) {
            gapi.auth.authorize(
                { 'client_id': GmailApiService.CLIENT_ID, 'scope': GmailApiService.SCOPES, 'immediate': false },
                function handleAuth(authResult) {
                    if (authResult && !authResult.error) {
                        resolve(authResult);
                    } else {
                        reject(authResult);
                    }
                });
        });
    };

    getMessageById(messageId) {
        return gapi.client.load('gmail', 'v1')
            .then(function listMessagesResult() {
                return gapi.client.gmail.users.messages.get({ 'userId': 'me', 'id': messageId, 'format': 'raw' });
            })
            .then(function getResult(response) {
                return response.result;
            });
    }

    getMessageList(params) {
        return gapi.client.load('gmail', 'v1')
            .then(function listMessagesResult() {
                return gapi.client.gmail.users.messages.list({ 'userId': 'me' });
            })
            .then(function getResult(response) {
                return response.result.messages;
            });
    };
};