import * as angular from 'angular';

export class MessageListComponent implements angular.IComponentOptions {
    template: string = `
    <ul class="list-group">
        <li class="list-group-item" ng-repeat="message in ctrl.messages" id="{{ message.id }}" ng-click="ctrl.showDetails({ message: message })">
            <small ng-bind-html="message.snippet"></small>
        </li>
    </ul>`;
    
    controller: Function = MessageListController;
    
    controllerAs: string = 'ctrl';
    
    bindings: any = {
        'messages': '<',
        'showDetails': '&'
    }
};

export class MessageListController {
    public static $inject = ['$scope', '$element', '$attrs', '$q'];
    
    constructor($scope: angular.IScope, $element, $attrs, $q){
        
    }
}