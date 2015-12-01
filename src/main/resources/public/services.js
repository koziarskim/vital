
mainApp.service('UserContextService', function () {
    this.data = {
        firstName: null,
        lastName: null,
        office: null
    }
});

mainApp.service('NoteService', function () {
    var notes = [
        {
            id: 1,
            number: 1,
            date: new Date('2010-10-03'),
            pain: {area:"Back", scale: 2},
            modalities: [{
                id: "USA",
                name: "US",
                time: 12,
                comments: "Stretch"
            }, {
                id: "ELS",
                name: "EL. Stim v",
                time: 4,
                comments: "Repeat every monday"
            }]
        },
        {
            id: 2,
            number: 2,
            date: new Date('2014-10-03'),
            pain: {area:"Front", scale: 1},
            modalities: [{
                id: "USA",
                name: "US",
                time: 12,
                comments: "Stretch"
            }, {
                id: "ELS",
                name: "EL. Stim v",
                time: 4,
                comments: "Repeat every monday"
            }]
        }, {
            id: 3,
            number: 3,
            date: new Date('2015-10-03'),
            pain: {area:"Back", scale: 0},
            modalities: []
        }, {
            id: 4,
            number: 4,
            date: new Date('2015-11-03'),
            pain: {area:"Upper", scale: 10},
            modalities: []
        },
    ];
    this.getAllNotes = function (patientId) {
        return notes;
    }
    this.addNote = function (note) {
        if (note != null) {
            if (note.id == null) {
                note.id = notes.length + 1;
                note.number = notes.length + 1;
                notes.push(note);
            } else {
                notes.forEach(function (it, index) {
                    if (it.id == note.id) {
                        notes[index] = it;
                    }
                });
            }

        }
    }
    this.deleteNote = function (id) {
        notes.forEach(function (result, index) {
            if (result['id'] == id) {
                notes.splice(index, 1);
            }
        });
    }
    this.getNote = function (id) {
        var note = null;
        notes.forEach(function (it, index) {
            if (it.id == id) {
                note = it;
            }
        });
        return note;
    }
});

mainApp.service('PatientService', function (NoteService) {
    var patients = [
        {
            id: 1,
            firstName: 'Tom',
            lastName: 'Kokocinski',
            dob: new Date('2015-11-03T06:00:00.000Z'),
            gender: 'male',
            insuranceName: 'BCBS',
            authVisits: 1,
            visitFrom: null,
            visitTo: null
        },
        {
            id: 2,
            firstName: 'Marcin',
            lastName: 'Koziarski',
            dob: new Date('2015-11-03'),
            gender: "male",
            insuranceName: 'BCBS',
            authVisits: 1,
            visitFrom: null,
            visitTo: null
        },
        {
            id: 2,
            firstName: 'Joe',
            lastName: 'Smith',
            dob: new Date('2005-11-03'),
            gender: "female",
            insuranceName: 'BCBS',
            authVisits: 1,
            visitFrom: null,
            visitTo: null
        }
    ];
    this.getAllPatients = function () {
        return patients;
    }
    this.addNewPatient = function (patient) {
        if (patient != null) {
            if (patient.id == null) {
                patient.id = patients.length + 1;
                patients.push(patient);
            } else {
                patients.forEach(function (it, index) {
                    if (it.id == patient.id) {
                        patients[index] = it;
                    }
                });
            }

        }
    }
    this.deletePatient = function (id) {
        patients.forEach(function (result, index) {
            if (result['id'] == id) {
                patients.splice(index, 1);
            }
        });
    }
    this.getPatient = function (id) {
        var patient = null;
        patients.forEach(function (it, index) {
            if (it.id == id) {
                patient = it;
            }
        });
        return patient;
    }
    this.getInitNote = function(patientId){
        var notes = NoteService.getAllNotes(patientId);
        var note = notes[0];
        return note;
    }

    this.getLastNote = function(patientId){
        var notes = NoteService.getAllNotes(patientId);
        var note = notes[notes.length-1];
        return note;
    }
});