'use strict';

var drawModule = function (svg, inputData) {
    var diameter = 500,
        format = d3.format(",d"),
        color = d3.scale.category20c();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    svg.attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");
        
    d3.select(self.frameElement).style("height", diameter + "px");

    var node = svg.selectAll(".node")
        .data(bubble.nodes(classes(inputData))
            .filter(function (d) { return !d.children; }))
        .enter().append("g")
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
        .text(function (d) { return d.className.substring(0, d.r / 3); });
    
    function classes(root) {
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
                var svg = d3.select(element[0]).append('svg');

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
                    
                scope.$watch(
                    'data',
                    function () {
                        scope.render(scope.data);
                    });

                scope.render = function (data) {
                    console.log('render');
                    drawModule(svg, data);
                };
            }
        };
    }]);