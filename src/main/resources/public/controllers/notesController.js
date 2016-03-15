mainApp.controller('NotesController', function ($scope, $timeout, $location, $routeParams, $window, NoteService) {
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
    $scope.deleteNote = function (noteId) {
        bootbox.confirm("Are you sure you want to delete the note permanently?", function(result) {
            if(result){
                $timeout(function() {
                    NoteService.deleteNote(noteId);
                    $scope.notes = NoteService.getNotesForCase($scope.caseId);
                }, 500);
            }
        });
    };
});