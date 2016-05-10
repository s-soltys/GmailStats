import * as angular from 'angular';
import {LetterHistogramService} from './services/letterHistogramService';
import {GmailApiService} from './services/gmailApiService';
import {MessageListComponent} from './messageList';
import {MessageViewComponent} from './messagesViewComponent';
import {MessageLoaderComponent} from './messageLoaderComponent';
        
angular
.module('gs.messages', [])
.component('messageList', new MessageListComponent())
.component('messagesView', new MessageViewComponent())
.component('messageLoader', new MessageLoaderComponent())
.service('letterHistogram', LetterHistogramService)
.service('gmailApi', GmailApiService);
