// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

scotchApp.config(function($routeProvider) {

    $routeProvider

    // route for the home page
        .when('/', {
        templateUrl: 'page/home.html',
        controller: 'mainController'
    })

    // route for the about page
    .when('/categories-webdesign', {
            templateUrl: 'page/categories-webdesign.html',
            controller: 'aboutController'
        })
        .when('/login', {
            templateUrl: 'page/login.html',
            controller: 'contactController'
        })
        // route for the contact page
        .when('/register', {
            templateUrl: 'page/register.html',
            controller: 'contactController'
        })

    .when('/videopost', {
        templateUrl: 'page/videopost.html',
        controller: 'contactController'
    });
});


scotchApp.controller('mainController', function($scope, $http) {
    // create a message to display in our view
    var root = "https://green-web-blog.herokuapp.com";

    $scope.message = 'Everyone come and see how good I look!';
    var apiGetCat = function() {
        $http.get(root + "/api/categories")
            .then(function(response) {
                //
                $scope.Categories = response.data;
            });

    };

    var apiGetArt = function() {
        $http.get(root + "/api/articles")
            .then(function(response) {
                //
                $scope.Articles = response.data;
            });

    };

    var init = function() {
        apiGetCat();
        apiGetArt();
    };

    init();

    console.log($scope.Categories)


    $scope.login = function() {
        console.log($scope.user);

        //POST Login API below:
        $http.post(root + '/api/users/auth', $scope.user)
            .success(function(response) {
                var isSuccess = response.success;
                if (isSuccess) {
                    console.log(response);
                } else {
                    //Raise Error
                    alert(response.message);
                }
            })
            .error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });
    };

});