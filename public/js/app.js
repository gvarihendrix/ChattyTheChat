'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/login', {templateUrl: '/login', controller: AppCtrl});
    $routeProvider.when('/index', {templateUrl: '/index', controller: AppCtrl});
    $routeProvider.otherwise({redirectTo: '/login'});
    $locationProvider.html5Mode(true);
  }]);