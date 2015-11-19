var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController'
        })
        .when('/search-patient', {
            templateUrl: 'search-patient.html',
            controller: 'SearchPatientController'
        })
        .when('/note', {
            templateUrl: 'note.html',
            controller: 'NoteController'
        })
        .when('/new-patient/:id?', {
            templateUrl: 'new-patient.html',
            controller: 'NewPatientController'
        })
        .otherwise({
            redirectTo: '/login'
        });
});

mainApp.controller('StudentController', function ($scope) {
    $scope.students = [
        {name: 'Mark Waugh', city: 'New York'},
        {name: 'Steve Jonathan', city: 'London'},
        {name: 'John Marcus', city: 'Paris'}
    ];

    $scope.message = "Click on the hyper link to view the students list.";
});

mainApp.controller('LoginController', function ($scope, $location) {
    $scope.login = {
        userName: null,
        password: null
    };
    $scope.loginAction = function () {
        if ($scope.login.userName == null || $scope.login.password == null) {
            alert("invalid username or password");
        } else {
            $location.path("/search-patient");
        }
    }
});

mainApp.controller('SearchPatientController', function ($scope, $location, PatientService) {
    $scope.patients = PatientService.getAllPatients();
    $scope.addNewPatient = function () {
        $location.path("/new-patient/0");
    };
    $scope.editPatient = function (id) {
        $location.path("/new-patient/"+id);
    }
    $scope.deletePatient = function (id) {
        PatientService.deletePatient(id);
    }
    $scope.addNote = function (id) {
        alert("add note");
        //patients.remove(patient);
    }

});

mainApp.controller('NewPatientController', function ($scope, $location, $routeParams, PatientService) {
    $scope.patientId = $routeParams.id;
    $scope.patient = null;
    if($scope.patientId){
        $scope.patient = PatientService.getPatient($scope.patientId);
    }
    $scope.savePatient = function () {
        PatientService.addNewPatient($scope.patient);
        $location.path("/search-patient");
    };
});

mainApp.controller('NoteController', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.fullName = function () {
        return $scope.firstName + " " + $scope.lastName;
    };
    $scope.name;
    $scope.report = {'fromDate': null, 'toDate': null}
    $scope.items = [
        {'id': 'CPP', 'value': 'Chicago-Portage Park'},
        {'id': 'CPS', 'value': 'Chicago Pediatrics'},
        {'id': 'PRG', 'value': 'Park Ridge'},
        {'id': 'SBG', 'value': 'Schaumburg'},
        {'id': 'CTH', 'value': 'Chicago/Thorek Hospital'}];
    $scope.value;
    $scope.generateReport = function () {
        if ($scope.report.fromDate == null || $scope.report.toDate == null) {
            alert('from and to date required!');
        } else {
            alert('Under Construction...')
        }

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
    this.addNote = function (id) {
        alert("add note");
        //patients.remove(patient);
    }
});