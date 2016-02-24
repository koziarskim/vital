mainApp.controller('CaseController', function ($scope, $location, $routeParams, $window, CaseService, NoteService, PatientService) {
    $scope.patientId = $routeParams.patientId;
    $scope.caseId = $routeParams.caseId;
    $scope.patientCase = CaseService.getPatientCase($scope.patientId, $scope.caseId);
    $scope.patient = PatientService.getPatient($scope.patientId);
    $scope.availableInsuranceTypes = ["BCBS", "Aetna", "MyInsurance"];
    $scope.case = CaseService.getPatientCase($scope.caseId);
    if(!$scope.case){
        $scope.case = {};
    }
    $scope.patient = {};
    if($scope.case.patient){
        $scope.patient = PatientService.getPatient($scope.case.patientId);
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
        $location.path("dashboard/");
    };

    //$scope.createTodayNote = function () {
    //    this.saveCase(true);
    //    $location.path("cases/" + $scope.caseId + "/notes/new");
    //}
});
