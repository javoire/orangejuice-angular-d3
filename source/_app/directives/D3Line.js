'use strict';

angular.module('app.directives')
  .directive('d3Line', function ($window, $timeout, d3Service) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        label: '@',
        onClick: '&'
      },
      link: function(scope, ele, attrs) {
        d3Service.d3().then(function (d3) {
          var renderTimeout;
          var margin = parseInt(attrs.margin) || 0;

          var svg = d3.select(ele[0])
            .append('svg')
            .style('width', '100%')
            .style('height', '500px');
 
          $window.onresize = function() {
            scope.$apply();
          };
 
          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });
 
          scope.$watch('data', function(newData) {
            scope.render(newData);
          }, true);
 
          scope.render = function(data) {
            svg.selectAll('*').remove();
 
            if (!data) { return; }
            
            // move this to the service getting the data
            var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
            var getDateString = function(date) { 
              return date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0"+date.getDate()).slice(-2);
            }
            var prevDate = null;
            var i = -1;
            fData = [];
            data.forEach(function(d) {
              d.date = parseDate(d.created_at);
              if (prevDate != null && getDateString(d.date) == getDateString(prevDate)) { // count registrations on this day
                fData[i].count++;
              } else { // new day
                fData.push({
                  date: d.date,
                  dateString: getDateString(d.date),
                  count: 1
                })
                i++; // increase for every new day
              };
              prevDate = d.date;
            });
            console.log('data', fData);


            var width = svg.style('width').replace('px', '');
            var height = svg.style('height').replace('px', '');

            var x = d3.time.scale()
                .domain([fData[0].date, fData[fData.length-1].date])
                .range([0, width]);

            var y = d3.scale.linear()
                .domain([0, 40]) // hardcode for now
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left');

            var line = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.count); });

            // x.domain(d3.extent(fData, function(d) { return d.dateString; }));
            // y.domain(d3.extent(fData, function(d) { return d.count; }));

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
              .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Price ($)");

            svg.append("path")
                .datum(fData)
                .attr("class", "line")
                .attr("stroke-width", "20")
                .attr("d", line);
          };
        });
      }
    };
  });