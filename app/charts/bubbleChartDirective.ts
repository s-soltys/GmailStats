import * as ng from 'angular';
import * as d3 from 'd3';

export class BubbleChartDirective implements ng.IDirective {
    restrict: string = 'EA';

    scope: any = {
        'data': '<'
    };

    link: Function;

    constructor(private $window: ng.IWindowService) {
        this.link = (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            var svg = d3.select(element[0]).append('svg');
            
            svg.attr({
                'width': '100%',
                'class': 'bubble'
            });
            
            var svgElement = element.find('svg')[0];

            $window.onresize = () => scope.$apply();

            scope.$watch(
                () => svgElement.clientWidth,
                () => BubbleChartDirective.draw(svg, svgElement.clientWidth, scope.data));

            scope.$watch(
                'data',
                () => BubbleChartDirective.draw(svg, svgElement.clientWidth, scope.data));
        };
    }

    static draw(svg: d3.Selection<any>, diameter: number, inputData: any) {
        svg.attr('height', diameter);

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

    static flattenData(root) {
        var classes = [];
        function recurse(name, node) {
            if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });
            else classes.push({ packageName: name, className: node.name, value: node.size });
        }
        recurse(null, root);
        return { children: classes };
    }

    public static Factory(): ng.IDirectiveFactory {
        const directive = ($window: ng.IWindowService) => new BubbleChartDirective($window);

        directive['$inject'] = ['$window'];

        return directive;
    }
};