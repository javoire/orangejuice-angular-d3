'use strict';

angular.module('app')
  .controller('UsersCtrl', function ($rootScope, $scope, $q, Users) {
    // currently only possible to have one directive in the view for this ctrl lol
    $rootScope.pageTitle = 'Users'; // hmmm.....

    Users.then(function (data) {
      console.log('UsersCtrl got the json from Users service', data);
      $scope.title = "User signup";
      $scope.users = data;
    });
  });
