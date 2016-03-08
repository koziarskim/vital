mainApp.controller('IndexController', function ($scope, $window, $rootScope, $location) {
    $scope.$on('$viewContentLoaded', function () {
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    if($window.sessionStorage.userContext) {
        $rootScope.profile = JSON.parse($window.sessionStorage.userContext)
    }
    $scope.goSearch = function () {
        $location.path("/search");
    }
    $scope.goReport = function () {
        $location.path("/report");
    }
    $scope.logOut = function () {
        $window.sessionStorage.clear()
        $rootScope.profile = null;
        $location.path("/");
    }
    $scope.goProfile = function () {
        $location.path("/profiles/" + $rootScope.profile.uid);
    }
});
