'use strict';

var drawModule = (function () {
    function flattenData(root) {
        var classes = [];
        function recurse(name, node) {
            if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });
            else classes.push({ packageName: name, className: node.name, value: node.size });
        }
        recurse(null, root);
        return { children: classes };
    };
    
    return function draw(svg, diameter, inputData) {
        var format = d3.format(",d");
        var color = d3.scale.category20c();

        var bubble = d3.layout.pack()
            .sort(null)
            .size([diameter, diameter])
            .padding(1.5);

        var flatData = bubble.nodes(flattenData(inputData)).filter(function (d) { return !d.children; });
        
        var node = svg.selectAll("g").data(flatData);
        
        var appendedNode = node.enter().append("g").attr("class", "node");
        appendedNode.append("circle");
        appendedNode.append("text").attr("dy", ".3em").style("text-anchor", "middle");
            
        node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

        node.select("circle")
            .attr("r", function (d) { return d.r; })
            .style("fill", function (d) { return color(d.packageName); });

        node.select("text").text(function (d) { return d.className.toUpperCase(); });
            
        node.exit().remove();
    };
} ());

angular
    .module('gmailHistogramApp')
    .directive('d3BubbleChart', ['$window', function ($window) {
        return {
            restrict: 'EA',
            scope: {
                data: '='
            },
            link: function (scope, element, attrs) {
                var diameter = 450;
                var svg = d3.select(element[0]).append('svg');
                svg.attr({
                    'width': diameter,
                    'height': diameter,
                    'class': 'bubble'
                });

                $window.onresize = function () {
                    scope.$apply();
                };

                scope.$watch(
                    function () {
                        return angular.element($window)[0].innerWidth;
                    },
                    function () {
                        scope.render(scope.data);
                    });

                scope.$watch('data',
                    function () {
                        scope.render(scope.data);
                    });

                scope.render = function (data) {
                    drawModule(svg, diameter, data);
                };
            }
        };
    }]);