var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController'
        })
        .when('/patients', {
            templateUrl: 'patients.html',
            controller: 'PatientsController'
        })
        .when('/notes/:noteId?', {
            templateUrl: 'note.html',
            controller: 'NoteController'
        })
        .when('/patients/:patientId?/notes/:noteId', {
            templateUrl: 'note.html',
            controller: 'NoteController'
        })
        .when('/patients/:patientId?/notes', {
            templateUrl: 'notes.html',
            controller: 'NotesController'
        })
        .when('/patients/:patientId?', {
            templateUrl: 'patient.html',
            controller: 'PatientController'
        })
        .when('/dashboard', {
            templateUrl: 'dashboard.html',
            controller: 'DashboardController'
        })
        .otherwise({
            redirectTo: '/login'
        });
});

mainApp.controller('IndexController', function ($scope, $location, UserContextService) {
    $scope.data = UserContextService.data;
    $scope.goDashboard = function () {
        $location.path("/dashboard");
    }
    $scope.goPatient = function () {
        if(UserContextService.data.office==null){
            return;
        }
        $location.path("/patients");
    }
    $scope.logOut = function () {
        UserContextService.data.firstName = null;
        $location.path("/");
    }
});

mainApp.service('UserContextService', function () {
    this.data = {
        firstName: null,
        lastName: null,
        office: null
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
    $scope.availableLocations = ["Chicago-Portage Park","Chicago Pediatrics","Park Ridge","Schaumburg","Chicago/Thorek Hospital"];
    $scope.selectedLocation = UserContextService.data.office;
    $scope.locationAction = function () {
        UserContextService.data.office = $scope.selectedLocation;
        $location.path("/patients");
    };
});

mainApp.controller('PatientsController', function ($scope, $location, PatientService, UserContextService) {
    if(UserContextService.data.office==null){
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
    $scope.showNotes = function (patientId) {
        $location.path("patients/" + patientId + "/notes");
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

mainApp.controller('NoteController', function ($scope, $location, $routeParams, NoteService) {
    $scope.patientId = $routeParams.patientId;
    $scope.noteId = $routeParams.noteId;
    $scope.note = null;
    $scope.prevNote = null;
    if ($scope.noteId) {
        $scope.note = NoteService.getNote($scope.noteId);
        $scope.prevNote = NoteService.getNote($scope.noteId-1);
    }
    if ($scope.note == null) {
        $scope.note = {
            id: null,
            number: null,
            date: new Date(),
            modalities: []
        }
    }
    $scope.painChange = function () {
        var prevScale = $scope.prevNote==null?0:$scope.prevNote.pain.scale;
        var scale = 0;
        if($scope.note !=null) {
            scale = $scope.note.pain.scale-prevScale;
        }
        return scale;
    }

    $scope.availableComments = ["Do what's needed", "Repeat every monday", "Stretch", "Continue your tasks", "Do nothing.."];
    $scope.selectedModality = {
        id: null,
        name: null,
        time: null,
        comments: null
    }
    $scope.dateRange = {
        from: null,
        to: null
    }
    $scope.addModality = function (modality) {
        $scope.note.modalities.push(modality);
    };

    $scope.saveNote = function () {
        NoteService.addNote($scope.note);
        $location.path("/patients/" + $scope.patientId + "/notes");
    };

    $scope.copyNote = function () {
        var today = new Date();
        var confirmed = true;
        if ($scope.note.date.getYear() != today.getYear() || $scope.note.date.getMonth() != today.getMonth() || $scope.note.date.getDate() != today.getDate()) {
            confirmed = confirm("Date is not current, are you sure you want to copy?");
        }
        if (!confirmed) {
            return;
        }
        var newNote = angular.copy($scope.note);
        newNote.id = null;
        newNote.number = null;
        NoteService.addNote(newNote);
        $location.path("/patients/" + $scope.patientId + "/notes");
    };

    $scope.availablePainAreas = ["Back", "Front", "Bottom", "Upper"];

    //Available modalities
    $scope.availableModalities = [
        {id: "A", name: "US", time: 1, comments: "Stretch"},
        {id: "B", name: "EL. Stim v", time: 3, comments: "Repeat every monday"},
        {id: "C", name: "HP/CP v", time: 2, comments: "Do what's needed"},
        {id: "D", name: "Ionto v", time: 6, comments: "Stretch"},
        {id: "E", name: "Mech. Tx v", time: 9, comments: "Do nothing.."},
        {id: "F", name: "Infrared v", time: 40, comments: "Stretch"},
        {id: "G", name: "Com. Pump", time: 1, comments: "Stretch"},
        {id: "H", name: "Man. Tx", time: 1, comments: "Stretch"},
        {id: "I", name: "TX. Ex", time: 1, comments: "Stretch"},
        {id: "J", name: "NM-RE", time: 1, comments: "Stretch"},
        {id: "K", name: "Gait", time: 1, comments: "Stretch"},
        {id: "L", name: "Func. Act", time: 1, comments: "Stretch"},
        {id: "M", name: "Aquatic", time: 1, comments: "Stretch"},
        {id: "N", name: "ROM/MMT", time: 1, comments: "Stretch"},
        {id: "P", name: "Init. Ev", time: 1, comments: "Stretch"},
        {id: "Q", name: "Re-ev", time: 1, comments: "Stretch"},
        {id: "R", name: "FCE", time: 1, comments: "Stretch"},
        {id: "S", name: "WC-2hrs", time: 1, comments: "Stretch"},
        {id: "T", name: "WC-addl", time: 1, comments: "Stretch"},
        {id: "U", name: "Man. Tests", time: 1, comments: "Stretch"},
        {id: "V", name: "Funct. Tests", time: 1, comments: "Stretch"},
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
        if ((note.date > $scope.dateRange.from || $scope.dateRange.from==null) && (note.date < $scope.dateRange.to || $scope.dateRange.to==null)) {
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

mainApp.service('NoteService', function () {
    var notes = [
        {
            id: 1,
            number: 1,
            date: new Date('2010-10-03'),
            pain: {area:"Back", scale: 2},
            modalities: [{
                id: "A",
                name: "d",
                time: 12,
                comments: "Stretch"
            }, {
                id: "B",
                name: "e",
                time: 4,
                comments: "Repeat every monday"
            }]
        },
        {
            id: 2,
            number: 2,
            date: new Date('2014-10-03'),
            pain: {area:"Front", scale: 1},
            modalities: [{
                id: "A",
                name: "d",
                time: 12,
                comments: "Stretch"
            }, {
                id: "B",
                name: "e",
                time: 4,
                comments: "Repeat every monday"
            }]
        }, {
            id: 3,
            number: 3,
            date: new Date('2015-10-03'),
            pain: {area:"Back", scale: 0},
            modalities: []
        }, {
            id: 4,
            number: 4,
            date: new Date('2015-11-03'),
            pain: {area:"Upper", scale: 10},
            modalities: []
        },
    ];
    this.getAllNotes = function (patientId) {
        return notes;
    }
    this.addNote = function (note) {
        if (note != null) {
            if (note.id == null) {
                note.id = notes.length + 1;
                note.number = notes.length + 1;
                notes.push(note);
            } else {
                notes.forEach(function (it, index) {
                    if (it.id == note.id) {
                        notes[index] = it;
                    }
                });
            }

        }
    }
    this.deleteNote = function (id) {
        notes.forEach(function (result, index) {
            if (result['id'] == id) {
                notes.splice(index, 1);
            }
        });
    }
    this.getNote = function (id) {
        var note = null;
        notes.forEach(function (it, index) {
            if (it.id == id) {
                note = it;
            }
        });
        return note;
    }
});

mainApp.service('PatientService', function () {
    var patients = [
        {
            id: 1,
            firstName: 'Tom',
            lastName: 'Kokocinski',
            dob: new Date('2015-11-03T06:00:00.000Z'),
            gender: 'male',
            insuranceName: 'BCBS',
            authVisits: 1,
            visitFrom: null,
            visitTo: null
        },
        {
            id: 2,
            firstName: 'Marcin',
            lastName: 'Koziarski',
            dob: new Date('2015-11-03'),
            gender: "male",
            insuranceName: 'BCBS',
            authVisits: 1,
            visitFrom: null,
            visitTo: null
        },
        {
            id: 2,
            firstName: 'Joe',
            lastName: 'Smith',
            dob: new Date('2005-11-03'),
            gender: "female",
            insuranceName: 'BCBS',
            authVisits: 1,
            visitFrom: null,
            visitTo: null
        }
    ];
    this.getAllPatients = function () {
        return patients;
    }
    this.addNewPatient = function (patient) {
        if (patient != null) {
            if (patient.id == null) {
                patient.id = patients.length + 1;
                patients.push(patient);
            } else {
                patients.forEach(function (it, index) {
                    if (it.id == patient.id) {
                        patients[index] = it;
                    }
                });
            }

        }
    }
    this.deletePatient = function (id) {
        patients.forEach(function (result, index) {
            if (result['id'] == id) {
                patients.splice(index, 1);
            }
        });
    }
    this.getPatient = function (id) {
        var patient = null;
        patients.forEach(function (it, index) {
            if (it.id == id) {
                patient = it;
            }
        });
        return patient;
    }
});