'use strict';

var globData = {
    "name": "flare",
    "children": [
        {
            "name": "A",
            "size": 100000
        },
        {
            "name": "animate",
            "children": [
                { "name": "Easing", "size": 17010 }
            ]
        },
        {
            "name": "data",
            "children": [
                {
                    "name": "converters",
                    "children": [
                        { "name": "Converters", "size": 721 },
                        { "name": "DelimitedTextConverter", "size": 4294 },
                        { "name": "GraphMLConverter", "size": 9800 },
                        { "name": "IDataConverter", "size": 1314 },
                        { "name": "JSONConverter", "size": 2220 }
                    ]
                },
                { "name": "DataField", "size": 1759 },
                { "name": "DataSchema", "size": 2165 },
                { "name": "DataSet", "size": 586 },
                { "name": "DataSource", "size": 3331 },
                { "name": "DataTable", "size": 772 },
                { "name": "DataUtil", "size": 3322 }
            ]
        },
        {
            "name": "display",
            "children": [
                { "name": "DirtySprite", "size": 8833 },
                { "name": "LineSprite", "size": 1732 },
                { "name": "RectSprite", "size": 3623 },
                { "name": "TextSprite", "size": 10066 }
            ]
        },
        {
            "name": "util",
            "children": [
                { "name": "Arrays", "size": 8258 },
                { "name": "Colors", "size": 10001 },
                { "name": "Dates", "size": 8217 },
                { "name": "Displays", "size": 12555 },
                { "name": "Filter", "size": 2324 },
                { "name": "Geometry", "size": 10993 },
                {
                    "name": "heap",
                    "children": [
                        { "name": "FibonacciHeap", "size": 9354 },
                        { "name": "HeapNode", "size": 1233 }
                    ]
                },
                { "name": "IEvaluable", "size": 335 },
                { "name": "IPredicate", "size": 383 },
                { "name": "IValueProxy", "size": 874 },
                {
                    "name": "math",
                    "children": [
                        { "name": "DenseMatrix", "size": 3165 },
                        { "name": "IMatrix", "size": 2815 },
                        { "name": "SparseMatrix", "size": 3366 }
                    ]
                },
                { "name": "Maths", "size": 17705 },
                { "name": "Orientation", "size": 1486 },
                {
                    "name": "palette",
                    "children": [
                        { "name": "ColorPalette", "size": 6367 },
                        { "name": "Palette", "size": 1229 },
                        { "name": "ShapePalette", "size": 2059 },
                        { "name": "SizePalette", "size": 2291 }
                    ]
                },
                { "name": "Property", "size": 5559 },
                { "name": "Shapes", "size": 19118 },
                { "name": "Sort", "size": 6887 },
                { "name": "Stats", "size": 6557 },
                { "name": "Strings", "size": 22026 }
            ]
        }
    ]
};

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

    // Returns a flattened hierarchy containing all leaf nodes under the root.
    function classes(root) {
        var classes = [];

        function recurse(name, node) {
            if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });
            else classes.push({ packageName: name, className: node.name, value: node.size });
        }

        recurse(null, root);
        return { children: classes };
    }

    d3.select(self.frameElement).style("height", diameter + "px");
};

angular
    .module('gmailHistogramApp')
    .directive('d3BubbleChart', ['$window', function ($window) {
        return {
            restrict: 'EA',
            scope: {},
            link: function (scope, element, attrs) {
                var svg = d3.select(element[0]).append('svg');

                $window.onresize = function () {
                    scope.$apply();
                };

                scope.$watch(function () {
                    return angular.element($window)[0].innerWidth;
                }, function () {
                    scope.render(scope.data);
                });

                scope.render = function (data) {
                    drawModule(svg, globData);
                };
            }
        };
    }]);