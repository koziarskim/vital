mainApp.service('ProfileService', function () {
    var allProfiles = [
        {
            id: "P001",
            firstName: "Tom",
            lastName: "Kokocinski",
            uid: "tom",
            credentials: "PT, DPT, CFCE",
            password: "1234",
            isAdmin: true,
            discipline: "PT"
        },
        {
            id: "P002",
            firstName: "Marcin",
            lastName: "Koziarski",
            uid: "marcin",
            credentials: "Developer",
            password: "1234",
            isAdmin: false,
            discipline: "PT"
        },
        {
            id: "P003",
            firstName: "Joe",
            lastName: "Smith",
            uid: "joe",
            credentials: "PT",
            password: "1234",
            isAdmin: false,
            discipline: "OT"
        },
        {
            id: "P004",
            firstName: "Greg",
            lastName: "Johnson",
            uid: "greg",
            credentials: "PT",
            password: "1234",
            isAdmin: false,
            discipline: "ST"
        }
    ]
    this.getAllProfiles = function () {
        return allProfiles;
    }

    this.getAvailableProfileNames = function(){
        var names = [];
        allProfiles.forEach(function(profile){
            var name = {}
            name.id= profile.id;
            name.title = profile.firstName+" "+profile.lastName+", "+profile.credentials;
            names.push(name);
        })
        return names;
    }
    this.saveProfile = function (profile) {
        if (profile == null) {
            return;
        }
        var newProfile = true;
        allProfiles.forEach(function (it, index) {
            if (it.uid == profile.uid) {
                allProfiles[index] = profile;
                newProfile = false;
            }
        });
        if (newProfile) {
            allProfiles.push(profile);
        }
        return profile;
    }
    this.getProfile = function (uid) {
        var profile = null;
        allProfiles.forEach(function (it, index) {
            if (it.uid == uid) {
                profile = it;
            }
        });
        return profile;
    }
    this.validateUser = function (uid, password) {
        var profile = this.getProfile(uid);
        if (profile == null) {
            return false;
        }
        //TODO: Need to call server to validate password;
        if (password == "1234") {
            return true;
        }
    }
});