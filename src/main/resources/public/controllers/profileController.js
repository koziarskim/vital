mainApp.controller('ProfileController', function ($scope, $location, $routeParams, ProfileService) {
    $scope.uid = $routeParams.uid;
    $scope.changePassword = false;
    $scope.verifyPassword = null;
    $scope.profile = ProfileService.getProfile($scope.uid);

    $scope.saveProfile = function (profile) {
        if ($scope.changePassword) {
            if (profile.password != $scope.verifyPassword) {
                alert("Password and Verify Password don't match");
                return;
            }
        }
        ProfileService.saveProfile(profile);
        $location.path("search/");
    }

    $scope.cancelProfile = function () {
        $location.path("/search");
    };
});