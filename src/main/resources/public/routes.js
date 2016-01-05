mainApp.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController'
        })
        .when('/notes/:noteId?', {
            templateUrl: 'note.html',
            controller: 'NoteController'
        })
        .when('/patients/:patientId/notes/:noteId', {
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
        .when('/notes/:noteId/patient/:patientId', {
            templateUrl: 'patient.html',
            controller: 'PatientController'
        })
        .when('/profiles/:uid?', {
            templateUrl: 'profile.html',
            controller: 'ProfileController'
        })
        .when('/dashboard', {
            templateUrl: 'dashboard.html',
            controller: 'DashboardController'
        })
        .otherwise({
            redirectTo: '/login'
        });
});