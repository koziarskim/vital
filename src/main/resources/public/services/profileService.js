mainApp.service('ProfileService', function () {
    var profiles = [
        {
            id: "P001",
            firstName: "Tom",
            lastName: "Kokocinski",
            uid: "tom",
            credentials: "PT, DPT, CFCE",
            password: "1234",
            roles: {
                admin: true,
                billing: true
            },
            discipline: "PT"
        },
        {
            id: "P002",
            firstName: "Marcin",
            lastName: "Koziarski",
            uid: "marcin",
            credentials: "Developer",
            password: "1234",
            roles: {
                admin: true,
                billing: true
            },
            discipline: "OT"
        },
        {
            id: "P003",
            firstName: "Joe",
            lastName: "Smith",
            uid: "joe",
            credentials: "PT",
            password: "1234",
            roles: {
                admin: false,
                billing: true
            },
            discipline: "ST"
        },
        {
            id: "P004",
            firstName: "Greg",
            lastName: "Johnson",
            uid: "greg",
            credentials: "PT",
            password: "1234",
            roles: {
                admin: false,
                billing: false
            },
            discipline: "PT"
        }
    ]
    this.getAllProfiles = function () {
        return profiles;
    }
    this.saveProfile = function (profile) {
        if (profile == null) {
            return;
        }
        var newProfile = true;
        profiles.forEach(function (it, index) {
            if (it.uid == profile.uid) {
                profiles[index] = profile;
                newProfile = false;
            }
        });
        if (newProfile) {
            profiles.push(profile);
        }
        return profile;
    }
    this.getProfile = function (uid) {
        var profile = null;
        profiles.forEach(function (it, index) {
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