var myApp = angular.module('hello', ['ngRoute']).config(function ($routeProvider, $httpProvider) {

    $routeProvider.when('/', {
        templateUrl: 'home.html',
        controller: 'home'
    }).when('/login', {
        templateUrl: 'login.html',
        controller: 'navigation'
    }).otherwise('/');

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

});

myApp.controller('navigation', function ($rootScope, $scope, $http, $location, $route) {

    $scope.tab = function (route) {
        return $route.current && route === $route.current.controller;
    };

    var authenticate = function () {
        $http.get('/api/users/session/user', {})
            .success(function (data) {
                if (data.name) {
                    console.log("Login succeeded")
                    $location.path("/");
                    $scope.error = false;
                    $rootScope.authenticated = true;
                } else {
                    console.log("Login failed")
                    $location.path("/login");
                    $scope.error = true;
                    $rootScope.authenticated = false;
                }
            })
            .error(function () {
                console.log("Login failed")
                $location.path("/login");
                $scope.error = true;
                $rootScope.authenticated = false;
            });

    }

    authenticate("{}");

    $scope.credentials = {};
    $scope.login = function () {
        $http.defaults.headers.common.Authorization = "Basic " + btoa($scope.credentials.username + ":" + $scope.credentials.password);

        //var authHeader = {
        //    authorization: "Basic " + btoa($scope.credentials.username + ":" + $scope.credentials.password)
        //};
        //var headers = {headers: authHeader}
        authenticate();
    };

    $scope.logout = function () {
        $http.post('/logout', {}).success(function () {
            $rootScope.authenticated = false;
            $location.path("/");
        }).error(function (data) {
            console.log("Logout failed")
            $rootScope.authenticated = false;
        });
    }

});

myApp.controller('home', function ($scope, $http) {
    $http.get('/api/notes/hello/').success(function (data) {
        $scope.greeting = data;
    })
});