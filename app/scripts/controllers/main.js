'use strict';

/**
 * @ngdoc function
 * @name femaDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the femaDemoApp
 */
angular.module('femaDemoApp')
  .controller('MainCtrl', function ($location) {
    this.home = function () {
      $location.path('/');
    }
  });
