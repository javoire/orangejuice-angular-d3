'use strict';

angular.module('jdGraphs').directive('multiLine', function ($window, $http) {
    return {
      restrict: 'E',
      templateUrl: '_common/jdGraphs/templates/d3-line.ngt',
      scope: {
        source: '=',
      },
      link: function(scope, element, attrs) {
        var csv, xLabels, timeseriesLabels=[], w, h, x, y, ctx, canvas, Ymax, Ymin;

        container = $('.chart');

        w = container.outerWidth();
        h = 400;
        m = 5;

        // jeeeeesus christ, neither d3 nor jQuery manages to add closing tag to canvas...
        canvas = $('<canvas><!-- //hack --></canvas>')
          .attr('width', w)
          .attr('height', h);

        container.append(canvas);

        ctx = canvas[0].getContext('2d');
        ctx.strokeStyle = '#FF6E00';

        scope.title = 'Lots of GDPs yo!';

        // temp, quick version, move to ctrl later
        $http.get('/gdp.csv').then(function(row) {

          // crazy formatting of the csv so we can use it as timeseries
          timeseries = row.data.split('\n'); // split rows
          timeseries.splice(0, 2); // cut stuff
          for (var i = timeseries.length - 1; i >= 0; i--) {
            timeseries[i] = timeseries[i].split('","'); // split cols
            timeseriesLabels.push(timeseries[i][0]);
            timeseries[i].splice(0, 4); // not needed

            // intifyyyyy
            timeseries[i] = timeseries[i].map(function(d) {
              d = d.replace('"', '');
              return parseInt(d);
            });
          }
          xLabels = timeseries.splice(0, 1)[0]; // cut more stuff
          timeseriesLabels.splice(0, 1) // we don't need this oooneeee

          // render canvas stuff!
          timeseries.map(function(line) {

            // set up domains etc
            Ymax = d3.max(line, function(d) { ;return d; })
            Ymin = d3.min(line, function(d) { ;return d; })
            x = d3.scale.linear().domain([0, line.length-2]).range([m, w - m]);
            y = d3.scale.linear().domain([Ymin, Ymax]).range([h - m, m]);

            ctx.beginPath();
            line.map(function(d, i){
              if (i == 0) {
                ctx.moveTo(x(i), y(d));
              } else { 
                ctx.lineTo(x(i), y(d));
              }
            })
            ctx.stroke();
          });
        })
      }
    }
  });