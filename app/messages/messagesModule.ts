import * as angular from 'angular';
import {MessageListComponent} from './messageList';
import {LetterHistogramService} from './services/letterHistogramService';
import {MessageViewComponent} from './messagesViewComponent';
        
angular
.module('gs.messages', [])
.component('messageList', new MessageListComponent())
.component('messagesView', new MessageViewComponent())
.service('letterHistogram', LetterHistogramService);

import './services/gmail.api.service';
import './message-loader/message-loader.component';