'use strict';

angular.module('app.directives')
  .directive('RickshawLine', function ($window, $timeout, RickshawService) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        label: '@',
        onClick: '&'
      },
      link: function(scope, ele, attrs) {
        RickshawService.Rickshaw().then(function (Rickshaw) {
          console.log('var');
        });
      }
    };
  });