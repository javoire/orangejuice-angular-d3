(function(){
  'use strict';

  angular.module('app.directives', []);

  angular.module('app', [
    // 'ngCookies',
    'ngResource',
    // 'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'd3',
    'app.directives',
    '_app/views/navigation.ngt',
    '_app/views/companies.ngt',
    '_app/views/home.ngt',
    '_app/views/users.ngt',
    '_app/views/donut.ngt'
  ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '_app/views/home.ngt',
          controller: 'MainCtrl'
        })
        .when('/donut', {
          templateUrl: '_app/views/donut.ngt',
          controller: 'MainCtrl'
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