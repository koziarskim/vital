mainApp.controller('CaseController', function ($scope, $location, $routeParams, CaseService, NoteService, PatientService) {
    $scope.patientId = $routeParams.patientId;
    $scope.caseId = $routeParams.caseId;
    $scope.patientCase = CaseService.getPatientCase($scope.patientId, $scope.caseId);
    $scope.patient = PatientService.getPatient($scope.patientId);
    $scope.availableInsuranceTypes = ["BCBS", "Aetna", "MyInsurance"];

    $scope.dateRange = {
        from: null,
        to: null
    }
    $scope.filterDate = function (note) {
        if ((note.date > $scope.dateRange.from || $scope.dateRange.from == null) && (note.date < $scope.dateRange.to || $scope.dateRange.to == null)) {
            return true;
        } else {
            return false;
        }
    };
    $scope.saveCase = function () {
        if (!$scope.patientCase) {
            $scope.patientCase = {};
        }
        $scope.patientCase.patientId = $scope.patientId;
        PatientService.savePatientCase($scope.patientCase);
        $location.path("patients/" + $scope.patientId);
    };
    $scope.cancelCase = function () {
        $location.path("dashboard/");
    };

    $scope.createTodayNote = function () {
        $location.path("cases/" + $scope.caseId + "/notes/new");
    }
});
