mainApp.controller('SearchController', function ($scope, $rootScope, $window, $location, CaseService, PatientService, NoteService) {
    $scope.allPatients = PatientService.getAllPatients()
    $scope.myCases = null;
    $scope.selectedPatientId = null;
    if ($window.sessionStorage.selectedPatientId) {
        $scope.selectedPatientId = JSON.parse($window.sessionStorage.selectedPatientId);
        $scope.myCases = CaseService.getAllPatientCases($scope.selectedPatientId);
    }
    $scope.filterPatientNameInput = null;

    $scope.goNewPatient = function () {
        $location.path("/cases/new/patient/new");
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
        $location.path("/profiles/" + $rootScope.profile.id);
    }
    $scope.patientSelectedAction = function (patient) {
        $scope.selectedPatientId = patient.id;
        $scope.myCases = CaseService.getAllPatientCases(patient.id);
        $window.sessionStorage.selectedPatientId = JSON.stringify(patient.id);
        $scope.filterPatientNameInput = null;
    }


    $scope.filterOnPatient = function (patient) {
        if ($scope.filterPatientNameInput) {
            var patientName = patient.firstName + patient.lastName;
            return patientName.toLowerCase().indexOf($scope.filterPatientNameInput.toLowerCase()) >= 0;
        } else {
            return false;
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
    $scope.closeCase = function (caseId) {
        //TODO: Set case inactive.
        //CaseService.closeCase(caseId);
    }
    $scope.viewAllNotes = function (caseId) {
        $location.path("cases/" + caseId + "/notes");
    }

    $scope.addNewCase = function (patientId) {
        $location.path("/cases/new/patient/"+$scope.selectedPatientId);
    }
});
