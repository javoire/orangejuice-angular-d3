'use strict';

angular.module('app')
  .controller('ServicesCtrl', function ($rootScope, $scope, $http) {
    $rootScope.pageTitle = 'Services';
     $http.get('/users.json').then(function(services) {
      var data;

      data = services.data.map(function(d) { // index 1 needs to be integer and not string.. or just change input data lol
        return [d[0], parseInt(d[1])]
      })

      // TODO: insert rows days when signups are 0..... its misssiiiing
      $scope.services = data;
    });
});
