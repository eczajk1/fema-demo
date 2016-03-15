'use strict';

/**
 * @ngdoc service
 * @name femaDemoApp.firmData
 * @description
 * # firmData
 * Service in the femaDemoApp.
 */
angular.module('femaDemoApp')

  .service('firmData', function ($http, firmDataUrl) {

    return {

      getProfile: function (options) {
        var url = firmDataUrl + '/profile';

        var args = {
          method: 'get',
          url: url,
          params: options
        };

        return $http(args);
      },

      getXSs: function (options) {
        var url = firmDataUrl + '/xs';

        var args = {
          method: 'get',
          url: url,
          params: options
        };

        return $http(args);
      },

      listStreams: function (options) {
        var url = firmDataUrl + '/streams';

        var args = {
          method: 'get',
          url: url,
          params: options
        };

        return $http(args);
      },

      listStudies: function (options) {

        var url = firmDataUrl + '/studies';

        var args = {
          method: 'get',
          url: url,
          params: options
        };

        return $http(args);
      },

      makeGeometryCollection: function (rows) {
        var features = rows.reduce(function (features, r) {
          if (r.THE_GEOM) {
            var feature = {
              geometry: r.THE_GEOM
            };
            features.push(r.THE_GEOM);
          }
          return features;
        }, []);

        return {
          "type": "GeometryCollection",
          "geometries": features
        };
      }
    };
  });
