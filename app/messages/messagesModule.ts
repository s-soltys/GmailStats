import * as angular from 'angular';
import {LetterHistogramService} from './services/letterHistogramService';
import {GmailApiService} from './services/gmailApiService';
import {MessageListComponent} from './messageList';
import {MessageViewComponent} from './messagesViewComponent';
        
angular
.module('gs.messages', [])
.component('messageList', new MessageListComponent())
.component('messagesView', new MessageViewComponent())
.service('letterHistogram', LetterHistogramService)
.service('gmailApi', GmailApiService);

import './message-loader/message-loader.component';