mainApp.controller('NoteController', function ($scope, $location, $routeParams, $window, CaseService, NoteService, PatientService, ProfileService, LocationService) {
    if ($routeParams.patientId == null) {
        console.log("PatientId is null");
    }
    if ($routeParams.noteId == null) {
        console.log("NoteId is null");
    }
    $scope.patientId = $routeParams.patientId;
    $scope.noteId = $routeParams.noteId;
    $scope.caseId = $routeParams.caseId;
    $scope.lastNote = null;
    $scope.note = NoteService.getNote($scope.noteId);
    if (!$scope.note) {
        $scope.lastNote = NoteService.getLastNote($scope.caseId);
        if ($scope.lastNote) {
            $scope.note = angular.copy($scope.lastNote);
            $scope.note.id = null;
            $scope.note.billable = null;
            $scope.note.date = new Date();
            $scope.note.visitLocation = null;
        } else {
            $scope.note = {
                date: new Date()
            }
        }
    }
    $scope.initNote = null;
    $scope.visibleTxAreaName = null;
    $scope.vitalSignsShow = false;
    $scope.showNote = false;
    $scope.selectedTxAreaName = null;
    $scope.availableLocations = LocationService.getAvailableLocation();
    $scope.patientCase = CaseService.getPatientCase($scope.caseId);
    $scope.patient = PatientService.getPatient($scope.patientCase.patientId);

    $scope.toggleAuthAlert = function () {
        if ($scope.patient && $scope.patient.requireAuth && $scope.patient.authVisits <= 0) {
            alert("Patient doesn't have any more authorized visits!" +
                "\nPlease update patient's profile!");
        }
        $scope.showNote = true;
    }
    $scope.toggleVitalSigns = function () {
        $scope.vitalSignsShow = !$scope.vitalSignsShow;
    }
    $scope.toggleTxArea = function (txAreaName) {
        if ($scope.visibleTxAreaName == txAreaName) {
            $scope.visibleTxAreaName = null;
        } else {
            $scope.visibleTxAreaName = txAreaName;
        }
        $scope.selectedTxAreaName = txAreaName;
    }
    $scope.editPatient = function (patientId) {
        $location.path("/patients/" + patientId);
    }

    $scope.painChange = function () {
        var prevScale = 0;
        var initNote = NoteService.getInitNote($scope.caseId);
        if (initNote != null && initNote.pain != null && initNote.pain.scale != null) {
            prevScale = initNote.pain.scale;
        }
        var curScale = ($scope.note == null || $scope.note.pain == null || $scope.note.pain.scale == null) ? 0 : $scope.note.pain.scale;
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
    $scope.availableObservationTypes = ["Motivation", "Follows Directions", "Cooperation", "Consistency"];
    $scope.availableObservationScales = ["POOR", "FAIR", "GOOD", "EXCELLENT"];
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

    $scope.dateRange = {
        from: null,
        to: null
    }

    $scope.deleteModality = function (modalityId) {
        NoteService.deleteModality($scope.patientId, $scope.note.id, $scope.selectedTxAreaName, modalityId);
    }

    $scope.deleteTxArea = function (txAreaName) {
        NoteService.deleteTxArea($scope.patientId, $scope.note.id, txAreaName);
    }
    $scope.saveModality = function (modalityCode) {
        if ($scope.selectedTxAreaName == null) {
            alert("Please choose TX Area!");
            return;
        }
        var modality = angular.copy($scope.getAvailableExercises(modalityCode));
        //TODO: Remove.
        if (!$scope.note.id) {
            NoteService.saveNote($scope.patientId, $scope.note);
        }
        NoteService.saveModality($scope.patientId, $scope.note.id, $scope.selectedTxAreaName, modality);
        $scope.visibleTxAreaName = $scope.selectedTxAreaName;
    };

    $scope.saveProcedure = function (procedureCode) {
        if ($scope.selectedTxAreaName == null) {
            alert("Please choose TX Area!");
            return;
        }
        var procedure = angular.copy($scope.getAvailableExercises(procedureCode));
        //TODO: Remove.
        if (!$scope.note.id) {
            NoteService.saveNote($scope.patientId, $scope.note);
        }
        NoteService.saveProcedure($scope.patientId, $scope.note.id, $scope.selectedTxAreaName, procedure);
        $scope.visibleTxAreaName = $scope.selectedTxAreaName;
    };

    $scope.saveWc = function (exCode) {
        if ($scope.selectedTxAreaName == null) {
            alert("Please choose TX Area!");
            return;
        }
        var wc = angular.copy($scope.getAvailableExercises(exCode));
        //TODO: Remove.
        if (!$scope.note.id) {
            NoteService.saveNote($scope.patientId, $scope.note);
        }
        NoteService.saveWc($scope.patientId, $scope.note.id, $scope.selectedTxAreaName, wc);
        $scope.visibleTxAreaName = $scope.selectedTxAreaName;
    };

    $scope.saveMotion = function (motionCode) {
        if ($scope.selectedTxAreaName == null) {
            alert("Please choose TX Area!");
            return;
        }
        var motion = angular.copy($scope.getAvailableExercises(motionCode));
        //TODO: Remove.
        if (!$scope.note.id) {
            NoteService.saveNote($scope.patientId, $scope.note);
        }
        NoteService.saveMotion($scope.patientId, $scope.note.id, $scope.selectedTxAreaName, motion);
        $scope.visibleTxAreaName = $scope.selectedTxAreaName;
    };

    $scope.saveNote = function () {
        if (!$scope.note.visitLocation) {
            alert("Please select Location!");
            return;
        }
        if ($scope.note.billable == null) {
            alert("Please specify if note is billable!");
            return;
        }
        if ($scope.note.billable) {
            //TODO: Check if note is new or updating existing note. Don't decrease if update existing note.
            if($scope.patient) {
                $scope.patient.authVisits--;
            }
        }
        NoteService.saveNote($scope.caseId, $scope.note);
        if($scope.noteId=="new"){
            $location.path("/search")
        }else {
            $window.history.back();
        }
    };

    $scope.cancelNote = function () {
        $window.history.back();
    };

    $scope.availablePainAreas = ["Back", "Front", "Bottom", "Upper"];

    $scope.getAvailableExercises = function (modalityCode) {
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
        {code: "ELS", name: "EL. Stim"},
        {code: "HPC", name: "HP/CP"},
        {code: "ION", name: "Ionto"},
        {code: "MEC", name: "Mech. Tx"},
        {code: "INF", name: "Infrared"},
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

    $scope.signDate = new Date();
    $scope.coSignDate = new Date();
    $scope.inputProfile = null;
    $scope.inputCoProfile = null;
    $scope.filterOnProfile = function (profile) {
        if ($scope.inputProfile) {
            var match = (profile.firstName + profile.lastName).toLowerCase().indexOf($scope.inputProfile.toLowerCase()) >= 0;
            return match;
        } else {
            return true;
        }
    };
    $scope.availableTherapists = ProfileService.getAllProfiles();
    $scope.availableCoTherapists = ProfileService.getAllProfiles();

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
    $scope.editNote = function (noteId) {
        $location.path("patients/" + $scope.patientId + "/notes/" + noteId);
    }
});