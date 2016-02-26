
mainApp.controller('ReportController', function ($scope, $location, PatientService, LocationService) {
    $scope.locationItem = null;
    $scope.locationItems = LocationService.getAvailableLocation();
    $scope.patientItem = {};
    $scope.patientItems = PatientService.getAllPatientItems();
    $scope.caseItem = null;
    $scope.caseItems = [{id: 'C001', name: 'C001'}, {id: 'C002', name: 'C002'}, {id: 'C003', name: 'C003'}];

    $scope.cancelReport = function () {
        $location.path("/search");
    };
});