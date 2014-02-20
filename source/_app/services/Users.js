'use strict';

angular.module('app')
  .factory('Users', function($q, $http) {
    var d = $q.defer();

    $http.get('/users.json').then(function(data) {
      console.log('factory loaded json data:', data);
      d.resolve(data.data);
    });

    return d.promise;
  });
