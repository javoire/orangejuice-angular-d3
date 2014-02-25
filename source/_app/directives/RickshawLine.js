'use strict';

angular.module('app.directives')
  .directive('rickshawLine', function ($document, $window, $timeout, RickshawService, d3Service) {
    return {
      restrict: 'E',
      templateUrl: '_app/views/templates/rickshaw-line.ngt',
      transclude: true,
      scope: {
        source: '='
      },
      link: function(scope, element, attrs) {
        // double promise?! this should go in RickshawService.. but le how
        d3Service.d3().then(function (d3) {
          RickshawService.Rickshaw().then(function (Rickshaw) {
            var graph, data, container;

            container = element.find('.chart');
            xAxis = element.find('.x-axis');

            function setupGraph(data) {
              graph = new Rickshaw.Graph({
                element: container[0], // the [0] to get the actual DOM element.. and not the jQlite/jQuery obj... 
                renderer: 'line',
                width: angular.element($window)[0].innerWidth,
                height: 500,
                series: [
                  {
                    color: '#FF6E00',
                    data: data
                  }
                ]
              });
              graph.render();

              // var hoverDetail = new Rickshaw.Graph.HoverDetail({
              //   graph: graph,
              //   xFormatter: function(x) { return x + " lol" },
              //   yFormatter: function(y) { return y + " st" }
              // });

              var x_ticks = new Rickshaw.Graph.Axis.X({
                graph: graph,
                orientation: 'bottom',
                element: xAxis[0],
                pixelsPerTick: 5,
                tickFormat: function(n) {
                  var map, prevMonth, month, i;

                  map = {};
                  scope.source.data.forEach(function(d) {
                    month = d.date.split('-')[1];
                    if (month != prevMonth && prevMonth !== undefined) {
                      map[d.x] = month;
                    };
                    prevMonth = month;
                  })
                  console.log(map);
                  return map[n];
                }
              });
            }

            $window.onresize = function() {
              scope.$apply();
            };
            scope.$watch('source', function(source) {
              data = source.data;
              if (!graph) {
                setupGraph(data);
              }
            }, true);
            scope.$watch(function() {
              return container.width(); // watch this property
            }, function(width) {
              if (graph) {
                graph.configure({
                  width: width,
                  height: 500 // loool
                });
                graph.render();
              };
            });
          });
        });
      }
    };
  });