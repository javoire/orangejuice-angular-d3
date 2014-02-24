'use strict';

angular.module('app.directives')
  .directive('navigation', function ($location) {
    return {
      templateUrl: '_app/views/navigation.ngt',
      restrict: 'A',
      controller: function() {
        this.toggle = function() {
          alert('toggle');
        }
      },
      link: function(scope, element, attrs) {
        // move this to Ctrl or some config file ish... 
        scope.navList = [
          {
            url: '/',
            title: 'Summary'
          },
          {
            url: '/companies',
            title: 'Companies',
            subNav: [{
              url: '/industries',
              title: 'Industries'
            },{
              url: '/programmes',
              title: 'Programmes'
            },{
              url: '/offers',
              title: 'Offers'
            },{
              url: '/priorities',
              title: 'Priorities'
            }]
          },
          {
            url: '/users',
            title: 'Users',
            subNav: [{
              url: '/Bookmarks',
              title: 'Bookmarks'
            },{
              url: '/Interests',
              title: 'Interests'
            }]
          }
        ];

        function detectRoute() {
          angular.forEach(scope.navList, function(item) {
            item.active = $location.path() === item.url ? true : false;

            angular.forEach(item.subNav, function(subItem) {
              subItem.active = $location.path() === subItem.url ? true : false;
            });
          });
        }

        scope.$on('$routeChangeSuccess', detectRoute);
      }
    };
  });
