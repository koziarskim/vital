mainApp.service('UserContextService', function () {
    this.data = {
        uid: null,
        firstName: null,
        lastName: null,
        office: null,
        patientName: null,
        insuranceName: null,
        visitNum: null,
        authVisits: null,
        patientId: null,
        noteId: null,
        totalTxTime: null,
        totalMinCode: null

    }
    this.clearData = function () {
        this.data.uid = null;
        this.data.firstName = null;
        this.data.lastName = null;
        this.data.office = null;
        this.data.patientName = null;
        this.data.insuranceName = null;
        this.data.visitNum = null;
        this.data.authVisits = null;
        this.data.patientId = null;
        this.data.noteId = null;
        this.data.totalTxTime = null;
        this.data.totalMinCode = null;
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
                if (patient.notes == null) {
                    patient.notes = [];
                }
                if (patient.notes.length > 0) {
                    note.id = patient.notes.length + 1;
                    note.number = patient.notes.length + 1;
                } else {
                    note.id = 001;
                    note.number = 1;
                }
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
    this.deleteTxArea = function (patientId, noteId, txAreaName) {
        var note = this.getNote(patientId, noteId);
        note.txAreas.forEach(function (result, index) {
            if (result.name == txAreaName) {
                note.txAreas.splice(index, 1);
            }
        });
    }
    this.deleteModality = function (patientId, noteId, txAreaName, modalityId) {
        var txArea = this.getTxArea(patientId, noteId, txAreaName);
        txArea.modalities.forEach(function (result, index) {
            if (result['id'] == modalityId) {
                txArea.modalities.splice(index, 1);
            }
        });
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
    this.saveWc = function (patientId, noteId, txAreaName, wc) {
        var txArea = this.getTxArea(patientId, noteId, txAreaName);
        if (txArea == null) {
            txArea = this.saveTxArea(patientId, noteId, txAreaName);
        }
        txArea.wc = wc;
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
        txArea = {name: txAreaName, modalities: [], procedures: [], motions: []};
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
        var note = null;
        var notes = this.getAllNotes(patientId);
        if (notes != null && notes.length > 0) {
            note = notes[0];
        }
        return note;
    }

    this.getLastNote = function (patientId) {
        var notes = this.getAllNotes(patientId);
        if (notes == null) {
            var newNote = {
                id: null,
                number: 1,
                date: new Date(),
                pain: null,
                txAreas: []
            }
            this.saveNote(patientId, newNote);
        }
        notes = this.getAllNotes(patientId);
        var note = notes[notes.length - 1];
        return note;
    }
});

mainApp.service('PatientService', function () {
    var patients = [
        {
            id: "P001",
            firstName: 'Andrzej',
            lastName: 'Duda',
            dob: new Date('2015-11-03T06:00:00.000Z'),
            gender: 'male',
            insuranceName: 'BCBS',
            authVisits: 13,
            visitFrom: new Date('2015-01-03'),
            visitTo: new Date('2016-01-03'),
            dx: [
                {value: "33 and going up"},
                {value: "not sure"},
                {value: "very good"}
            ],
            visitNum: 10,
            totalTxTime: 12,
            totalMinCode: "DEC",
            requireAuth: true,
            locations: [
                {
                    id: "L001",
                    code: "PRG"
                },
                {
                    id: "L002",
                    code: "CHI"
                }
            ],
            vsBeforeTx: {
                bph: 70,
                bpl: 120,
                hr: 60,
                resp: 40
            },
            vsAfterTx: {
                bph: 70,
                bpl: 120,
                hr: 60,
                resp: 40
            },
            notes: [
                {
                    id: 1,
                    number: 1,
                    billable: true,
                    date: new Date('2010-10-03'),
                    pain: {area: "Back", scale: 2},
                    assessment: {
                        commentsOne: "comments one...",
                        commentsTwo: "comments two...",
                        commentsThree: "comments three..."
                    },
                    plan: {
                        commentsOne: "comments one...",
                        commentsTwo: "comments two..."
                    },
                    txAreas: [
                        {
                            name: "Back",
                            wc: {
                                normalPaceExFlag: false,
                                normalPaceExReson: null,
                                slowPaceExFlag: true,
                                slowPaceExReason: "very tired",
                                breaksFlag: true,
                                breaksMinutes: 12,
                                breaksReason: "tired as hell",
                                unableWorkFlag: false,
                                unableWorkReason: null,
                                stoppedWorkFlag: false,
                                stoppedWorkMinutes: 11,
                                stoppedWorkReason: null,
                                performanceComments: "Overall is doing OK",
                                observations: [
                                    {
                                        name: "Motivation",
                                        scaleCode: "POOR",
                                        comments: "doing very poor"
                                    },
                                    {
                                        name: "Consistency",
                                        scaleCode: "GOOD",
                                        comments: "doing good"
                                    }
                                ]
                            },
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
                            wc: {
                                normalPaceExFlag: false,
                                normalPaceExReson: null,
                                slowPaceExFlag: true,
                                slowPaceExReason: "very tired aa",
                                breaksFlag: true,
                                breaksMinutes: 12,
                                breaksReason: "tired as hell",
                                unableWorkFlag: false,
                                unableWorkReason: null,
                                stoppedWorkFlag: false,
                                stoppedWorkMinutes: 11,
                                stoppedWorkReason: null,
                                performanceComments: "Overall is doing OK",
                                observations: [
                                    {
                                        name: "Follow Direction",
                                        scaleCode: "GOOD",
                                        comments: "doing very good"
                                    },
                                    {
                                        name: "Cooperation",
                                        scaleCode: "FAIR",
                                        comments: "doing ok"
                                    }
                                ]
                            },
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
                    id: "P002",
                    number: 2,
                    billable: true,
                    date: new Date('2015-10-03'),
                    pain: {area: "Back", scale: 0},
                    assessment: {
                        commentsOne: "comments one...",
                        commentsTwo: "comments two...",
                        commentsThree: "comments three..."
                    },
                    plan: {
                        commentsOne: "comments one...",
                        commentsTwo: "comments two..."
                    },
                    vsBeforeTx: {
                        bph: 70,
                        bpl: 120,
                        hr: 60,
                        resp: 40
                    },
                    vsAfterTx: {
                        bph: 70,
                        bpl: 120,
                        hr: 60,
                        resp: 40
                    },
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
                    billable: true,
                    date: new Date('2015-10-03'),
                    pain: {area: "Back", scale: 0},
                    txAreas: []
                },
                {
                    id: 4,
                    number: 4,
                    billable: true,
                    date: new Date('2015-11-03'),
                    pain: {area: "Upper", scale: 10},
                    assessment: {
                        commentsOne: "comments one...",
                        commentsTwo: "comments two...",
                        commentsThree: "comments three..."
                    },
                    plan: {
                        commentsOne: "comments one...",
                        commentsTwo: "comments two..."
                    },
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
            id: "P003",
            firstName: 'Beata',
            lastName: 'Szydlo',
            dob: new Date('2015-11-03'),
            gender: "male",
            insuranceName: 'BCBS',
            authVisits: 1,
            visitFrom: null,
            visitTo: null,
            dx: [
                {value: "33 and going up"},
                {value: "not sure"},
                {value: "very good"}
            ],
            visitNum: null,
            totalTxTime: null,
            totalMinCode: null,
            vsBeforeTx: null,
            vsAfterTx: null,
            requireAuth: true,
            notes: [
                {
                    id: 1,
                    number: 1,
                    billable: true,
                    date: new Date('2010-10-03'),
                    pain: {area: "Back", scale: 2},
                    assessment: {
                        commentsOne: "comments one...",
                        commentsTwo: "comments two...",
                        commentsThree: "comments three..."
                    },
                    plan: {
                        commentsOne: "comments one...",
                        commentsTwo: "comments two..."
                    },
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
                    billable: true,
                    date: new Date('2015-10-03'),
                    pain: {area: "Back", scale: 0},
                    assessment: {
                        commentsOne: "comments one...",
                        commentsTwo: "comments two...",
                        commentsThree: "comments three..."
                    },
                    plan: {
                        commentsOne: "comments one...",
                        commentsTwo: "comments two..."
                    },
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
            dx: null,
            visitNum: null,
            totalTxTime: null,
            totalMinCode: null,
            requireAuth: false,
            notes: []
        }
    ];

    this.getPatientCases = function () {
        var patientDashboard = [
            {
                patientId: "P001",
                fName: "Andrzej",
                lName: "Duda",
                dob: new Date('2005-11-03'),
                caseId: "C001",
                caseNum: "CA001"
            },
            {
                patientId: "P001",
                fName: "Andrzej",
                lName: "Duda",
                dob: new Date('2005-11-03'),
                caseId: "C002",
                caseNum: "CA002"
            },
            {
                patientId: "P002",
                fName: "Beata",
                lName: "Szydlo",
                dob: new Date('2005-11-04'),
                caseId: "C003",
                caseNum: "CA003"
            },
            {
                patientId: "P002",
                fName: "Beata",
                lName: "Szydlo",
                dob: new Date('2005-11-04'),
                caseId: "C004",
                caseNum: "CA004"
            },
            {
                patientId: "P003",
                fName: "John",
                lName: "Smith",
                dob: new Date('2005-11-05'),
                caseId: "C005",
                caseNum: "CA005"
            }
        ];
        return patientDashboard;
    };

    this.getTotalVisits = function (patientId) {
        var patient = this.getPatient(patientId);
        return patient.notes.length;
    };
    this.getAllPatients = function () {
        return patients;
    };
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
        return patient;
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

mainApp.service('ProfileService', function () {
    var profiles = [
        {
            firstName: "Tom",
            lastName: "Kokocinski",
            uid: "tom",
            credentials: "PT, DPT, CFCE",
            password: "1234"
        },
        {
            firstName: "Marcin",
            lastName: "Koziarski",
            uid: "marcin",
            credentials: "Developer",
            password: "1234"
        },
        {
            firstName: "Joe",
            lastName: "Smith",
            uid: "joe",
            credentials: "PT",
            password: "1234"
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
})
;