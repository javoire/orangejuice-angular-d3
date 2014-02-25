'use strict';

angular.module('app')
  .factory('Users', function($q, $http) {
    var d = $q.defer();

    $http.get('/users.json').then(function(inputData) {
      var data, i, prevDate;

      console.log('factory loaded json inputData:', inputData);
      function parseDate(input) {
        var parts = input.split('-');
        parts[2] = parts[2].split(' ')[0] // throw away the time part...
        // return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
        return parts.join("-")
      }

      // reformat data, count signups per day
      data = [];
      i = -1;
      prevDate = null;

      // flawed, ignores days with 0 signups...
      inputData.data.forEach(function(d) {
        if (prevDate != null && parseDate(d.created_at) == parseDate(prevDate)) { // count registrations on this day
          data[i].y++;
          data[i].count++;
        } else { // next day
          data.push({
            x: i+1, // tmp for rickshaw...
            y: 1, // tmp for rickshaw...
            count: 1,
            dateString: parseDate(d.created_at),
            date: d.created_at,
          })
          i++; // next day
        };
        prevDate = d.created_at;
      });

      d.resolve(data);
    });

    return d.promise;
  });
