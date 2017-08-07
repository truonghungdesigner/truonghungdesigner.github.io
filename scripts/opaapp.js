console.log($)
    // create the module and name it scotchApp
var scotchApp = angular.module(

    'scotchApp', ['ngRoute']

);

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

    .when('/textpost/:id', {
        templateUrl: 'page/textpost.html',
        controller: 'mainController'
    });
});

scotchApp.controller('mainController', function($scope, $http, $routeParams) {
    $scope.newArticle = [];
    // create a message to display in our view
    var root = "https://green-web-blog.herokuapp.com";

    $scope.message = 'Everyone come and see how good I look!';
    $scope.apiGetCat = function() {
        $http.get(root + "/api/categories")
            .then(function(response) {
                //
                $scope.Categories = response.data;
            });

    };

    $scope.apiGetArt = function() {
        $http.get(root + "/api/articles")
            .then(function(response) {
                //
                $scope.Articles = response.data;
            });

    };
    $scope.addArticle = function() {
        console.log($scope.newArticle);
        $http({
            method: 'POST',
            url: root + "/api/articles",
            data: $scope.newArticle
        }).then(function successCallback(response) {
            alert('Thành Công')

        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.submitCreateArticle = function() {

        $scope.newArticle._author = "5978a69ade96e7000418148d";
        console.log($scope.newArticle);
        $http.post(root + '/api/articles/', $scope.newArticle)
            .success(function(response) {
                alert("Thành công")
            }).error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });;
    };



    $scope.getArticle = function() {
        var id = $routeParams.id;
        angular.forEach($scope.Articles, function(value, key) {
            if (value._id === id) {
                $scope.article = value;
                console.log($scope.article);
                return false;
            }
        });
    };

    /* ADD NEW CATEGORIES */
    $scope.getCategoryNameOfArticle = function(id) {

        if (undefined != $scope.Categories) {
            for (i = 0; i < $scope.Categories.length; i++) {
                var cat = $scope.Categories[i];
                if (cat._id == id) {
                    return cat.name;
                };
            };
        };

    };

    $scope.submitCreateCategory = function() {

        if ($scope.newCategory.name.length > 0 &&
            $scope.newCategory.description.length > 0) {
            $http({
                method: 'POST',
                url: root + "/api/categories",
                data: $scope.newCategory
            }).then(function successCallback(response) {
                $scope.Categories.push(response.date);

                $scope.newCategory.name = "";
                $scope.newCategory.description = "";

            }, function errorCallback(response) {
                console.log(response);
            });


        } else {
            alert("Input invalid");
        };

    };
    $scope.submitCreateArticle = function() {
        console.log($scope.newArticle);
        $scope.newArticle._author = "5981d6d5b38ced0004f0c5d9";
        $http.post(root + '/api/articles/', $scope.newArticle)
            .success(function(response) {
                alert("Thành công")
            }).error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });;
    };
    /* END OF ADD NEW CATEGORIES */

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