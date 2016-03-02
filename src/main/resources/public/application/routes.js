mainApp.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController'
        })
        .when('/cases/:caseId', {
            templateUrl: 'case.html',
            controller: 'CaseController'
        })
        .when('/cases/:caseId/patient/:patientId', {
            templateUrl: 'case.html',
            controller: 'CaseController'
        })
        .when('/patients/:patientId/notes/:noteId', {
            templateUrl: 'note.html',
            controller: 'NoteController'
        })
        .when('/cases/:caseId/notes/:noteId', {
            templateUrl: 'note.html',
            controller: 'NoteController'
        })
        .when('/notes/:noteId', {
            templateUrl: 'note.html',
            controller: 'NoteController'
        })
        .when('/cases/:caseId/notes', {
            templateUrl: 'notes.html',
            controller: 'NotesController'
        })
        .when('/profiles/:uid?', {
            templateUrl: 'profile.html',
            controller: 'ProfileController'
        })
        .when('/search', {
            templateUrl: 'search.html',
            controller: 'SearchController'
        })
        .when('/report', {
            templateUrl: 'report.html',
            controller: 'ReportController'
        })
        .otherwise({
            redirectTo: '/login'
        });
});