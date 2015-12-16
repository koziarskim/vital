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
    $scope.savePatient = function () {
        $location.path("/patients/0");
    };
    $scope.editPatient = function (patientId) {
        $location.path("/patients/" + patientId);
    }
    $scope.deletePatient = function (patientId) {
        PatientService.deletePatient(patientId);
    }
    $scope.showInitNote = function (patientId) {
        var note = NoteService.getInitNote(patientId);
        $location.path("patients/" + patientId + "/notes/" + note.id);
    }
    $scope.showAllNotes = function (patientId) {
        $location.path("patients/" + patientId + "/notes");
    }
    $scope.createTodayNote = function (patientId) {
        var lastNote = NoteService.getLastNote(patientId);
        var note = angular.copy(lastNote);
        note.id = null;
        note.number = null;
        note.date = new Date();
        var newNote = NoteService.saveNote(patientId, note);
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
        PatientService.savePatient($scope.patient);
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
    $scope.note = NoteService.getNote($scope.patientId, $scope.noteId);
    $scope.visibleTxAreaName = null;

    $scope.toggleTxArea = function(txAreaName){
        if($scope.visibleTxAreaName==txAreaName){
            $scope.visibleTxAreaName=null;
        }else {
            $scope.visibleTxAreaName = txAreaName;
        }
    }
    $scope.painChange = function () {
        var prevScale = 0;
        var initNote = NoteService.getInitNote($scope.patientId);
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
    //TODO: Need to add custom txArea from service.
    $scope.availableTxAreas = ["Back", "Up", "Front", "Leg"];
    $scope.selectedTxArea = null;
    $scope.dateRange = {
        from: null,
        to: null
    }

    $scope.saveModality = function (modalityCode) {
        if ($scope.selectedTxArea == null) {
            alert("Please choose TX Area!");
            return;
        }
        var modality = angular.copy($scope.getAvailableExercises(modalityCode));
        NoteService.saveModality($scope.patientId, $scope.note.id, $scope.selectedTxArea, modality);
        $scope.visibleTxAreaName = $scope.selectedTxArea;
    };

    $scope.saveProcedure = function (procedureCode) {
        if ($scope.selectedTxArea == null) {
            alert("Please choose TX Area!");
            return;
        }
        var procedure = angular.copy($scope.getAvailableExercises(procedureCode));
        NoteService.saveProcedure($scope.patientId, $scope.note.id, $scope.selectedTxArea, procedure);
        $scope.visibleTxAreaName = $scope.selectedTxArea;
    };

    $scope.saveMotion = function (motionCode) {
        if ($scope.selectedTxArea == null) {
            alert("Please choose TX Area!");
            return;
        }
        var motion = angular.copy($scope.getAvailableExercises(motionCode));
        NoteService.saveMotion($scope.patientId, $scope.note.id, $scope.selectedTxArea, motion);
        $scope.visibleTxAreaName = $scope.selectedTxArea;
    };

    $scope.saveNote = function () {
        NoteService.saveNote($scope.patientId, $scope.note);
        $location.path("/patients/" + $scope.patientId + "/notes");
    };

    $scope.availablePainAreas = ["Back", "Front", "Bottom", "Upper"];

    $scope.getAvailableExercises = function(modalityCode){
        var modality = null;
        $scope.availableExercises.forEach(function (mod, index) {
            if (mod.code == modalityCode) {
                modality = mod;
            }
        });
        return modality;
    }

    $scope.availableExercises = [
        {code: "USA", name: "US"},
        {code: "ELS", name: "EL. Stim v"},
        {code: "HPC", name: "HP/CP v"},
        {code: "ION", name: "Ionto v"},
        {code: "MEC", name: "Mech. Tx v"},
        {code: "INF", name: "Infrared v"},
        {code: "COP", name: "Com. Pump"},
        {code: "OTM", name: "Other Mod."},
        {code: "MAT", name: "Man. Tx"},
        {code: "NMR", name: "NM-RE"},
        {code: "GAI", name: "Gait"},
        {code: "FUA", name: "Func. Act"},
        {code: "AQU", name: "Aquatic"},
        {code: "IEV", name: "Init. Ev"},
        {code: "REV", name: "Re-ev"},
        {code: "FCE", name: "FCE"},
        {code: "MTE", name: "Man. Tests"},
        {code: "FTE", name: "Funct. Tests"},
        {code: "OTP", name: "Other Proc."},
        {code: "TXE", name: null},
        {code: "WC2", name: null},
        {code: "WCA", name: null},
        {code: "RMT", name: null}
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
        $location.path("patients/"+$scope.patientId+"/notes/" + noteId);
    }
});