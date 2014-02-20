'use strict';

angular.module('app')
  .controller('MainCtrl', function ($scope, $q, Companies) {
    Companies.then(function (data) {
      console.log('MainCtrl got the json from factory', data);
      $scope.companies = data;
    });

    $scope.toggleMenu = function() {
      // add class .menu-closed to .menu
      // add a class .menu-closed to .main
      console.log('toggleMenu');
    }
  });