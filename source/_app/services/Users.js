'use strict';

angular.module('app')
  .factory('Users', function($q, $http) {
    var d = $q.defer();

    $http.get('_data/users.json').then(function(users) { // user signup per day
      var data;

      data = users.data.map(function(d) { // index 1 needs to be integer and not string.. or just change input data lol
        return [d[0], parseInt(d[1])]
      })

      // TODO: insert rows days when signups are 0..... its misssiiiing

      d.resolve(data);
    });

    return d.promise;
  });
