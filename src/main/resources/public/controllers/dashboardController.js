mainApp.controller('DashboardController', function ($scope, $window, $location, PatientService, NoteService) {
    $scope.goNewPatient = function () {
        $location.path("/cases/new/patient/new");
    }
    $scope.goReport = function () {
        $location.path("report");
    }
    $scope.logOut = function () {
        $window.sessionStorage.clear()
        $rootScope.profile = null;
        $location.path("/");
    }
    $scope.goProfile = function () {
        $location.path("profiles/" + $rootScope.profile.id);
    }
});