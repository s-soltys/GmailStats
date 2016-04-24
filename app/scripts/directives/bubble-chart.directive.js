'use strict';

var drawModule = function (svg, diameter, inputData) {
    var format = d3.format(",d");
    var color = d3.scale.category20c();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);
        
    var flatData = bubble.nodes(flattenData(inputData)).filter(function (d) { return !d.children; });

    var node = svg.selectAll("g")
        .data(flatData)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("title")
        .text(function (d) { return d.className + ": " + format(d.value); });

    node.append("circle")
        .attr("r", function (d) { return d.r; })
        .style("fill", function (d) { return color(d.packageName); });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function (d) { return d.className.toUpperCase(); });
    
    function flattenData(root) {
        var classes = [];
        function recurse(name, node) {
            if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });
            else classes.push({ packageName: name, className: node.name, value: node.size });
        }
        recurse(null, root);
        return { children: classes };
    }
};

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