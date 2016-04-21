'use strict';

angular
    .module('gmailHistogramApp')
    .factory('gmailApi', function () {
        // Your Client ID can be retrieved from your project in the Google
        // Developer Console, https://console.developers.google.com
        var CLIENT_ID = '272636970927-ul1mrflj9a7sc697k9ldkt5r28pfahal.apps.googleusercontent.com';

        var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

        return {
            /**
             * Check if current user has authorized this application.
             */
            checkAuth: function checkAuth() {
                gapi.auth.authorize(
                    {
                        'client_id': CLIENT_ID,
                        'scope': SCOPES.join(' '),
                        'immediate': true
                    }, this.handleAuthResult.bind(this));
            },

            /**
             * Handle response from authorization server.
             *
             * @param {Object} authResult Authorization result.
             */
            handleAuthResult: function handleAuthResult(authResult) {
                if (authResult && !authResult.error) {
                    this.loadGmailApi();
                } else {
                    
                }
            },

            /**
             * Initiate auth flow in response to user clicking authorize button.
             *
             * @param {Event} event Button click event.
             */
            handleAuthClick: function handleAuthClick(event) {
                gapi.auth.authorize(
                    { client_id: CLIENT_ID, scope: SCOPES, immediate: false },
                    this.handleAuthResult.bind(this));
                return false;
            },

            /**
             * Load Gmail API client library. List labels once client library
             * is loaded.
             */
            loadGmailApi: function loadGmailApi() {
                gapi.client.load('gmail', 'v1', this.listLabels.bind(this));
            },

            /**
             * Print all Labels in the authorized user's inbox. If no labels
             * are found an appropriate message is printed.
             */
            listLabels: function listLabels() {
                var request = gapi.client.gmail.users.labels.list({
                    'userId': 'me'
                });

                request.execute(function (resp) {
                    var labels = resp.labels;
                    
                    labels.forEach(function printLabel(label) {
                        console.log(label.name);
                    });
                });
            }
        };
    });