mainApp.controller('SearchController', function ($scope, $rootScope, $window, $location, CaseService, PatientService, NoteService) {
    $scope.allPatients = PatientService.getAllPatients()
    $scope.myCases = null;
    $scope.selectedPatientId = null;
    $scope.includeDischarged = false;
    if($window.sessionStorage.includeDischarged){
        $scope.includeDischarged = JSON.parse($window.sessionStorage.includeDischarged);
    }

    $scope.$watch("includeDischarged", function(newValue, oldValue) {
        $window.sessionStorage.includeDischarged = JSON.stringify($scope.includeDischarged);
    });

    if ($window.sessionStorage.selectedPatientId) {
        $scope.selectedPatientId = JSON.parse($window.sessionStorage.selectedPatientId);
        $scope.myCases = CaseService.getAllPatientCases($scope.selectedPatientId);
    }
    $scope.filterPatientNameInput = null;
    $scope.patientCount = 0;
    $scope.patientSelectedAction = function (patient) {
        $scope.selectedPatientId = patient.id;
        $scope.myCases = CaseService.getAllPatientCases(patient.id);
        $window.sessionStorage.selectedPatientId = JSON.stringify(patient.id);
        $scope.filterPatientNameInput = null;
    }

    $scope.filterOnPatient = function (patient) {
        if ($scope.filterPatientNameInput) {
            var patientName = patient.firstName + patient.lastName;
            return patientName.toLowerCase().indexOf($scope.filterPatientNameInput.toLowerCase()) >= 0
        } else {
            return false;
        }
    };

    $scope.filterOnCases = function (patientCase) {
        if($scope.includeDischarged){
            return true;
        }else{
            return !patientCase.discharged;
        }
    };

    $scope.savePatient = function (patient) {
        var savedPatient = PatientService.savePatient(patient);
        $location.path("/patients/" + savedPatient.id);
    };

    $scope.editCase = function (caseId) {
        $location.path("/cases/"+caseId);
    }
    $scope.deletePatient = function (patientId) {
        PatientService.deletePatient(patientId);
    }

    $scope.createTodayNote = function (caseId) {
        $location.path("cases/" + caseId + "/notes/new");
    }
    $scope.dischargeCase = function (caseId) {
        CaseService.dischargeCase(caseId);
        $scope.myCases = CaseService.getAllPatientCases($scope.selectedPatientId);
    }
    $scope.deleteCase = function (caseId) {
        var notes = NoteService.getNotesForCase(caseId);
        if(notes && notes.length>0){
            alert("Case case existing notes, please delete all notes before deleting case");
            return;
        }
        CaseService.deleteCase(caseId);
        $scope.myCases = CaseService.getAllPatientCases($scope.selectedPatientId);

    }
    $scope.viewAllNotes = function (caseId) {
        $location.path("cases/" + caseId + "/notes");
    }

    $scope.addNewCase = function (patientId) {
        $location.path("/cases/new/patient/"+$scope.selectedPatientId);
    }
});
