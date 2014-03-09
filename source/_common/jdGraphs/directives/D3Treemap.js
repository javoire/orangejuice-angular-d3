'use strict';

angular.module('jdGraphs').directive('d3Treemap', function ($window) {
    return {
      restrict: 'E',
      templateUrl: '_common/jdGraphs/templates/treemap.ngt',
      scope: {
        source: '=',
      },
      link: function(scope, element, attrs) {
        var container, data;

        container = element.find('.chart');

        var treemapdiv = d3.select(container[0])
          .append('div')
          .attr('class', 'treemap-wrapper')
          .style('height', '500px');

        $window.onresize = function() {
          scope.$apply();
        };

        scope.$watch('source', function(source) {
          if (source) {
            scope.title = source.title;
            data = source.data;
            scope.render();
          };
        })

        scope.$watch(function() {
          return element.width();
        }, function() {
          scope.render();
        });


        scope.render = function() {
          if (!data) return;

          treemapdiv.selectAll('*').remove();

          width = container.outerWidth();
          height = treemapdiv.style('height').replace('px', '');

          var treemap = d3.layout.treemap()
              .size([width, height])
              .value(function(d) { return d.value; })
              .sort(function(a, b) { return a.value - b.value; });

          var node = treemapdiv.datum(data).selectAll('div')
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