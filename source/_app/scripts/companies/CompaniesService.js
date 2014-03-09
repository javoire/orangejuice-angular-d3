'use strict';

angular.module('app')
  .factory('Companies', function($q, $http) {
    var d = $q.defer();

    $http.get('/companies.json').then(function(data) {
      d.resolve(data.data);
    });

    return d.promise;
  });
