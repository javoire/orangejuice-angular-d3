'use strict';

angular.module('app')
  .controller('AppCtrl', function ($rootScope, $scope) {
    $scope.menu = [ // move this to some config file ish... 
      {
        title: 'Summary',
        state: 'home'
      },
      {
        title: 'Companies',
        state: 'companies',
        submenu: [{
          title: 'Industries',
          state: 'companies.industries'
        }
        // ,{
        //   title: 'Programmes',
        //   state: 'companies.programmes'
        // },{
        //   title: 'Offers',
        //   state: 'companies.offers'
        // },{
        //   title: 'Priorities',
        //   state: 'companies.priorities'
        // }
        ]
      },
      {
        title: 'Users',
        state: 'users',
        submenu: [{
          title: 'Bookmarks',
          state: 'users/bookmarks'
        },{
          title: 'Interests',
          state: 'users/interests'
        }]
      },
      {
        title: 'Services',
        state: 'services'
      },
      {
        title: 'GDP',
        state: 'gdp'
      }
    ];
    
    // Globals
    //-------------------------------
    $rootScope.colors = {
      mainAccent: '#5DA3DF'
    }
  });