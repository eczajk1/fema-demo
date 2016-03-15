'use strict';

/**
 * @ngdoc function
 * @name femaDemoApp.controller:CommunityCtrl
 * @description
 * # CommunityCtrl
 * Controller of the femaDemoApp
 */
angular.module('femaDemoApp')
  .controller('CommunityCtrl', function ($routeParams, $scope, $timeout, firmData, Study, towson) {

    var vm = angular.extend(this, $routeParams);

    var options = {
      DFIRM_ID: $routeParams.dfirmId
    };

    $scope.data = {};

    firmData.listStudies(options).then(function (result) {
      var study = result.data && result.data.length === 1 ? result.data[0] : undefined;
      vm.study = new Study(study);
    }, function (reason) {
      console.log(reason);
    });

    this.streams = function () {
      $scope.dataset = 'streams';
    };

    $scope.$watch(function () {
      return vm.exhibit;
    }, function (newValue) {
      switch (newValue) {
        case 'map': vm.mapShown = true; break;
        default: vm.mapShown = false;
      }
    });

    $scope.$watch('dataset', function (newValue) {
      if (newValue === 'streams') {
        firmData.listStreams(options).then(function (result) {
          var profilBaslns = result.data;
          vm.streams = _.groupBy(profilBaslns, function (p) {
            var composite = [p.WTR_NM];
            if (p.SEGMT_NAME) {
              composite.push(p.SEGMT_NAME);
            }
            return composite.join(',');
          });
        });
      }
    });

    $scope.$watchCollection(function () {
      return vm.selected;
    }, function (newValue) {

      if (!newValue) {
        return;
      }

      var first = _.first(newValue);
      var xsOptions = angular.copy(options);
      xsOptions.WTR_NM = first.WTR_NM;

      firmData.getXSs(xsOptions).then(function (result) {
        var xs = result.data;

        var geojson = firmData.makeGeometryCollection(xs);

        var styled = {
          data: geojson,
          style: {
            weight: 3,
            opacity: 1,
            color: 'blue'
          }
        };

        vm.geojson = styled;

        var bounds = turf.extent(geojson);
        vm.bounds = {
          northEast: {
            lat: bounds[3],
            lng: bounds[2]
          },
          southWest: {
            lat: bounds[1],
            lng: bounds[0]
          }
        };
      });

      firmData.getProfile(xsOptions).then(function (result) {
        vm.profile = result.data;
      });
    });

    angular.extend($scope, {
      center: towson
    });

    this.keys = function (obj) {
      return obj? Object.keys(obj).sort() : [];
    };
  });
