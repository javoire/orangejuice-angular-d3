'use strict';

angular.module('app')
  .factory('Users', function($q, $http) {
    var d = $q.defer();

    $http.get('/users.json').then(function(inputData) {
      console.log('factory loaded json inputData:', inputData);
      function parseDate(input) {
        var parts = input.split('-');
        parts[2] = parts[2].split(' ')[0]
        // return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
        return parts.join("-")
      }

      // reformat the data for rickshaw... 
      var data = [],
          i = -1,
          prevDate = null;
      inputData.data.forEach(function(d) {
        if (prevDate != null && parseDate(d.created_at) == parseDate(prevDate)) { // count registrations on this day
          data[i].y++;
        } else { // new day
          data.push({
            x: i+1,
            // x: parseDate(d.created_at),
            y: 1
          })
          i++; // increase for every new day
        };
        prevDate = d.created_at;
      });

      d.resolve(data);
    });

    return d.promise;
  });
