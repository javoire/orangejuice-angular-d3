'use strict';

angular.module('app')
  .factory('Users', function($q, $http) {
    var d = $q.defer();

    $http.get('/users.json').then(function(users) { // user signup per day
      var data;

      data = users.data.map(function(d) { // index 1 needs to be integer and not string.. or just change input data lol
        return [d[0], parseInt(d[1])]
      })

      var prevDayInt=null, currDay, currMonth, newRecord, currYear, newMonth, monthLength;

      // insert a missing day as long as current day - next day != 1
      function insertMissingDays(index) {
        if (data[index-1] == undefined) {
          return;
        }

        currDay = data[index][0].split('-')[2];
        currMonth = data[index][0].split('-')[1];
        currYear = data[index][0].split('-')[0];

        currDayInt = parseInt(currDay);
        currMonthInt = parseInt(currMonth);
        currYearInt = parseInt(currYear);

        nextDay = data[index-1][0].split('-')[2];
        nextMonth = data[index-1][0].split('-')[1];
        nextYear = data[index-1][0].split('-')[0];

        nextDayInt = parseInt(nextDay);
        nextMonthInt = parseInt(nextMonth);
        nextYearInt = parseInt(nextYear);

        console.log(index, currDayInt, nextDayInt);

        if (currMonth != nextMonth || (currDayInt - nextDayInt != 1 && currDayInt > 1)) {

          monthLength = (nextMonthInt % 2 == 0) ? 30 : 31; // this is wrong lol
          newMonth = nextMonth;
          if (nextDayInt+1 > 31) {
            nextDayInt = 0;
            newMonth = currMonth;
          }

          newDay = (nextDayInt+1).toString().length == 1 ? '0' + (nextDayInt+1) : (nextDayInt+1);
          newRecord = [currYear+'-'+newMonth+'-'+newDay, 0];
          data.splice(index, 0, newRecord);

          console.log('inserting missing day... !', newRecord);

          insertMissingDays(index+1);
        }

      }

      for (var i = data.length; i--;) {
        insertMissingDays(i);
      }

      d.resolve(data);
    });

    return d.promise;
  });