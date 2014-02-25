'use strict';

angular.module('app')
  .controller('UsersCtrl', function ($rootScope, $scope, $q, Users) {
    $rootScope.pageTitle = 'Users'; // hmmm.....

    Users.then(function (data) {
      console.log('UsersCtrl got the json from Users service', data);
      $scope.users = {
        title : "User signup",
        data: data
      };
    });
  });
