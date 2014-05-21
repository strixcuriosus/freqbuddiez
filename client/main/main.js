(function (angular) {
  "use strict";
  angular.module('freqbuddiez.main', ['ngRoute', 'freqbuddiez.main.note'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main/main.tpl.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('MainController', function ($scope) {
    $scope.things = [];
    $scope.freqOut = function () {
      kickoff();
      $scope.synthctrls = keyboardKeys;
      $scope.drumctrls = ['x','c','v'];
    }
  });
}(angular));

var keyboardKeys = ['q', 'w', 'e', 'r', 't', 'y', 'a', 's', 'd', 'f', 'g', 'h'];
