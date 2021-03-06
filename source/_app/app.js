(function(){
  'use strict';

  angular.module('app.directives', []);

  angular.module('app', [
    'ui.router',
    'ngResource',
    'ngRoute',
    'ngAnimate',
    'jdGraphs',
    'app.directives',
    '_app/views/companies.ngt',
    '_app/views/industries.ngt',
    '_app/views/home.ngt',
    '_app/views/users.ngt',
    '_app/views/donut.ngt',
    '_app/views/hosts.ngt',
    '_app/views/gdp.ngt',
    '_app/views/templates/menu-btn.ngt'
  ])
    .config(function ($stateProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '_app/views/home.ngt',
          controller: 'HomeCtrl'
        })
        .state('donut', {
          url: '/donut',
          templateUrl: '_app/views/donut.ngt',
          controller: 'HomeCtrl'
        })
        .state('companies', {
          url: '/companies',
          templateUrl: '_app/views/companies.ngt',
          controller: 'CompaniesCtrl'
        })
        .state('companies.industries', {
          url: '/industries',
          templateUrl: '_app/views/industries.ngt',
          controller: 'CompaniesCtrl'
        })
        .state('users', {
          url: '/users',
          templateUrl: '_app/views/users.ngt',
          controller: 'UsersCtrl'
        })
        .state('hosts', {
          url: '/hosts',
          templateUrl: '_app/views/hosts.ngt',
          controller: 'ServicesCtrl'
        })
        .state('gdp', {
          url: '/gdp',
          templateUrl: '_app/views/gdp.ngt',
          controller: 'GdpCtrl'
        });
        // .otherwise({
        //   redirectTo: '/'
        // });
    });
})();