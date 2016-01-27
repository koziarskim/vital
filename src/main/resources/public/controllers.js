mainApp.controller('IndexController', function ($scope, $window, $rootScope, $location) {
    $scope.$on('$viewContentLoaded', function () {
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    if($window.localStorage.userContext) {
        $rootScope.profile = JSON.parse($window.localStorage.userContext)
    }
    $scope.goDashboard = function () {
        $location.path("/dashboard");
    }
    $scope.goReport = function () {
        $location.path("report");
    }
    $scope.goAssessment = function () {
        if ($scope.data.patientId == null || $scope.data.noteId == null) {
            alert("Please select note");
            return;
        }
        $location.path("patients/" + $scope.data.patientId + "/notes/" + $scope.data.noteId + "/assessment");
    }
    $scope.goNewPatient = function () {
        $location.path("/patients/new");
    }
    $scope.logOut = function () {
        $window.localStorage.clear()
        $rootScope.profile = null;
        $location.path("/");
    }
    $scope.editProfile = function (uid) {
        $location.path("profiles/" + uid);
    }
});

mainApp.controller('LoginController', function ($scope, $window, $rootScope, $location, ProfileService) {
    $scope.login = {
        userName: null,
        password: null
    };
    $scope.loginAction = function () {
        $window.localStorage.clear()
        if ($scope.login.userName == null || $scope.login.password == null) {
            alert("Please enter username and password");
            return;
        }
        var authenticated = ProfileService.validateUser($scope.login.userName, $scope.login.password);

        if (authenticated) {
            $rootScope.profile = ProfileService.getProfile($scope.login.userName);
            $window.localStorage.userContext = JSON.stringify($rootScope.profile);
            $location.path("/dashboard");
        } else {
            alert("Invalid username and/or password");
            $location.path("/login");
        }
    }
});

mainApp.controller('DashboardController', function ($scope, $window, $location, PatientService, NoteService) {
    if (!$window.localStorage.storedAllPatients) {
        $window.localStorage.storedAllPatients = JSON.stringify(PatientService.getAllPatients());
    }
    $scope.allPatients = JSON.parse($window.localStorage.storedAllPatients);

    if (!$window.localStorage.storedMyPatients) {
        $window.localStorage.storedMyPatients = JSON.stringify([]);
    }
    $scope.myPatients = JSON.parse($window.localStorage.storedMyPatients);

    $scope.filterPatientNameInput = null;

    $scope.addTostoredPatients = function (patient) {
        $scope.myPatients.push(angular.copy(patient));
        $scope.allPatients.forEach(function (it, index) {
            if (it.id == patient.id) {
                $scope.allPatients.splice(index, 1);
            }
        });
        $window.localStorage.storedMyPatients = JSON.stringify($scope.myPatients);
        $window.localStorage.storedAllPatients = JSON.stringify($scope.allPatients);
        $scope.filterPatientNameInput = null;
    }

    $scope.removeFromstoredPatients = function (patient) {
        $scope.myPatients.forEach(function (it, index) {
            if (it.id == patient.id) {
                $scope.myPatients.splice(index, 1);
            }
        });
        $scope.allPatients.push(angular.copy(patient));
        $window.localStorage.storedMyPatients = JSON.stringify($scope.myPatients);
        $window.localStorage.storedAllPatients = JSON.stringify($scope.allPatients);
    }

    $scope.filterOnPatient = function (patient) {
        if ($scope.filterPatientNameInput) {
            return (patient.firstName + patient.lastName).toLowerCase().indexOf($scope.filterPatientNameInput.toLowerCase()) >= 0;
        } else {
            return false;
        }
    };
    $scope.savePatient = function (patient) {
        var savedPatient = PatientService.savePatient(patient);
        $location.path("/patients/" + savedPatient.id);
    };

    $scope.editPatient = function (patientId) {
        $location.path("/patients/" + patientId);
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
});

mainApp.controller('ReportController', function ($scope, $location, PatientService, LocationService) {
    $scope.locationItem = null;
    $scope.locationItems = LocationService.getAvailableLocation();
    $scope.patientItem = {};
    $scope.patientItems = PatientService.getAllPatientItems();
    $scope.caseItem = null;
    $scope.caseItems = [{id: 'C001', name: 'C001'}, {id: 'C002', name: 'C002'}, {id: 'C003', name: 'C003'}];
});

mainApp.controller('PatientController', function ($scope, $window, $location, $routeParams, PatientService, NoteService) {
    $scope.patientId = $routeParams.patientId;
    $scope.noteId = $routeParams.noteId;

    $scope.patient = {};
    $scope.note = null;
    if ($scope.patientId != "new") {
        $scope.patient = PatientService.getPatient($scope.patientId);
    }
    $scope.patientMedical = null;
    $scope.insuranceName = null;
    $scope.medicareFlag = null;
    $scope.patientInfoDate = new Date();
    if ($scope.noteId) {
        $scope.note = NoteService.getNote($scope.patientId, $scope.noteId);
        $scope.patientMedical = PatientService.getPatientMedical($scope.note.patientMedicalId);
        $scope.insuranceName = $scope.patientMedical.insuranceName;
        $scope.medicareFlag = $scope.patientMedical.medicareFlag;
    } else {
        $scope.insuranceName = $scope.patient.insuranceName;
        $scope.medicareFlag = $scope.patient.medicareFlag;
    }

    $scope.patientCases = PatientService.getAllPatientCases($scope.patientId);
    $scope.availableInsuranceTypes = ["BCBS", "Aetna", "MyInsurance"];
    $scope.savePatient = function () {
        PatientService.savePatient($scope.patient);
        $scope.allPatients = PatientService.getAllPatients();
        $window.localStorage.storedAllPatients = JSON.stringify($scope.allPatients);
        $location.path("/dashboard");
    };
    $scope.cancelPatient = function () {
        $location.path("/dashboard");
    };
    $scope.createCase = function () {
        $location.path("patients/" + $scope.patientId + "/cases/new");
    }

    $scope.createTodayNote = function (patientId) {
        $location.path("patients/" + patientId + "/notes/new");
    }
});

mainApp.controller('CaseController', function ($scope, $location, $routeParams, NoteService, PatientService) {
    $scope.patientId = $routeParams.patientId;
    $scope.caseId = $routeParams.caseId;
    $scope.patientCase = PatientService.getPatientCase($scope.patientId, $scope.caseId);
    $scope.notes = [];
    if ($scope.caseId != "new") {
        $scope.notes = NoteService.getAllNotes($scope.patientId);
    }
    $scope.patient = PatientService.getPatient($scope.patientId);
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
        $location.path("patients/" + $scope.patientId);
    };
});

mainApp.controller('NotesController', function ($scope, $location, $routeParams, NoteService, PatientService) {
    $scope.patientId = $routeParams.patientId;
    $scope.caseId = $routeParams.caseId;
    $scope.patientCase = PatientService.getPatientCase($scope.patientId, $scope.caseId);
    $scope.notes = [];
    if ($scope.caseId != "new") {
        $scope.notes = NoteService.getAllNotes($scope.patientId);
    }
    $scope.patient = PatientService.getPatient($scope.patientId);
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

mainApp.controller('NoteController', function ($scope, $location, $routeParams, NoteService, PatientService, ProfileService, LocationService) {
    if ($routeParams.patientId == null) {
        console.log("PatientId is null");
    }
    if ($routeParams.noteId == null) {
        console.log("NoteId is null");
    }
    $scope.patientId = $routeParams.patientId;
    $scope.noteId = $routeParams.noteId;
    $scope.lastNote = null;
    $scope.note = NoteService.getNote($scope.patientId, $scope.noteId);
    if (!$scope.note) {
        $scope.lastNote = NoteService.getLastNote($scope.patientId);
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
    $scope.patient = PatientService.getPatient($scope.patientId);
    $scope.patientMedical = PatientService.getPatientMedical($scope.note.patientMedicalId);
    if (!$scope.patientMedical) {
        $scope.patientMedical = {};
    }
    $scope.vitalSignsShow = false;
    $scope.showNote = false;
    $scope.selectedTxAreaName = null;
    $scope.availableLocations = LocationService.getAvailableLocation();
    $scope.patientCases = PatientService.getAllPatientCases($scope.patientId);
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
        var initNote = NoteService.getInitNote($scope.patientId);
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
        NoteService.saveNote($scope.patientId, $scope.note);
        $location.path("/patients/" + $scope.patientId);
    };

    $scope.cancelNote = function () {
        $location.path("/patients/" + $scope.patientId);
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
});

mainApp.controller('ProfileController', function ($scope, $location, $routeParams, ProfileService) {
    $scope.uid = $routeParams.uid;
    $scope.changePassword = false;
    $scope.verifyPassword = null;
    $scope.profile = ProfileService.getProfile($scope.uid);
    $scope.saveProfile = function (profile) {
        if ($scope.changePassword) {
            if (profile.password != $scope.verifyPassword) {
                alert("Password and Verify Password don't match");
                return;
            }
        }
        ProfileService.saveProfile(profile);
        $location.path("dashboard/");
    }
});