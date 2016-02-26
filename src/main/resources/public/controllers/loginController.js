mainApp.controller('LoginController', function ($scope, $window, $rootScope, $location, ProfileService) {
    $scope.login = {
        userName: null,
        password: null
    };
    $scope.loginAction = function () {
        $window.sessionStorage.clear()
        if ($scope.login.userName == null || $scope.login.password == null) {
            alert("Please enter username and password");
            return;
        }
        var authenticated = ProfileService.validateUser($scope.login.userName, $scope.login.password);

        if (authenticated) {
            $rootScope.profile = ProfileService.getProfile($scope.login.userName);
            $window.sessionStorage.userContext = JSON.stringify($rootScope.profile);
            $location.path("/search");
        } else {
            alert("Invalid username and/or password");
            $location.path("/login");
        }
    }
});