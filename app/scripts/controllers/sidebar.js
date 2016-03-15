'use strict';

/**
 * @ngdoc function
 * @name femaDemoApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the femaDemoApp
 */
angular.module('femaDemoApp')
  .controller('SidebarCtrl', function ($location, firmData) {

    var vm = this;

    firmData.listStudies().then(function (result) {
      vm.study_info = window._.groupBy(result.data, 'STATE_NM');
    });

    this.state = function (communities) {
      vm.communities = communities;
    };

    this.community = function (community) {
      $location.path('/DFIRM_ID/' + community.DFIRM_ID);
    }
  });
