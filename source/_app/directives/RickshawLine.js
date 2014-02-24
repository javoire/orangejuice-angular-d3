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

            scope.title = scope.source.title;

            data = [{x:0, y:0}];
            container = element.find('.viz-container');

            function setupGraph(data) {
              graph = new Rickshaw.Graph({
                element: container[0], // the [0] to get the actual DOM element.. and not the jQlite/jQuery obj... 
                renderer: 'line',
                width: angular.element($window)[0].innerWidth,
                height: 500,
                series: [
                  {
                    color: 'steelblue',
                    data: data
                  }
                ]
              });

              // var hoverDetail = new Rickshaw.Graph.HoverDetail({
              //   graph: graph,
              //   xFormatter: function(x) { return x + " lol" },
              //   yFormatter: function(y) { return y + " st" }
              // });
            }

            $window.onresize = function() {
              scope.$apply();
            };
            scope.$watch('source', function(source) {
              data = source.data; console.log('data watched', data);
              if (!graph) {
                setupGraph(data);
                graph.render();
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