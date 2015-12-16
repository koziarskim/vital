mainApp.service('UserContextService', function () {
    this.data = {
        firstName: null,
        lastName: null,
        office: null,
        patientName: null,
        noteDate: null
    }
});

mainApp.service('NoteService', function (PatientService) {
    this.getAllNotes = function (patientId) {
        var patient = PatientService.getPatient(patientId);
        return patient.notes;
    }
    this.saveNote = function (patientId, note) {
        var patient = PatientService.getPatient(patientId);
        if (note != null) {
            if (note.id == null) {
                note.id = patient.notes.length + 1;
                note.number = patient.notes.length + 1;
                patient.notes.push(note);
            } else {
                patient.notes.forEach(function (it, index) {
                    if (it.id == note.id) {
                        patient.notes[index] = it;
                    }
                });
            }

        }
        return note;
    }
    this.deleteNote = function (patientId, id) {
        var patient = PatientService.getPatient(patientId);
        patient.notes.forEach(function (result, index) {
            if (result['id'] == id) {
                patient.notes.splice(index, 1);
            }
        });
    }
    this.getNote = function (patientId, id) {
        var patient = PatientService.getPatient(patientId);
        var note = null;
        patient.notes.forEach(function (it, index) {
            if (it.id == id) {
                note = it;
            }
        });
        return note;
    }
    this.saveModality = function (patientId, noteId, txAreaName, modality) {
        var txArea = this.getTxArea(patientId, noteId, txAreaName);
        if (txArea == null) {
            txArea = this.saveTxArea(patientId, noteId, txAreaName);
        }
        if (modality.id == null) {
            modality.id = txArea.modalities.length + 1;
            txArea.modalities.push(modality);
        }
    }
    this.saveProcedure = function (patientId, noteId, txAreaName, procedure) {
        var txArea = this.getTxArea(patientId, noteId, txAreaName);
        if (txArea == null) {
            txArea = this.saveTxArea(patientId, noteId, txAreaName);
        }
        if (procedure.id == null) {
            procedure.id = txArea.procedures.length + 1;
            txArea.procedures.push(procedure);
        }
    }
    this.saveMotion = function (patientId, noteId, txAreaName, motion) {
        var txArea = this.getTxArea(patientId, noteId, txAreaName);
        if (txArea == null) {
            txArea = this.saveTxArea(patientId, noteId, txAreaName);
        }
        if (motion.id == null) {
            motion.id = txArea.motions.length + 1;
            txArea.motions.push(motion);
        }
    }

    this.saveTxArea = function (patientId, noteId, txAreaName) {
        var txArea = this.getTxArea(patientId, noteId, txAreaName);
        if (txArea != null) {
            console.log("TxArea already exist");
            return;
        }
        txArea = {name: txAreaName, modalities: [], procedures:[], motions:[]};
        var note = this.getNote(patientId, noteId);
        if (note == null) {
            console.log("Note not found");
            return;
        }
        note.txAreas.push(txArea);
        return txArea;
    }

    this.getTxArea = function (patientId, noteId, txAreaName) {
        var foundTxArea = null;
        var note = this.getNote(patientId, noteId);
        note.txAreas.forEach(function (txArea, index) {
            if (txArea.name == txAreaName) {
                foundTxArea = txArea;
            }
        });
        return foundTxArea;
    }
    this.getInitNote = function (patientId) {
        var notes = this.getAllNotes(patientId);
        var note = notes[0];
        return note;
    }

    this.getLastNote = function (patientId) {
        var notes = this.getAllNotes(patientId);
        var note = notes[notes.length - 1];
        return note;
    }
});

mainApp.service('PatientService', function () {
    var patients = [
        {
            id: 1,
            firstName: 'Andrzej',
            lastName: 'Duda',
            dob: new Date('2015-11-03T06:00:00.000Z'),
            gender: 'male',
            insuranceName: 'BCBS',
            authVisits: 1,
            visitFrom: null,
            visitTo: null,
            notes: [
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
                            }],
                            procedures: [{
                                id: "001",
                                code: "TXE",
                                name: "Stat. bike",
                                sets: 12,
                                reps: 2,
                                time: 15,
                                weight: 150,
                                comments: "Stretch"
                            }, {
                                id: "002",
                                code: "WC2",
                                name: "Knee Extens.",
                                sets: 12,
                                reps: 2,
                                time: 15,
                                weight: 150,
                                comments: "Stretch"
                            },
                            {
                                id: "003",
                                code: "WCA",
                                name: "SLR",
                                sets: 12,
                                reps: 2,
                                time: 15,
                                weight: 150,
                                comments: "Stretch"
                            }],
                            motions: [{
                                id: "001",
                                code: "RMT",
                                name: "Flexion",
                                arom: "text here...",
                                prom: "text here...",
                                mmt: "text here...",
                                promn: "text here...",
                                aromn: "text here..."
                            }, {
                                id: "002",
                                code: "Extension",
                                name: "EL. Stim v",
                                arom: "text here...",
                                prom: "text here...",
                                mmt: "text here...",
                                promn: "text here...",
                                aromn: "text here..."
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
                            }],
                            procedures: [],
                            motions: []
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
                            }],
                            procedures: [],
                            motions: []
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
                            }],
                            procedures: [],
                            motions: []
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            firstName: 'Beata',
            lastName: 'Szydlo',
            dob: new Date('2015-11-03'),
            gender: "male",
            insuranceName: 'BCBS',
            authVisits: 1,
            visitFrom: null,
            visitTo: null,
            notes: [
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
                            }],
                            procedures: [],
                            motions: []
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
                            }],
                            procedures: [],
                            motions: []
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
                            }],
                            procedures: [],
                            motions: []
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            firstName: 'Joe',
            lastName: 'Smith',
            dob: new Date('2005-11-03'),
            gender: "female",
            insuranceName: 'BCBS',
            authVisits: 1,
            visitFrom: null,
            visitTo: null,
            notes: []
        }
    ];
    this.getAllPatients = function () {
        return patients;
    }
    this.savePatient = function (patient) {
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

});