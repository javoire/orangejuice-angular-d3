'use strict';

angular.module('app.directives')
  .directive('menu', function ($location) {
    return {
      // templateUrl: '_app/views/menu.ngt',
      restrict: 'A',
      replace: true,
      scope: {
        menu: '='
      },
      template: '<ul><li ng-repeat="item in menu" menu-item="item"></li></ul>',
      link: function(scope, element, attr) {

      }
    };
  });

angular.module('app.directives')
  .directive('menuItem', function ($compile, $location) {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        item: '=menuItem' // could also do menuItem: '=' .. right?
      },
      template: '<li ui-sref-active="active"><a ui-sref="{{item.state}}">{{item.title}}</a></li>',
      link: function(scope, element, attr) {
        if (scope.item.submenu) {
          var $submenu = $('<ul menu="item.submenu"></ul>'); // same as in index.html ....
          element.append($submenu);
        };
        // element.on('click', function() {
        //   scope.$apply;
        // });

        // scope.$on('$routeChangeSuccess', function() {
        //   // scope.currentRoute = $location.path() === scope.item.state ? true : false;
        //   if (scope.currentRoute) scope.$apply;
        // });

        $compile(element.contents())(scope); // so $submenu actually compiles with the menu directive...
      }
    }
  });