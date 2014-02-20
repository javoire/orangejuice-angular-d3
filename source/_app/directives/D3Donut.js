'use strict';

angular.module('app.directives')
  .directive('d3Donut', function($window, $timeout, d3Service, Colors) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        label: '@',
        onClick: '&'
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
          var renderTimeout;

          var svg = d3.select(element[0])
            .append('svg')
            .style('position', 'absolute')
            .style('width', '100%')
            .style('height', '100%')
            .style('left', '0')
            .style('top', '0'); // css perhaps?
 
          $window.onresize = function() {
            scope.$apply();
          };
 
          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });
 
          scope.$watch(function() {
            return angular.element($window)[0].innerHeight;
          }, function() {
            scope.render(scope.data);
          });
 
          scope.$watch('data', function(newData) {
            scope.render(newData);
          }, true);
 
          scope.render = function(data) {
            svg.selectAll('*').remove();
            data = data.sort(d3.descending);
 
            if (!data) { return; }

            var width = svg[0][0].clientWidth,
                height = svg[0][0].clientHeight,
                radius = Math.min(width, height) / 2;

            var color = d3.scale.linear()
              .domain([
                0,
                data.length
              ])
              .range([
                d3.hsl(Colors.getMainBlue()),
                d3.hsl(Colors.getMainBlue()).brighter(1)
              ]);

            var pie = d3.layout.pie()
                .sort(null);

            var arc = d3.svg.arc()
                .innerRadius(radius - radius/1.7)
                .outerRadius(radius - radius/3);

            var g = svg.append('g')
              .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

            var path = g.selectAll('path')
                .data(pie(data))
              .enter()
                .append('g')
                .attr('class', 'arc')
                .append('path')
                .attr('fill', function(d, i) { return color(i); })
                .attr('d', arc);
          };
        });
      }
    };
  });