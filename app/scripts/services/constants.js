'use strict';

/**
 * @ngdoc service
 * @name femaDemoApp.constants
 * @description
 * # constants
 * Service in the femaDemoApp.
 */
angular.module('femaDemoApp')

  .constant('firmDataUrl', '//localhost:5050/firm-data')

  .constant('towson', {
    lat: 39.4,
    lng: -76.6,
    zoom: 10
  });
