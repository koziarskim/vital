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
            pain: {area: "Back", scale: 2},
            txAreas: [
                {
                    name: "Back",
                    modalities: [{
                        id: "001",
                        code: "USA",
                        name: "US",
                        time: 12,
                        comments: "Stretch"
                    }, {
                        id: "002",
                        code: "ELS",
                        name: "EL. Stim v",
                        time: 4,
                        comments: "Repeat every monday"
                    }]
                },
                {
                    name: "Up",
                    modalities: [{
                        id: "003",
                        code: "USA",
                        name: "US",
                        time: 12,
                        comments: "Stretch"
                    }, {
                        id: "004",
                        code: "ELS",
                        name: "EL. Stim v",
                        time: 4,
                        comments: "Repeat every monday"
                    }]
                }
            ]
        },
        {
            id: 2,
            number: 2,
            date: new Date('2015-10-03'),
            pain: {area: "Back", scale: 0},
            txAreas: [
                {
                    name: "Leg",
                    modalities: [{
                        id: "005",
                        code: "USA",
                        name: "US",
                        time: 12,
                        comments: "Stretch"
                    }, {
                        id: "006",
                        code: "ELS",
                        name: "EL. Stim v",
                        time: 4,
                        comments: "Repeat every monday"
                    }]
                }
            ]
        },
        {
            id: 3,
            number: 3,
            date: new Date('2015-10-03'),
            pain: {area: "Back", scale: 0},
            txAreas: []
        },
        {
            id: 4,
            number: 4,
            date: new Date('2015-11-03'),
            pain: {area: "Upper", scale: 10},
            txAreas: [
                {
                    name: "Leg",
                    modalities: [{
                        id: "005",
                        code: "USA",
                        name: "US",
                        time: 12,
                        comments: "Stretch"
                    }]
                }
            ]
        }
    ];
    this.getAllNotes = function (patientId) {
        return notes;
    }
    this.saveNote = function (note) {
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
        return note;
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
    this.addModality = function (noteId, txAreaName, modality) {
        var txArea = this.getTxArea(noteId, txAreaName);
        if (txArea == null) {
            txArea = this.addTxArea(noteId, txAreaName);
        }
        if (modality.id == null) {
            modality.id = txArea.modalities.length + 1;
            txArea.modalities.push(modality);
        }
    }

    this.addTxArea = function (noteId, txAreaName){
        var txArea = this.getTxArea(noteId, txAreaName);
        if(txArea!=null){
            console.log("TxArea already exist");
            return;
        }
        txArea = {name: txAreaName, modalities: []};
        var note = this.getNote(noteId);
        if(note==null){
            console.log("Note not found");
            return;
        }
        note.txAreas.push(txArea);
        return txArea;
    }

    this.getTxArea = function (noteId, txAreaName) {
        var foundTxArea = null;
        var note = this.getNote(noteId);
        note.txAreas.forEach(function (txArea, index) {
            if (txArea.name == txAreaName) {
                foundTxArea = txArea;
            }
        });
        return foundTxArea;
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
    this.getInitNote = function (patientId) {
        var notes = NoteService.getAllNotes(patientId);
        var note = notes[0];
        return note;
    }

    this.getLastNote = function (patientId) {
        var notes = NoteService.getAllNotes(patientId);
        var note = notes[notes.length - 1];
        return note;
    }
});