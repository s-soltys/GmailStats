(function () {
    'use strict';

    angular
    .module('gmailHistogramApp')
    .component('messagesView', {
        templateUrl: 'messages/messages-view/messages-view.html',
        controller: MessagesViewController,
        bindings: {
            
        }
    });
        
    MessagesViewController.$inject = ['$scope', 'gmailApi', 'letterHistogram', '$q'];

    function MessagesViewController($scope, gmailApi, letterHistogram, $q) {
        var ctrl = this;
        ctrl.messages = [];
        ctrl.chartData = null;

        this.onLoadMessages = function onLoadMessages(messages) {
            ctrl.messages = messages;

            var msgArray = messages.map(function (msg) { return msg.snippet; });
            var histogram = letterHistogram.create(msgArray);

            ctrl.chartData = ctrl.formChartData(histogram);
        };

        this.formChartData = function (histogram) {
            var vowelRegex = /[aeiou]/;

            var chartChildren = _
                .chain(histogram)
                .map(function (count, letter) { return { "name": letter, "size": count }; })
                .groupBy(function (item) {
                    return vowelRegex.test(item.name) ? 'vowel' : 'consonant';
                })
                .map(function (children, group) {
                    return { "name": group + 'xxx', "children": children };
                })
                .value();

            return {
                "name": "flare",
                "children": chartChildren
            };
        }

    };

} ());