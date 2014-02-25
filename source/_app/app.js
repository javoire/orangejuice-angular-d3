(function(){
  'use strict';

  angular.module('app.directives', ['Rickshaw', 'd3']);

  angular.module('app', [
    // 'ngCookies',
    'ngResource',
    // 'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'app.directives',
    '_app/views/navigation.ngt',
    '_app/views/companies.ngt',
    '_app/views/home.ngt',
    '_app/views/users.ngt',
    '_app/views/donut.ngt',
    '_app/views/templates/rickshaw-line.ngt',
    '_app/views/templates/d3-line.ngt',
    '_app/views/templates/menu-btn.ngt'
  ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '_app/views/home.ngt',
          controller: 'HomeCtrl'
        })
        .when('/donut', {
          templateUrl: '_app/views/donut.ngt',
          controller: 'HomeCtrl'
        })
        .when('/companies', {
          templateUrl: '_app/views/companies.ngt',
          controller: 'CompaniesCtrl'
        })
        .when('/industries', {
          templateUrl: '_app/views/companies.ngt',
          controller: 'CompaniesCtrl'
        })
        .when('/users', {
          templateUrl: '_app/views/users.ngt',
          controller: 'UsersCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
})();