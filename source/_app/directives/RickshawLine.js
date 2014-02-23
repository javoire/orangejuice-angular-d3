'use strict';

angular.module('app.directives')
  .directive('rickshawLine', function ($document, $window, $timeout, RickshawService) {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        RickshawService.Rickshaw().then(function (Rickshaw) {
          console.log(element);
          var graph = new Rickshaw.Graph({
            element: element,
            series: [
              {
                color: 'steelblue',
                data: [ { x: 0, y: 23}, { x: 1, y: 15 }, { x: 2, y: 79 } ]
              }, {
                color: 'lightblue',
                data: [ { x: 0, y: 30}, { x: 1, y: 20 }, { x: 2, y: 64 } ]
              }
            ]
          });

          graph.render();
        });
      }
    };
  });