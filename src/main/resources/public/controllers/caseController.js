mainApp.controller('CaseController', function ($scope, $rootScope, $location, $routeParams, $window, CaseService, NoteService, PatientService) {
    $scope.caseId = $routeParams.caseId;
    $scope.patientId = $routeParams.patientId;
    $scope.patientCase = CaseService.getPatientCase($scope.caseId);
    if(!$scope.patientCase){
        $scope.patientCase = {};
        $scope.patientCase.discipline=$rootScope.profile.discipline;
    }
    $scope.isNew = $scope.patientId=="new";
    if(!$scope.patientId && $scope.patientCase && $scope.patientCase.patient){
        $scope.patientId = $scope.patientCase.patient.id
    }

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
    $scope.saveCase = function (skipRedirect) {
        var patientId = PatientService.savePatient($scope.patient);
        if(!$scope.patientCase.patientId) {
            $scope.patientCase.patientId = patientId;
        }
        CaseService.savePatientCase($scope.patientCase);
        $window.sessionStorage.selectedPatientId = JSON.stringify(patientId);
        if(!skipRedirect) {
            $location.path("/search");
        }
    };
    $scope.cancelCase = function () {
        $location.path("search/");
    };

    $scope.createNote = function () {
        $scope.saveCase(true);
        $location.path("cases/" + $scope.patientCase.id + "/notes/new");
    }

    $scope.addDx = function(dxName){
        if(!$scope.patientCase.dxs){
            $scope.patientCase.dxs = [];
        }
        var dx = {};
        dx.name = dxName;
        dx.id = "DX00"+(+$scope.patientCase.dxs.length+1)

        $scope.patientCase.dxs.push(dx);
    }

    $scope.deleteDx = function(dxId){
        $scope.patientCase.dxs.forEach(function(dx, index){
            if(dx.id == dxId){
                $scope.patientCase.dxs.splice(index, 1);
            }
        })
    }
});
