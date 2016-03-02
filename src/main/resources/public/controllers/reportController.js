mainApp.controller('ReportController', function ($scope, $location, CaseService, NoteService, PatientService, LocationService) {
    $scope.locationItem = null;
    $scope.locationItems = LocationService.getAvailableLocation();
    $scope.patientItem = {};
    $scope.patientItems = PatientService.getAllPatientItems();
    $scope.caseItem = null;
    $scope.caseItems = [{id: 'C001', name: 'C001'}, {id: 'C002', name: 'C002'}, {id: 'C003', name: 'C003'}];
    $scope.reportItems = [];

    $scope.dateRange = {
        from: null,
        to: null
    }

    $scope.filterDate = function (reportItem) {
        if ((reportItem.noteDate > $scope.dateRange.from || $scope.dateRange.from == null) && (reportItem.noteDate < $scope.dateRange.to || $scope.dateRange.to == null)) {
            return true;
        } else {
            return false;
        }
    };

    $scope.cancelReport = function () {
        $location.path("/search");
    };

    $scope.editNote = function (noteId) {
        $location.path("/notes/" + noteId);
    };

    $scope.viewReport = function () {
        var locationId = $scope.locationItem?$scope.locationItem.id:null;
        var patientId = $scope.patientItem?$scope.patientItem.id:null;
        var caseId = $scope.caseItem?$scope.caseItem.id:null;
        $scope.reportItems = NoteService.getReportItems($scope.dateRange.from, $scope.dateRange.to, locationId, patientId, caseId);
    };
});