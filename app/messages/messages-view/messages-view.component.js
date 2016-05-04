(function () {
    'use strict';

    angular
    .module('gmailHistogramApp')
    .component('messagesView', {
        templateUrl: 'messages/messages-view/messages-view.html',
        controller: MessagesViewController,
        controllerAs: 'vm',
        bindings: {
            
        }
    });
        
    MessagesViewController.$inject = ['$scope', 'gmailApi', 'letterHistogram', '$q'];

    function MessagesViewController($scope, gmailApi, letterHistogram, $q) {
        var vm = this;
        vm.messages = [];
        vm.chartData = null;

        this.onLoadMessages = function onLoadMessages(messages) {
            vm.messages = messages;

            var msgArray = messages.map(function (msg) { return msg.snippet; });
            var histogram = letterHistogram.create(msgArray);

            vm.chartData = vm.formChartData(histogram);
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