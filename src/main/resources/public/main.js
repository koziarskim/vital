var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController'
        })
        .when('/patient', {
            templateUrl: 'patient.html',
            controller: 'PatientController'
        })
        .when('/note', {
            templateUrl: 'note.html',
            controller: 'NoteController'
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
            $location.path("/patient");
        }
    }
});

mainApp.controller('PatientController', function ($scope, PatientService) {
    $scope.students = [
        {name: 'Mark Waugh', city: 'New York'},
        {name: 'Steve Jonathan', city: 'London'},
        {name: 'John Marcus', city: 'Paris'}
    ];
    $scope.patients = PatientService.getAllPatients();
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
            id: 0,
            name: 'Viral',
            email: 'hello@gmail.com',
            phone: '123-2343-44'
        },
        {
            id: 1,
            name: 'Viral1',
            email: 'hello1@gmail.com',
            phone: '123-2143-44'
        }];
    this.getAllPatients = function () {
        return patients;
    }
});