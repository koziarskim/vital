mainApp.controller('DashboardController', function ($scope, $window, $location, PatientService, NoteService) {
    $scope.goSearch = function () {
        $location.path("search");
    }
    $scope.goNewPatient = function () {
        $location.path("/cases/new/patient/new");
    }
});