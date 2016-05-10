import * as angular from 'angular';
import {MessageListComponent} from './messageList';
        
angular
.module('gs.messages', [])
.component('messageList', new MessageListComponent());

import './services/gmail.api.service';
import './services/letter-histogram.service';
import './message-loader/message-loader.component';
import './messages-view/messages-view.component';