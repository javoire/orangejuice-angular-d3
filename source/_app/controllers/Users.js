'use strict';

angular.module('app')
  .controller('UsersCtrl', function ($scope, $q, Users) {
    Users.then(function (data) {
      console.log('UsersCtrl got the json from Users factory', data);
      $scope.users = data;
    });
  });
