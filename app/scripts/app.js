'use strict';

/**
 * @ngdoc overview
 * @name femaDemoApp
 * @description
 * # femaDemoApp
 *
 * Main module of the application.
 */
angular
  .module('femaDemoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui-leaflet',
    'angular-loading-bar'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/DFIRM_ID/:dfirmId', {
        templateUrl: 'views/community.html',
        controller: 'CommunityCtrl',
        controllerAs: 'community'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
