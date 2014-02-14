'use strict';

angular.module('app')
  .controller('MainCtrl', function($scope, $q, Companies) {
    Companies.then(function(data) {
      console.log('MainCtrl got the json from factory', data);
      $scope.companies = data;
    });
  });
