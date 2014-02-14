'use strict';

// NOTE: hmm, not good practice.. ? 
angular.module('app')
  .factory('Colors', function () {
    var mainBlue = '#5DA3DF';
    return {
      getMainBlue: function () {
        return mainBlue;
      }
    };
  });