'use strict';

/**
 * @ngdoc function
 * @name femaDemoApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the femaDemoApp
 */
angular.module('femaDemoApp')
  .controller('NavbarCtrl', function ($location) {
    this.home = function () {
      $location.path('/');
    }
  });
