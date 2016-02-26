mainApp.controller('CaseController', function ($scope, $location, $routeParams, $window, CaseService, NoteService, PatientService) {
    $scope.caseId = $routeParams.caseId;
    $scope.case = CaseService.getPatientCase($scope.caseId);
    $scope.patientId = $routeParams.patientId;
    if(!$scope.patientId && $scope.case && $scope.case.patient){
        $scope.patientId = $scope.case.patient.id
    }
    $scope.patientCase = CaseService.getPatientCase($scope.patientId, $scope.caseId);
    $scope.patient = PatientService.getPatient($scope.patientId);
    $scope.availableInsuranceTypes = ["BCBS", "Aetna", "MyInsurance"];

    if(!$scope.case){
        $scope.case = {};
    }
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
    $scope.saveCase = function (skipRedirect) {
        if (!$scope.patientCase) {
            $scope.patientCase = {};
        }
        $scope.patientCase.patientId = $scope.patientId;
        var patientId = PatientService.savePatient($scope.patient);
        $scope.case.patientId = patientId;
        CaseService.savePatientCase($scope.case);
        if(!skipRedirect) {
            $window.history.back();
        }
    };
    $scope.cancelCase = function () {
        $location.path("search/");
    };
});
