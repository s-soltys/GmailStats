import * as angular from 'angular';
import * as _ from 'lodash';
import {LetterHistogramService} from './services/letterHistogramService';

declare function require(string: string): string;

export class MessageViewComponent implements angular.IComponentOptions {
    template: string = `
    <message-loader on-load-messages="vm.onLoadMessages(messages)"></message-loader>
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="row">
            <div class="col-md-4">
                <h3>Messages:</h3>
                <message-list messages="vm.messages" show-details="vm.showDetails(message)"></message-list>
            </div>
            <div class="col-md-8">
                <d3-bubble-chart ng-if="vm.chartData" data="vm.chartData"></d3-bubble-chart>
            </div>
            </div>
        </div>
    </div>`;

    controller: Function = MessagesViewController;

    controllerAs: string = 'vm';

    bindings: any = {

    };

};

export class MessagesViewController {
    public static $inject = ['$scope', 'gmailApi', 'letterHistogram', '$q'];

    private messages: any[];
    private chartData: any;

    constructor($scope, gmailApi, private letterHistogram: LetterHistogramService, $q) {
        this.messages = [];
        this.chartData = null;
    };

    onLoadMessages(messages) {
        this.messages = messages;

        var msgArray = messages.map(function (msg) { return msg.snippet; });
        var histogram = this.letterHistogram.create(msgArray);

        this.chartData = this.formChartData(histogram);
    };

    formChartData(histogram) {
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