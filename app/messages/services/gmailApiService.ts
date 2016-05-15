import * as angular from 'angular';

declare var gapi: any;

export class GmailApiService {
    public static $inject = ['$q'];
    
    private static CLIENT_ID: string = '272636970927-ul1mrflj9a7sc697k9ldkt5r28pfahal.apps.googleusercontent.com';
    private static SCOPES: string[] = ['https://www.googleapis.com/auth/gmail.readonly'];

    constructor(private $q: angular.IQService) {

    }

    authorize(): angular.IPromise<any> {
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
    }

    getMessageById(messageId: string): angular.IPromise<any> {
        return this.callApi(() => {
            return gapi.client.gmail.users.messages.get({ 'userId': 'me', 'id': messageId, 'format': 'raw' });
        });
    }

    getMessageList(): angular.IPromise<any[]> {
        return this
            .callApi(() => {
                return gapi.client.gmail.users.messages.list({ 'userId': 'me' }); 
            })
            .then(result => result.messages);
    }
    
    private callApi(clientCall: Function): angular.IPromise<any> {
        return this.$q((resolve, reject) => {
            gapi.client.load('gmail', 'v1')
                .then(() => clientCall())
                .then((response) => resolve(response.result));
        });
    }
};