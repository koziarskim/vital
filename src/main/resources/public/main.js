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
        .when('/patients/:patientId?/notes', {
            templateUrl: 'notes.html',
            controller: 'NotesController'
        })
        .when('/patients/:patientId?', {
            templateUrl: 'patient.html',
            controller: 'PatientController'
        })
        .otherwise({
            redirectTo: '/login'
        });
});

mainApp.controller('IndexController', function ($scope, $location, UserContextService) {
    $scope.data = UserContextService.data;
    $scope.goHome = function () {
        $location.path("/patients");
    }
    $scope.logOut = function () {
        UserContextService.data.firstName=null;
        $location.path("/");
    }
});

mainApp.service('UserContextService', function(){
    this.data = {
        firstName: '',
        lastName: ''
    }
});

mainApp.controller('LoginController', function ($scope, $location, UserContextService) {
    $scope.login = {
        userName: null,
        password: null
    };
    $scope.loginAction = function () {
        if ($scope.login.userName == null || $scope.login.password == null ||
            $scope.login.userName !="tom" || $scope.login.password!="tom") {

            alert("invalid username or password");
        } else {
            UserContextService.data.firstName = $scope.login.userName;
            $location.path("/patients");
        }
    }
});

mainApp.controller('PatientsController', function ($scope, $location, PatientService) {
    $scope.patients = PatientService.getAllPatients();
    $scope.addNewPatient = function () {
        $location.path("/patients/0");
    };
    $scope.editPatient = function (patientId) {
        $location.path("/patients/"+patientId);
    }
    $scope.deletePatient = function (patientId) {
        PatientService.deletePatient(patientId);
    }
    $scope.showNotes = function (patientId) {
        $location.path("patients/"+patientId+"/notes");
    }

});

mainApp.controller('PatientController', function ($scope, $location, $routeParams, PatientService) {
    $scope.patientId = $routeParams.patientId;
    $scope.patient = null;
    if($scope.patientId){
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
    if($scope.noteId){
        $scope.note = NoteService.getNote($scope.noteId);
    }
    $scope.saveNote = function () {
        NoteService.addNewNote($scope.note);
        $location.path("patients/"+$scope.patientId+"/notes");
    };
});

mainApp.controller('NotesController', function ($scope, $location, NoteService) {
    $scope.notes = NoteService.getAllNotes();
    $scope.addNewNote = function () {
        $location.path("/notes/0");
    };
    $scope.editNote = function (noteId) {
        $location.path("/notes/"+noteId);
    }
    $scope.deleteNote = function (noteId) {
        NoteService.deleteNote(noteId);
    }
});

mainApp.service('NoteService', function () {
    var notes = [
        {
            id: 1,
            firstName: 'Tom',
            lastName: 'Kokocinski',
            dob: '2015-04-20',
            gender:'male'
        },
        {
            id: 2,
            firstName: 'Marcin',
            lastName: 'Koziarski',
            dob: '1977-04-03',
            gender:"male"
        }
    ];
    this.getAllNotes = function () {
        return notes;
    }
    this.addNewNote = function (note) {
        if(note!=null){
            if(note.id==null) {
                note.id = notes.length + 1;
                notes.push(note);
            }else{
                notes.forEach(function(it, index) {
                    if(it.id == note.id) {
                        notes[index] = it;
                    }
                });
            }

        }
    }
    this.deleteNote = function (id) {
        notes.forEach(function(result, index) {
            if(result['id'] == id) {
                notes.splice(index, 1);
            }
        });
    }
    this.getNote = function (id) {
        var note = null;
        notes.forEach(function(it, index) {
            if(it.id == id) {
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
            dob: '2015-04-20',
            gender:'male'
        },
        {
            id: 2,
            firstName: 'Marcin',
            lastName: 'Koziarski',
            dob: '1977-04-03',
            gender:"male"
        }
        ];
    this.getAllPatients = function () {
        return patients;
    }
    this.addNewPatient = function (patient) {
        if(patient!=null){
            if(patient.id==null) {
                patient.id = patients.length + 1;
                patients.push(patient);
            }else{
                patients.forEach(function(it, index) {
                    if(it.id == patient.id) {
                        patients[index] = it;
                    }
                });
            }

        }
    }
    this.deletePatient = function (id) {
        patients.forEach(function(result, index) {
            if(result['id'] == id) {
                patients.splice(index, 1);
            }
        });
    }
    this.getPatient = function (id) {
        var patient = null;
        patients.forEach(function(it, index) {
            if(it.id == id) {
                patient = it;
            }
        });
        return patient;
    }
});