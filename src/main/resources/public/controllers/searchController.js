mainApp.controller('SearchController', function ($scope, $window, $location, CaseService, PatientService, NoteService) {
    if (!$window.sessionStorage.allPatients) {
        $window.sessionStorage.allPatients = JSON.stringify(PatientService.getAllPatients());
    }
    $scope.allPatients = JSON.parse($window.sessionStorage.allPatients);

    if (!$window.sessionStorage.myCases) {
        $window.sessionStorage.myCases = JSON.stringify([]);
    }
    $scope.myCases = JSON.parse($window.sessionStorage.myCases);

    $scope.filterPatientNameInput = null;

    $scope.patientSelectedAction = function (patient) {
        $scope.myCases = CaseService.getAllPatientCases(patient.id);
        $scope.allPatients.forEach(function (it, index) {
            if (it.id == patient.id) {
                $scope.allPatients.splice(index, 1);
            }
        });
        $window.sessionStorage.myCases = JSON.stringify($scope.myCases);
        $window.sessionStorage.allPatients = JSON.stringify($scope.allPatients);
        $scope.filterPatientNameInput = null;
    }

    $scope.patientCanceledAction = function (patientCase) {
        $scope.myCases.forEach(function (it, index) {
            if (it.id == patientCase.id) {
                $scope.myCases.splice(index, 1);
            }
        });
        PatientService.getAllPatients()
        $scope.allPatients = PatientService.getAllPatients();
        $window.sessionStorage.myCases = JSON.stringify($scope.myCases);
        $window.sessionStorage.allPatients = JSON.stringify($scope.allPatients);
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

    $scope.editPatient = function (caseId) {
        $location.path("/cases/"+caseId);
    }
    $scope.deletePatient = function (patientId) {
        PatientService.deletePatient(patientId);
    }

    $scope.createTodayNote = function (patientId) {
        $location.path("patients/" + patientId + "/notes/new");
    }
    $scope.viewInitNote = function (patientId) {
        var note = NoteService.getInitNote(patientId);
        if (!note) {
            alert("Patient has no init note created yet." +
                "\nPlease, create today's note first");
            return;
        }
        $location.path("patients/" + patientId + "/notes/" + note.id);
    }
    $scope.viewAllNotes = function (patientId) {
        $location.path("patients/" + patientId + "/notes");
    }
    $scope.cancelSearch = function () {
        $location.path("/dashboard");
    };
});
