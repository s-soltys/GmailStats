import * as angular from 'angular';
import {BubbleChartDirective} from './bubbleChartDirective';

angular
.module('gs.charts', [])
.directive('d3BubbleChart', BubbleChartDirective.Factory());