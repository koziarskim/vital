mainApp.controller('NoteController', function ($scope, $rootScope, $location, $routeParams, $window, TxAreaService, CaseService, NoteService, PatientService, ProfileService, LocationService) {
    $scope.noteId = $routeParams.noteId;
    $scope.caseId = $routeParams.caseId;
    $scope.note = NoteService.getNote($scope.noteId);
    if(!$scope.caseId){
        $scope.caseId = $scope.note.caseId;
    }
    $scope.patientCase = CaseService.getPatientCase($scope.caseId);
    $scope.patient = PatientService.getPatient($scope.patientCase.patientId);
    if (!$scope.note) {
        $scope.note = NoteService.getNewNote($scope.caseId, $rootScope.profile.uid);
    }
    $scope.vitalSignsShow = false;
    $scope.availableLocations = LocationService.getAvailableLocation();
    $scope.selectedTxArea = null;
    $scope.availableTxAreas = TxAreaService.getAvailableTxAreas();
    $scope.visibleTxArea = null;
    $scope.availablePainAreas = NoteService.getAvailablePainAreas();
    $scope.noteTxAreas = TxAreaService.getTxAreasForNote($scope.note.id);
    $scope.availableObservationTypes = ["Motivation", "Follows Directions", "Cooperation", "Consistency"];
    $scope.availableObservationScales = ["POOR", "FAIR", "GOOD", "EXCELLENT"];
    $scope.availableComments = ["Do what's needed", "Repeat every monday", "Stretch", "Continue your tasks", "Do nothing.."];
    $scope.availableCoTherapists = ProfileService.getAvailableProfileNames();

    $scope.toggleVitalSigns = function () {
        $scope.vitalSignsShow = !$scope.vitalSignsShow;
    }
    //TODO: Fix it.
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
    $scope.addModality = function (code) {
        if ($scope.selectedTxArea == null) {
            alert("Please choose TX Area!");
            return;
        }
        var item = angular.copy($scope.getAvailableExercises(code));
        item.id= "M00"+ (+$scope.visibleTxArea.modalities.length +1);
        $scope.visibleTxArea.modalities.push(item);
    };
    $scope.deleteModality = function (id) {
        $scope.visibleTxArea.modalities.forEach(function (it, index) {
            if (it.id == id) {
                $scope.visibleTxArea.modalities.splice(index, 1);
            }
        });
    }
    $scope.addProcedure = function (code) {
        if ($scope.selectedTxArea == null) {
            alert("Please choose TX Area!");
            return;
        }
        var item = angular.copy($scope.getAvailableExercises(code));
        item.id= "M00"+ (+$scope.visibleTxArea.procedures.length +1);
        $scope.visibleTxArea.procedures.push(item);
    };
    $scope.deleteProcedure = function (id) {
        $scope.visibleTxArea.procedures.forEach(function (it, index) {
            if (it.id == id) {
                $scope.visibleTxArea.procedures.splice(index, 1);
            }
        });
    }
    $scope.addMotion = function (code) {
        if ($scope.selectedTxArea == null) {
            alert("Please choose TX Area!");
            return;
        }
        var item = angular.copy($scope.getAvailableExercises(code));
        item.id= "M00"+ (+$scope.visibleTxArea.motions.length +1);
        $scope.visibleTxArea.motions.push(item);
    };
    $scope.deleteMotion = function (id) {
        $scope.visibleTxArea.motions.forEach(function (it, index) {
            if (it.id == id) {
                $scope.visibleTxArea.motions.splice(index, 1);
            }
        });
    }
    $scope.addWc = function (code) {
        if ($scope.selectedTxArea == null) {
            alert("Please choose TX Area!");
            return;
        }
        if($scope.visibleTxArea.wc){
            alert("WC already added!");
            return;
        }
        var item = angular.copy($scope.getAvailableExercises(code));
        $scope.visibleTxArea.wc = item;
    };
    $scope.deleteWc = function (txArea) {
        $scope.visibleTxArea.wc = null;
    }


    $scope.toggleTxArea = function (txArea) {
        if($scope.visibleTxArea && $scope.visibleTxArea.id==txArea.id){
            $scope.visibleTxArea=null;
        }else {
            $scope.visibleTxArea = txArea;
        }
        //TODO: Fix it.
        $scope.selectedTxArea = TxAreaService.getAvailableTxAreaByName(txArea.name);
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
    $scope.getAvailableExercises = function (modalityCode) {
        var modality = null;
        $scope.availableExercises.forEach(function (mod, index) {
            if (mod.code == modalityCode) {
                modality = mod;
            }
        });
        return modality;
    }









    $scope.showNote = false;
    $scope.toggleAuthAlert = function () {
        if ($scope.patient && $scope.patient.requireAuth && $scope.patient.authVisits <= 0) {
            alert("Patient doesn't have any more authorized visits!" +
                "\nPlease update patient's profile!");
        }
        $scope.showNote = true;
    }


    $scope.dateRange = {
        from: null,
        to: null
    }



    $scope.deleteTxArea = function (txAreaName) {
        NoteService.deleteTxArea($scope.patientId, $scope.note.id, txAreaName);
    }


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


});