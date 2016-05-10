import * as angular from 'angular';
import * as d3 from 'd3';

export class BubbleChartDirective implements angular.IDirective {
    restrict: string = 'EA';

    scope: any = {
        'data': '<'
    };

    link: Function;

    constructor(private $window: angular.IWindowService) {
        this.link = (scope: any, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
            var diameter = 450;
            var svg = d3.select(element[0]).append('svg');

            svg.attr({
                'width': diameter,
                'height': diameter,
                'class': 'bubble'
            });

            $window.onresize = () => scope.$apply();

            scope.$watch(
                () => angular.element($window)[0].innerWidth,
                () => this.draw(svg, diameter, scope.data));

            scope.$watch(
                'data',
                () => this.draw(svg, diameter, scope.data));
        };
    }

    draw(svg: d3.Selection<any>, diameter: number, inputData: any) {
        var format = d3.format(",d");
        var color = d3.scale.category20c();

        var bubble = d3.layout.pack()
            .sort(null)
            .size([diameter, diameter])
            .padding(1.5);

        var flatData = bubble.nodes(this.flattenData(inputData)).filter(function (d) { return !d.children; });

        var node = svg.selectAll("g").data(flatData);

        var appendedNode = node.enter().append("g").attr("class", "node");
        appendedNode.append("circle");
        appendedNode.append("text").attr("dy", ".3em").style("text-anchor", "middle");

        node.attr("transform", d => "translate(" + d.x + "," + d.y + ")");

        node.select("circle")
            .attr("r", d => d.r)
            .style("fill", (d: any) => color(d.packageName));

        node.select("text").text((d: any) => d.className.toUpperCase());

        node.exit().remove();
    }

    flattenData(root) {
        var classes = [];
        function recurse(name, node) {
            if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });
            else classes.push({ packageName: name, className: node.name, value: node.size });
        }
        recurse(null, root);
        return { children: classes };
    }

    public static Factory(): angular.IDirectiveFactory {
        const directive = ($window: angular.IWindowService) => new BubbleChartDirective($window);

        directive['$inject'] = ['$window'];

        return directive;
    }
};