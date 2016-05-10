import * as angular from 'angular';
import 'lodash';
import 'd3';
import 'angular-sanitize';
import 'angular-route';
import './messages/messagesModule';

import './charts/chartsModule';

angular
.module('gmailHistogramApp', [
  'ngRoute',
  'ngSanitize',
  'gs.charts',
  'gs.messages'
]);

import './routes';