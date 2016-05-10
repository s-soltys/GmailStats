import * as angular from 'angular';
import {MessageListComponent} from './messageList';

angular
.module('gmailHistogramApp')
.component('messageList', new MessageListComponent());