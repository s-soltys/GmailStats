import * as angular from 'angular';
import 'lodash';
import 'd3';
import 'angular-sanitize';
import 'angular-route';
import './messages/messagesModule';
import './charts/chartsModule';
import './exception/exceptionHandlerModule';
import './declarations';
import {RouteConfig} from './routes';

angular
.module('gmailHistogramApp', [
  'ngRoute',
  'ngSanitize',
  'gs.charts',
  'gs.messages',
  'app.exception'
])
.config(RouteConfig);