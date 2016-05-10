import * as angular from 'angular';
import {MessageListComponent} from './messageList';
import {LetterHistogramService} from './services/letterHistogramService';
        
angular
.module('gs.messages', [])
.component('messageList', new MessageListComponent())
.service('letterHistogram', LetterHistogramService);

import './services/gmail.api.service';
import './messages-view/messages-view.component';
import './message-loader/message-loader.component';