'use strict';

angular.module('app.directives')
  .directive('d3Treemap', function ($window, $timeout) {
    return {
      restrict: 'E',
      template: '<div></div>', // houston we have a problem... this prevents it from firing link function twice
      scope: {
        source: '=',
      },
      link: function(scope, element, attrs) {
        var div;

        div = d3.select(element[0])
          .append('div')
          .attr('class', 'treemap-wrapper')
          .style('height', '500px');

        $div = $('.treemap-wrapper') // LOOOOOL

        scope.$watch('source', function(source) {
          scope.render(source);
        })

        scope.render = function(data) {
          if (!data) return;

          width = $div.outerWidth();
          height = div.style('height').replace('px', '');

          var treemap = d3.layout.treemap()
              .size([width, height])
              .sticky(true)
              .value(function(d) { return d.value; });

          treemap.sort(function(a, b) {
            return a.value - b.value;
          });

          var node = div.datum(data).selectAll('div')
                .data(treemap.nodes)
                .enter().append('div')
                  .attr('class', function(d) {
                    return (!!d.parent) ? 'node' : 'root';
                  })
                  .call(position)
                  .text(function(d) { return (!!d.parent) ? d.name : '' });
 
          function position() {
            this.style('left', function(d) { return d.x + 'px'; })
                .style('top', function(d) { return d.y + 'px'; })
                .style('width', function(d) { return Math.max(0, d.dx-4) + 'px'; })
                .style('height', function(d) { return Math.max(0, d.dy-4) + 'px'; })
                .style('line-height', function(d) { return Math.max(0, d.dy-4) + 'px'; });
          }
        }
      }
    }
  });