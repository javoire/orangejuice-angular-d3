'use strict';

angular.module('app')
  .controller('HomeCtrl', function ($rootScope, $scope, $q, Companies) {
    $rootScope.pageTitle = 'Summary'; // hmmm.....

    Companies.then(function (data) {
      console.log('HomeCtrl got the json from factory', data);
      $scope.companies = data;
    });
  });