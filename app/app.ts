import * as angular from 'angular';
import 'lodash';
import 'd3';
import 'angular-sanitize';
import 'angular-route';

import './charts/bubble-chart.directive';

angular
.module('gmailHistogramApp', [
  'ngRoute',
  'ngSanitize',
  'app.charts'
]);

import './routes';
import './messages/messages.module';