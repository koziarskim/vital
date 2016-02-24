mainApp.controller('NotesController', function ($scope, $location, $routeParams, $window, NoteService) {
    $scope.caseId = $routeParams.caseId;
    $scope.notes = NoteService.getNotesForCase($scope.caseId);

    $scope.dateRange = {
        from: null,
        to: null
    }

    $scope.cancelNotes = function () {
        $window.history.back();
    };
    $scope.editNote = function (noteId) {
        $location.path("/cases/" + $scope.caseId + "/notes/" + noteId);
    };

});