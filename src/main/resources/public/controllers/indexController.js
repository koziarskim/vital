mainApp.controller('IndexController', function ($scope, $window, $rootScope, $location) {
    $scope.$on('$viewContentLoaded', function () {
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    if($window.sessionStorage.userContext) {
        $rootScope.profile = JSON.parse($window.sessionStorage.userContext)
    }
    $scope.goDashboard = function () {
        $location.path("/dashboard");
    }
    $scope.goReport = function () {
        $location.path("report");
    }
    $scope.goNewPatient = function () {
        $location.path("/patients/new");
    }
    $scope.logOut = function () {
        $window.sessionStorage.clear()
        $rootScope.profile = null;
        $location.path("/");
    }
    $scope.editProfile = function (uid) {
        $location.path("profiles/" + uid);
    }
});
