'use strict';

angular.module('app.directives')
  .directive('d3Treemap', function ($window, $timeout, d3Service) {
    return {
      restrict: 'E',
      scope: {
        source: '=',
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function (d3) {
          var svg;

          svg = d3.select(element[0])
            .append('svg')
            .attr('height', '500px');

          scope.$watch('source', function(source) {
            scope.render(source)
          }, true)

          scope.render = function(data) {
            if (!data) return;

            width = element.outerWidth();
            height = svg.style('height').replace('px', '');

            var treemap = d3.layout.treemap()
                .size([width, height])
                .sticky(true)
                .value(function(d) { return d[1]; });

            var node = svg.data(data).selectAll('.node')
                  .data(treemap.nodes)
                  .enter().append('div')
                    .attr('class', 'node')
                    // .call(position)
                    .text(function(d) { return d[0] });

            svg.append(node);

            element.html('treemap yo');
          }
        });
      }
    }
  });