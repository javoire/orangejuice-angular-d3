'use strict';

angular.module('app.directives')
  .directive('rickshawLine', function ($document, $window, $timeout, RickshawService, d3Service) {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        // double promise?! this should go in RickshawService.. but le how
        d3Service.d3().then(function (d3) {
          RickshawService.Rickshaw().then(function (Rickshaw) {
            // $window.onresize = function() {
            //   scope.$apply();
            // };
            // scope.$watch(function() {
            //   return angular.element($window)[0].innerWidth;
            // }, function() {
            //   graph.configure({
            //     width: angular.element($window)[0].innerWidth
            //   });
            //   graph.render();
            // });

            var graphIsInitialized = false; //lol

            scope.$watch('data', function(_data) {
              if (!graphIsInitialized) {
                data = _data;
                console.log('data watched', data);

                var graph = new Rickshaw.Graph({
                  element: element[0],
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
                graph.render();
                graphIsInitialized = true;

                var hoverDetail = new Rickshaw.Graph.HoverDetail({
                  graph: graph,
                  xFormatter: function(x) { return x + " lol" },
                  yFormatter: function(y) { return y + " st" }
                });
              };
            }, true);

          });
        });
      }
    };
  });