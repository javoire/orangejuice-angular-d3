'use strict';

angular.module('app.directives')
  .directive('d3CompaniesSummary', function($window, $timeout, d3Service) {
    return {
      restrict: 'A',
      scope: {
        data: '=' // for the $watch
      },
      link: function (scope, element, attrs) {
        d3Service.d3().then(function (d3) {
          var svg = d3.select(element[0])
            .append('svg')
            .style('height', '900px');

          $window.onresize = function() {
            scope.$apply();
          };

          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });

          scope.$watch('data', function(newData) {
            scope.render(newData);
          }, true);

          scope.render = function(data) {
            if (!data) { return; }
            svg.selectAll('*').remove();

            // console.log('d3 companies summary rendering', data);
            var containerHeight = svg[0][0].clientHeight;
            var containerWidth = svg[0][0].clientWidth;

            var radius = Math.min(containerWidth, containerHeight) / 1.2;
            var theta = 2 / data.length / 180;

            var angle = d3.scale.linear()
              .domain([0, data.length])
              .range([0, 2 * Math.PI]);

            // var color = d3.scale.linear()
            //   .domain([
            //     0,
            //     data.length
            //   ])
            //   .range([
            //     d3.hsl(Colors.getMainBlue()),
            //     d3.hsl(Colors.getMainBlue()).brighter(1.01)
            //   ]);

            var g = svg.append('g')
              .attr('transform', 'translate(' + containerWidth / 2 + ',' + containerHeight / 2 + ')');

            var text = g.selectAll('text').data(data).enter()
              .append('text')
              .attr('height', function() { return 2; })
              .attr('x', function(d, i) { return radius/2.5 * Math.cos(i * theta); })
              .attr('y', function(d, i) { return radius/2.5 * Math.sin(i * theta); })
              .attr('transform', function(d, i) {
                return 'rotate('+angle(i) * 180 / Math.PI +',0,0)';
              })
              .attr('fill', 'white')
              .style('font-size', function() { return containerHeight / data.length * 1.8; })
              .text(function(d) { return d.name; });
          };
        });
      }
    };
  });
