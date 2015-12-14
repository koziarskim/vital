mainApp.controller('IndexController', function ($scope, $location, UserContextService) {
    $scope.$on('$viewContentLoaded', function () {
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    $scope.data = UserContextService.data;
    $scope.goDashboard = function () {
        $location.path("/dashboard");
    }
    $scope.goPatient = function () {
        if (UserContextService.data.office == null) {
            return;
        }
        $location.path("/patients");
    }
    $scope.logOut = function () {
        UserContextService.data.firstName = null;
        $location.path("/");
    }
});

mainApp.controller('LoginController', function ($scope, $location, UserContextService) {
    $scope.login = {
        userName: null,
        password: null
    };
    $scope.loginAction = function () {
        if ($scope.login.userName == null || $scope.login.password == null ||
            $scope.login.userName != "tom" || $scope.login.password != "tom") {

            alert("invalid username or password");
        } else {
            UserContextService.data.firstName = $scope.login.userName;
            $location.path("/dashboard");
        }
    }
});

mainApp.controller('DashboardController', function ($scope, $location, UserContextService) {
    $scope.availableLocations = ["Chicago-Portage Park", "Chicago Pediatrics", "Park Ridge", "Schaumburg", "Chicago/Thorek Hospital"];
    $scope.selectedLocation = UserContextService.data.office;
    $scope.locationAction = function () {
        UserContextService.data.office = $scope.selectedLocation;
        $location.path("/patients");
    };
});

mainApp.controller('PatientsController', function ($scope, $location, PatientService, UserContextService, NoteService) {
    if (UserContextService.data.office == null) {
        alert("Please select location of your office");
        return;
    }
    $scope.patients = PatientService.getAllPatients();
    $scope.filterInput = null;
    $scope.filterOnPatient = function (patient) {
        if ($scope.filterInput) {
            return (patient.firstName + patient.lastName).toLowerCase().indexOf($scope.filterInput.toLowerCase()) >= 0;
        } else {
            return true;
        }
    };
    $scope.addNewPatient = function () {
        $location.path("/patients/0");
    };
    $scope.editPatient = function (patientId) {
        $location.path("/patients/" + patientId);
    }
    $scope.deletePatient = function (patientId) {
        PatientService.deletePatient(patientId);
    }
    $scope.showInitNote = function (patientId) {
        var note = PatientService.getInitNote(patientId);
        $location.path("patients/" + patientId + "/notes/" + note.id);
    }
    $scope.showAllNotes = function (patientId) {
        $location.path("patients/" + patientId + "/notes");
    }
    $scope.createTodayNote = function (patientId) {
        var lastNote = PatientService.getLastNote(patientId);
        var note = angular.copy(lastNote);
        note.id = null;
        note.number = null;
        note.date = new Date();
        var newNote = NoteService.saveNote(note);
        $location.path("patients/" + patientId + "/notes/" + newNote.id);
    }

});

mainApp.controller('PatientController', function ($scope, $location, $routeParams, PatientService) {
    $scope.patientId = $routeParams.patientId;
    $scope.patient = null;
    if ($scope.patientId) {
        $scope.patient = PatientService.getPatient($scope.patientId);
    }
    $scope.savePatient = function () {
        PatientService.addNewPatient($scope.patient);
        $location.path("/patients");
    };
});

mainApp.controller('NoteController', function ($scope, $location, $routeParams, NoteService, PatientService) {
    if ($routeParams.patientId == null) {
        console.log("PatientId is null");
    }
    if ($routeParams.noteId == null) {
        console.log("NoteId is null");
    }
    $scope.patientId = $routeParams.patientId;
    $scope.noteId = $routeParams.noteId;
    $scope.note = null;
    $scope.initNote = null;
    $scope.note = NoteService.getNote($scope.noteId);
    $scope.painChange = function () {
        var prevScale = 0;
        var initNote = PatientService.getInitNote($scope.patientId);
        if (initNote != null && initNote.pain != null && initNote.pain.scale != null) {
            prevScale = initNote.pain.scale;
        }
        var curScale = ($scope.note.pain == null || $scope.note.pain.scale == null) ? 0 : $scope.note.pain.scale;
        var scale = 0;
        if (prevScale == 0) {
            scale = curScale * 10;
            return scale;
        }
        if (prevScale == curScale) {
            scale = 0;
            return scale;
        }
        scale = ((curScale - prevScale) / prevScale) * 100;
        return scale;
    }

    $scope.getUnits = function (modality) {
        var units = 0;
        if (modality != null) {
            if (modality.time > 0 && modality.time <= 8) {
                units = 1;
            }
            if (modality.time > 8 && modality.time <= 23) {
                units = 2;
            }
            if (modality.time > 23 && modality.time <= 38) {
                units = 3;
            }
            if (modality.time > 38 && modality.time <= 53) {
                units = 4;
            }
            if (modality.time > 53 && modality.time <= 68) {
                units = 5;
            }
            if (modality.time > 68 && modality.time <= 83) {
                units = 6;
            }
            if (modality.time > 83 && modality.time <= 98) {
                units = 7;
            }
        }
        return units;
    }

    $scope.availableComments = ["Do what's needed", "Repeat every monday", "Stretch", "Continue your tasks", "Do nothing.."];
    $scope.selectedModality = {
        id: null,
        code: null,
        name: null,
        time: null,
        comments: null
    }
    $scope.availableTxAreas = ["Back", "Up", "Front", "Leg"];
    $scope.selectedTxArea = null;
    $scope.dateRange = {
        from: null,
        to: null
    }
    $scope.setTextArea = function (textArea) {
        $scope.selectedTxArea = textArea;
    }

    $scope.selectedItem = function (val) {
        console.log(val);
    }

    $scope.addModality = function (modality) {
        if ($scope.selectedTxArea == null) {
            alert("Please choose TX Area!");
            return;
        }
        var mod = angular.copy(modality);
        NoteService.addModality($scope.note.id, $scope.selectedTxArea, mod);
    };

    $scope.saveNote = function () {
        NoteService.saveNote($scope.note);
        $location.path("/patients/" + $scope.patientId + "/notes");
    };

    $scope.availablePainAreas = ["Back", "Front", "Bottom", "Upper"];

    //Available modalities
    $scope.availableModalities = [
        {code: "USA", name: "US", time: null, comments: null},
        {code: "ELS", name: "EL. Stim v", time: null, comments: null},
        {code: "HPC", name: "HP/CP v", time: null, comments: null},
        {code: "ION", name: "Ionto v", time: null, comments: null},
        {code: "MEC", name: "Mech. Tx v", time: null, comments: null},
        {code: "INF", name: "Infrared v", time: null, comments: null},
        {code: "COP", name: "Com. Pump", time: null, comments: null},
        {code: "OTM", name: "Other Mod.", time: null, comments: null},
        {code: "MAT", name: "Man. Tx", time: null, comments: null},
        {code: "TXE", name: "TX. Ex", time: null, comments: null},
        {code: "NMR", name: "NM-RE", time: null, comments: null},
        {code: "GAI", name: "Gait", time: null, comments: null},
        {code: "FUA", name: "Func. Act", time: null, comments: null},
        {code: "AQU", name: "Aquatic", time: null, comments: null},
        {code: "RMT", name: "ROM/MMT", time: null, comments: null},
        {code: "IEV", name: "Init. Ev", time: null, comments: null},
        {code: "REV", name: "Re-ev", time: null, comments: null},
        {code: "FCE", name: "FCE", time: null, comments: null},
        {code: "WC2", name: "WC-2hrs", time: null, comments: null},
        {code: "WCA", name: "WC-addl", time: null, comments: null},
        {code: "MTE", name: "Man. Tests", time: null, comments: null},
        {code: "FTE", name: "Funct. Tests", time: null, comments: null},
        {code: "OTP", name: "Other Proc.", time: null, comments: null}
    ]
});

mainApp.controller('NotesController', function ($scope, $location, $routeParams, NoteService) {
    $scope.patientId = $routeParams.patientId;
    $scope.notes = NoteService.getAllNotes($scope.patientId);
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
    $scope.addNewNote = function () {
        $location.path("/patients/" + $scope.patientId + "/notes/0");
    };
    $scope.editNote = function (noteId) {
        $location.path("/notes/" + noteId);
    }
    $scope.deleteNote = function (noteId) {
        NoteService.deleteNote(noteId);
    }
});