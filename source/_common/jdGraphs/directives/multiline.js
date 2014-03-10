'use strict';

angular.module('jdGraphs').directive('jdMultiline', function ($window, $http) {
    return {
      restrict: 'E',
      templateUrl: '_common/jdGraphs/templates/d3-line.ngt',
      scope: {
        source: '=',
      },
      link: function(scope, element, attrs) {
        var csv, xLabels, timeseriesLabels=[], w, h, x, y, svg, ctxFg, ctxBg, canvasFg, canvasBg, Ymax, Ymin;

        container = $('.chart');

        w = container.innerWidth();
        h = 400;
        m = 0;

        container.height(h);

        // jeeeeesus christ, neither d3 nor jQuery manages to add closing tag to canvas...
        canvasFg = $('<canvas><!-- //hack --></canvas>')
          .attr('width', w)
          .attr('height', h);

        canvasBg = $('<canvas><!-- //hack --></canvas>')
          .attr('width', w)
          .attr('height', h);

        container.append(canvasBg);
        container.append(canvasFg);

        // add SVG for axis and brushes
        svg = d3.select(container[0])
          .append('svg')
          .attr('height', h);

        ctxFg = canvasFg[0].getContext('2d');
        ctxFg.strokeStyle = 'rgba(255,110,0,0.2';

        ctxBg = canvasBg[0].getContext('2d');
        ctxBg.strokeStyle = 'rgba(100,100,100,0.1';

        scope.title = 'Lots of GDPs yo!';

        // selected lines
        var selected;
        // brush
        var brush = d3.svg.brush()
          .x(d3.scale.identity().domain([0, w]))
          .y(d3.scale.identity().domain([0, h]))
          // .on('brush', brushed)
          .on('brush', brushed);

        function brushed() {
          var extents = brush.extent();
          // find what timeseries have screen coordinates (x(), y()) within extents

          selected = []; // reset§§
          // loop over all of them and recalculate x and y for each. 
          timeseries.forEach(function(line, index) {
            // optimize this and cache screen cords in array instead of recalcing all the time
            x = getX(line);
            y = getY(line);

            var match = false;
            line.forEach(function(d, i) {

              if (!!match) return;

              if (
                  x(i) > extents[0][0] && x(i) < extents[1][0] && // x delta
                  y(d) > extents[0][1] && y(d) < extents[1][1] // y delta
                  )
              {
                selected.push(line)
                match = true;
              }
            });
          });

          // clear FG and draw selected ones...
          ctxFg.clearRect(0,0,w+1,h+1);
          selected.forEach(function(line) {
            x = getX(line);
            y = getY(line);
            renderCanvasGraph(ctxFg, line, x, y);
          })

          // if no selection, redraw all fg lines
          if (selected.length == 0) {
            timeseries.forEach(function(line) {
              x = getX(line);
              y = getY(line);
              renderCanvasGraph(ctxFg, line, x, y);
            })
          }
        }

        svg.append('g').append('g')
            .attr('class', 'brush')
            .call(brush);

        function getX(line) {
          return d3.scale.linear().domain([0, line.length-2]).range([m, w - m]);
        }

        function getY(line) {
          Ymax = d3.max(line, function(d) { return d; })
          Ymin = d3.min(line, function(d) { return d; })
          return d3.scale.linear().domain([Ymin, Ymax]).range([h - m, m]);
        }

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

          // TEMP MAKE THIS SMALLER FOR DEV PURPOSES
          // timeseries.splice(0, 245);

          // render canvas stuff!
          timeseries.forEach(function(line) {

            // set up domains etc
            x = getX(line);
            y = getY(line);

            renderCanvasGraph(ctxFg, line, x, y);
            renderCanvasGraph(ctxBg, line, x, y);
          });
        })

        function renderCanvasGraph(ctx, line, x, y) {
          ctx.beginPath();
          line.forEach(function(d, i){
            if (i == 0) {
              ctx.moveTo(x(i), y(d));
            } else {
              ctx.lineTo(x(i), y(d));
            }
          })
          ctx.stroke();
        }
      }
    }
  });