console.log($)
    // create the module and name it scotchApp
var scotchApp = angular.module(

    'scotchApp', ['ngRoute', 'ngTagsInput', 'textAngular', 'ui.bootstrap', 'ngSanitize']

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
        .when('/search/:_term', {
            templateUrl: 'page/search.html',
            controller: 'contactController'
        })
        .when('/textpost/:id', {
            templateUrl: 'page/textpost.html',
            controller: 'mainController'
        });
});

scotchApp.controller('mainController', function($scope, $http, $routeParams, $location, $sanitize) {
    // create a message to display in our view
    var root = "https://green-web-blog.herokuapp.com";
    var maxRandomArticleNumber = 2;
    var maxPopularArticlesNumber = 10;
    var maxPopularArticlesNumberOne = 1;

    var idCat1 = "5983510622fd58000478aaa8";
    var idCat2 = "5981d787b38ced0004f0c5db";
    var idCat3 = "5981d805b38ced0004f0c5dd";
    var myId = "5981d84fb38ced0004f0c5df";

    /* CATEGORIES ID POST */
    $scope.getCategoryNameOfArticle = function(id) {
        if (undefined != $scope.categories) {
            for (i = 0; i < $scope.categories.length; i++) {
                var cat = $scope.categories[i];
                if (cat._id == id) {
                    return cat.name;
                }
            }
        };
    }

    $scope.myComments = "";
    $scope.newComment = {
        '_user': {
            '_id': '5981d84fb38ced0004f0c5df'

        },
        'commentContent': 'Hello everybody',
        'createdDate': {

            'default': Date.now()
        },
        'updatedDate': {

            'default': Date.now()
        },
    };
    console.log($scope.newComment)

    //Begin get articles by id
    var getArticlesById = function(id, maximumArticle) {
        if (maximumArticle === undefined) {
            if ($scope.articles === undefined) {
                maximumArticle = 0;
            } else {
                maximumArticle = $scope.articles.length;
            }
        }
        var articles = [];
        angular.forEach($scope.articles, function(value, key) {
            if (value._category._id === id && articles.length < maximumArticle) {
                articles.push(value);
            }
        });
        return articles;

    };

    //Begin Sort Array
    var compareValues = function(key, order = 'asc') {
        return function(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order == 'desc') ? (comparison * -1) : comparison
            );
        };
    }




    $scope.newArticle = [];
    // create a message to display in our view
    var root = "https://green-web-blog.herokuapp.com";

    $scope.message = 'Everyone come and see how good I look!';
    $scope.apiGetCat = function() {
        $http.get(root + "/api/categories")
            .then(function(response) {

                $scope.Categories = response.data;
            });

    };

    $scope.apiGetArt = function() {
        $http.get(root + "/api/articles")
            .then(function(response) {

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
    $scope.submitCreateArticle = function() {
        console.log($scope.newArticle);
        $scope.newArticle._author = "5981d6d5b38ced0004f0c5d9";
        $http.post(root + '/api/articles/', $scope.newArticle)
            .then(function successCallbak(response) {
                alert("Thành công");
                // window.location.href = 'admin.html';
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    };

    $scope.submitCreateCategory = function() {

        if ($scope.newCategory.name.length > 0 &&
            $scope.newCategory.description.length > 0) {
            $http.post(root + "/api/categories", $scope.newCategory)
                .success(function(response) {
                    $scope.categories.push(response);
                    $scope.newCategory.name = "";
                    $scope.newCategory.description = "";

                }).error(function(data, status, headers, config) {
                    console.log(data, status, headers, config);
                });
        } else {
            alert("Input invalid");
        };

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
    /* load lai trang khi f5 */
    /* $scope.getArticle = function() {
         $scope.currentArticleId = $routeParams.id;
     } */


    //Search Aritcle
    $scope.getArticleBySearchKey = function() {
            $scope.keyWord = $routeParams._term;
            $http.get(root + '/api/articles/search/' + $scope.keyWord)
                .then(function successCallbak(response) {
                    $scope.articleGetByKey = response.data;
                }, function errorCallback(response) {
                    console.log(data, status, headers, config);
                });
        }
        //Scope watch
    $scope.$watchCollection("Articles", function(newArticles, oldArticles) {

        if ($scope.articles != undefined && $scope.articles.length > 0) {
            //Update current Article object
            if ($scope.currentArticleId != undefined) {
                angular.forEach(newArticles, function(value, key) {
                    if (value._id === $scope.currentArticleId) {
                        $scope.article = value;
                        return false;
                    }
                });
            };
        }

        if (newArticles != undefined) {
            //Begin Find current article
            angular.forEach(newArticles, function(value, key) {
                if (value._id === $scope.currentArticleID) {

                    $scope.article = value;
                    return false;
                }
            });
            //Begin Find Article in Category

            //Const
            $scope.articlesInCat1 = getArticlesById(idCat1, 3);
            $scope.articlesInCat2 = getArticlesById(idCat2, 3);
            $scope.articlesInCat3 = getArticlesById(idCat3, 3);
            //Dynamic
            // $scope.getAllArticleinCategories();

            //Begin Pagination
            $scope.viewby = 4;
            $scope.totalItems = newArticles.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 5;

            $scope.setPage = function(pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function() {
                console.log('Page changed to: ' + $scope.currentPage);
            };

            $scope.setItemsPerPage = function(num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1;
            }


            //Update Popular Articles
            $scope.allArticles = newArticles;
            $scope.popularArticles = newArticles.slice(0, maxPopularArticlesNumber);
            $scope.popularArticlesOne = newArticles.slice(0, maxPopularArticlesNumberOne);
            //Update New Articles
            var arrayallNewArticles = newArticles.slice();
            $scope.allNewArticles = arrayallNewArticles.sort(compareValues('createdDate', 'desc'));

            //Update random articles
            $scope.randomArticles = [];
            var listArticles = newArticles.slice();
            for (var i = 0; i < maxRandomArticleNumber; i++) {
                if (listArticles.length > 0) {
                    var random = Math.floor(Math.random() * listArticles.length);
                    $scope.randomArticles.push(listArticles[random]);
                    listArticles.splice(random, 1);
                };
            };

        }
    });


});