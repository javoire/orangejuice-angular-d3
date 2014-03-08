'use strict';

angular.module('app')
  .controller('ServicesCtrl', function ($rootScope, $scope, $http) {
    $rootScope.pageTitle = 'Services';
    
    $http.get('/services.json').then(function(services) {
      $scope.services = services.data;
    });
});
