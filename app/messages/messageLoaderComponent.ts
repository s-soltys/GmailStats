import * as angular from 'angular';
import {GmailApiService} from './services/gmailApiService';

export class MessageLoaderComponent implements angular.IComponentOptions {
    template: string = `
        <div class="panel panel-info">
            <div class="panel-heading">
                <h4>Load message snippets from Gmail</h4>
            </div>
            <div class="panel-body">
                <div class="col-md-6">
                    <button ng-click="vm.authAndLoadData()" class="btn btn-primary">Load</button>
                    <span ng-if="vm.waiting">Please wait...</span>
                </div>
                <div class="col-md-6">
                </div>
            </div>
        </div>`;
    
    controller: Function = MessageLoaderController;
    
    controllerAs: string = 'vm';
    
    bindings: any = {
        'onLoadMessages': '&'
    };
}

export class MessageLoaderController {
    public static $inject = ['$q', 'gmailApi'];
    
    waiting: boolean = false;
    messages: any[] = [];
    onLoadMessages: Function;
    
    constructor(private $q: angular.IQService, private gmailApi: GmailApiService) {
        
    }
    
    authAndLoadData() {
        this.waiting = true;
        this.gmailApi.authorize().then(this.loadMessages.bind(this));
    };
    
    loadMessages() {
        this.gmailApi.getMessageList().then((messages) => {
            let loadMessageByIdPromises = messages.map(m => this.gmailApi.getMessageById(m.id));

            loadMessageByIdPromises.forEach((loadMessagePromise, index) => {
                loadMessagePromise.then((results) => {
                    this.messages.push({ id: results.id, snippet: results.snippet });
                    this.onLoadMessages({ messages: this.messages });
                });
            });

            this.$q.all(loadMessageByIdPromises).then(r => this.waiting = false);
        });
    };
};