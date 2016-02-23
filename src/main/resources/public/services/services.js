mainApp.service('UserContextService', function ($window, $rootScope, ProfileService) {
});

mainApp.service('LocationService', function () {
    var availableLocations = [
        {id: "001", title: "Chicago-Portage Park"},
        {id: "002", title: "Chicago Pediatrics"},
        {id: "003", title: "Park Ridge"},
        {id: "004", title: "Schaumburg"},
        {id: "005", title: "Chicago/Thorek Hospital"}
    ];
    this.getAvailableLocation = function () {
        return availableLocations;
    }
});

mainApp.service('StorageService', function ($window) {

    var availableLocations = [
        {id: "001", title: "Chicago-Portage Park"},
        {id: "002", title: "Chicago Pediatrics"},
        {id: "003", title: "Park Ridge"},
        {id: "004", title: "Schaumburg"},
        {id: "005", title: "Chicago/Thorek Hospital"}
    ];
    this.getAvailableLocation = function () {
        return availableLocations;
    }
});