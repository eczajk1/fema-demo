'use strict';

/**
 * @ngdoc directive
 * @name femaDemoApp.directive:profile
 * @description
 * # profile
 */
angular.module('femaDemoApp')
  .directive('profile', function ($filter) {
    return {
      template: '<div class="profiles-container exhibit"><div class="profiles"></div></div>',
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function postLink(scope, element) {

        var svg;
        var profile;
        var g;

        scope.$watch('data', function (newValue) {

          d3.select(svg).remove();

          if (svg) {
            svg.remove();
          }
          if (profile) {
            profile.remove();
          }
          if (g) {
            g.remove();
          }

          if (!newValue) {
            return;
          }

          var parentWidth = element.parent().width();
          var margin = {top: 20, right: 80, bottom: 30, left: 50};
          var width = parentWidth - margin.left - margin.right;
          var height = 500 - margin.top - margin.bottom;

          var x = d3.scale.linear()
              .range([0, width]);

          var y = d3.scale.linear()
              .range([height, 0]);

          var color = d3.scale.category10();

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("right");

          var line = d3.svg.line()
              .interpolate("linear")
              .x(function(d) { return x(d.station); })
              .y(function(d) { return y(d.elevation); });

           svg = d3.select('.profiles-container').append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom);

            g = svg
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var first = _.first(scope.data);
            var xs_elevs = first && first.l_xs_elevs;

            if (xs_elevs) {
              var domain = first.l_xs_elevs.map(function (l) {
                return l.EVENT_TYP;
              });

              color.domain(domain);
            }
            else {
              color.domain('1 PERCENT CHANCE');
            }


            var sorted = $filter('orderBy')(scope.data, 'STREAM_STN');

            var profileLines = color.domain().map(function(name) {
              return {
                name: name,
                values: sorted.map(function(d) {
                  return {
                    station: d.STREAM_STN,
                    elevation: d.WSEL_REG
                  };
                })
              };
            });

            x.domain(d3.extent(scope.data, function (d) { return d.STREAM_STN;} ));
            y.domain([d3.min(scope.data, function (d) {
              return d.STRMBED_EL === -8888 || d.STRMBED_EL === -9999 ? d.WSEL_REG : d.STRMBED_EL;
            }), d3.max(scope.data, function (d) {
              return d.WSEL_REG;
            }) ]);

            svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

            svg.append("g")
              .attr("class", "y axis")
              .call(yAxis);
              // .append("text")
              // .attr("x", -height / 2)
              // .attr("y", 35)
              // .attr("transform", "rotate(-90)")
              // .attr("dy", ".71em")
              // .style("text-anchor", "middle")
              // .text("ELEVATION (ft)");

            profile  = svg.selectAll(".profiles")
              .data(profileLines)
              .enter().append("g")
              .attr("class", "profiles");

            profile.append("path")
              .attr("class", "line")
              .attr("d", function(d) {
                return line(d.values);
              });
              // .style("stroke", function (d) {
              //   return color(d.name);
              // });
          });
        }
      };
  });
