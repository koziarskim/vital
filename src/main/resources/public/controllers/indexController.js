mainApp.controller('IndexController', function ($scope, $window, $rootScope, $location) {
    $scope.$on('$viewContentLoaded', function () {
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    if($window.sessionStorage.userContext) {
        $rootScope.profile = JSON.parse($window.sessionStorage.userContext)
    }

});
