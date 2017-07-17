// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/testindex2', {
        templateUrl: '/page/testindex2.html',
        controller: 'mainController'
    })
});