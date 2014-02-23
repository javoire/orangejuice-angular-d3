'use strict';

angular.module('Rickshaw', ['d3'])
  .factory('RickshawService', function($document, $window, $q, $rootScope) {
    console.log('RicskawService');
    var d = $q.defer(),
        RickshawService = {
          Rickshaw: function() { return d.promise; }
        };
    function onScriptLoad() {
      // Load client in the browser
      $rootScope.$apply(function() { d.resolve($window.Rickshaw); });
    }
    var scriptTag = $document[0].createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.async = true;
    scriptTag.src = 'https://raw.github.com/shutterstock/rickshaw/master/rickshaw.js';
    scriptTag.onreadystatechange = function () {
      if (this.readyState === 'complete') { onScriptLoad(); }
    };
    scriptTag.onload = onScriptLoad;
   
    var s = $document[0].getElementsByTagName('body')[0];
    s.appendChild(scriptTag);

    return RickshawService;
  });