'use strict';

angular.module('app')
  .controller('ServicesCtrl', function ($rootScope, $scope, $http) {
    $rootScope.pageTitle = 'Hosts';
    
    $http.get('/services.json').then(function(response) {
      $scope.services = {
        title: response.data.name,
        data: response.data
      }
    });

    $http.get('/pods.json').then(function(response) {
      $scope.pods = {
        title: response.data.name,
        data: response.data
      }
    });

    $http.get('/sites.json').then(function(response) {
      $scope.sites = {
        title: response.data.name,
        data: response.data
      }
    });
});
