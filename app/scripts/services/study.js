'use strict';

/**
 * @ngdoc service
 * @name femaDemoApp.study
 * @description
 * # study
 * Factory in the femaDemoApp.
 */
angular.module('femaDemoApp')
  .factory('Study', function () {
    // Service logic
    // ...

    function Study (args) {
      var study = this;
      Object.keys(args).forEach(function (p) {
        study[p] = args[p];
      });
    }

    Study.prototype.title = function () {
      var s = this;
      return ['STUDY_PRE', 'STUDY_NM', 'STATE_NM', 'JURIS_TYP'].reduce(function (title, prop) {
        if (s[prop]) {
          title += ' ' + s[prop];
        }
        return title;
      }, '');
    };


    return Study;
  });
