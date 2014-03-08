'use strict';

angular.module('app.directives')
  .directive('d3Line', function ($window, $timeout) {
    return {
      restrict: 'E',
      templateUrl: '_app/views/templates/d3-line.ngt',
      scope: {
        source: '=',
      },
      link: function(scope, element, attrs) {
        var width, height, svg, container, margin = 10, data;

        console.log('d3line');

        container = element.find('.chart');

        svg = d3.select(container[0])
          .append('svg')
          .attr('height', '450px');

        // modularize this watch block..... elsewhere
        $window.onresize = function() {
          scope.$apply();
        };
        scope.$watch('source', function(source) {
          if(!source) return;
          scope.title = source.title;
          data = source.data;
          scope.render();
        }, true)
        scope.$watch(function() {
          return container.width();
        }, function() {
          scope.render();
        });

        scope.render = function() {
          svg.selectAll('*').remove();

          if (!data) return;

          width = container.outerWidth();
          height = svg.style('height').replace('px', '');

          svg.attr('width', width);

          var Ymax = d3.max(data, function(d) { return d[1]; })
          var x = d3.scale.linear().domain([0, data.length]).range([margin, width-margin]); // map relationship between input data and screen-coords
          var y = d3.scale.linear().domain([0, Ymax]).range([height-margin, margin]);

          var line = d3.svg.line() // convert data values to actual screen cords, using the mapping defined above... x and y
            .x(function(d, i) { return x(i); }) // smooth it out by checking difference between next and prev value? (angle...)
            .y(function(d, i) { return y(d[1]); });

          svg.append('path')
            .attr('d', line(data))
            .attr('class', 'd3-line');

          svg.append('g').selectAll('circle')
            .data(data)
            .enter().append('circle')
              .attr('cx', function(d, i) { return x(i) } )
              .attr('cy', function(d) { return y(d[1])} )
              .attr('r', 5)
              .attr('class', 'd3-line-circle');
        }
      }
    };
  });