'use strict';

angular.module('app')
  .controller('HomeCtrl', function ($rootScope, $scope, $q, Companies) {
    $rootScope.pageTitle = 'Summary'; // hmmm.....

    Companies.then(function (data) {
      $scope.companies = data;
    });
  });