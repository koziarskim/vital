mainApp.service('UserContextService', function ($window, $rootScope, ProfileService) {


});

mainApp.service('NoteService', function (PatientService) {
    this.getAllNotes = function (patientId) {
        var patient = PatientService.getPatient(patientId);
        if(patient) {
            return patient.notes;
        }
        return null;
    }
    this.saveNote = function (patientId, note) {
        var patient = PatientService.getPatient(patientId);
        if (patient && note != null) {
            if (note.id == null) {
                if (patient.notes == null) {
                    patient.notes = [];
                }
                if (patient.notes.length > 0) {
                    note.id = patient.notes.length + 1;
                } else {
                    note.id = 001;
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
        if(patient) {
            patient.notes.forEach(function (it, index) {
                if (it.id == id) {
                    note = it;
                }
            });
        }
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
        var note = null;
        var notes = this.getAllNotes(patientId);
        if (notes == null) {
            var newNote = {
                id: null,
                date: new Date(),
                pain: null,
                txAreas: []
            }
            this.saveNote(patientId, newNote);
        }
        notes = this.getAllNotes(patientId);
        if(notes){
            note = notes[notes.length - 1];
        }
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
            insuranceName: "BCBC",
            medicareFlag: true,
            authVisits: 13,
            visitNum: 12,
            visitFrom: new Date('2015-01-03T06:00:01.000Z'),
            visitTo: new Date('2016-01-03T06:00:02.000Z'),
            caseId: "C001",
            dx: "33 and going up, not sure, very good",
            totalTxTime: 12,
            totalMinCode: "DEC",
            requireAuth: true,
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
                    id: "V001",
                    billable: true,
                    date: new Date('2010-10-03T06:00:03.000Z'),
                    pain: {area: "Back", scale: 2},
                    visitLocation: {id: "001", title: "Chicago-Portage Park"},
                    patientMedicalId: "PM001",
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
                    id: "V002",
                    billable: true,
                    date: new Date('2015-10-03T06:00:04.000Z'),
                    pain: {area: "Back", scale: 0},
                    visitLocation: {id: "003", title: "Park Ridge"},
                    patientMedicalId: "PM002",
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
                    id: "V003",
                    billable: true,
                    date: new Date('2015-10-03T06:00:05.000Z'),
                    pain: {area: "Back", scale: 0},
                    visitLocation: {id: "001", title: "Chicago-Portage Park"},
                    patientMedicalId: "PM001",
                    txAreas: []
                },
                {
                    id: "V004",
                    billable: true,
                    date: new Date('2015-11-03T06:00:06.000Z'),
                    pain: {area: "Upper", scale: 10},
                    visitLocation: {id: "003", title: "Park Ridge"},
                    patientMedicalId: "PM001",
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
            id: "P002",
            firstName: 'Beata',
            lastName: 'Szydlo',
            dob: new Date('2015-11-03T06:00:07.000Z'),
            gender: "male",
            insuranceName: "Aetna",
            medicareFlag: false,
            authVisits: 1,
            visitNum: 10,
            visitFrom: null,
            visitTo: null,
            dx: "33 and going up, not sure, very good",
            totalTxTime: null,
            totalMinCode: null,
            vsBeforeTx: null,
            vsAfterTx: null,
            requireAuth: true,
            notes: [
                {
                    id: "V001",
                    billable: true,
                    date: new Date('2010-10-03T06:00:08.000Z'),
                    pain: {area: "Back", scale: 2},
                    visitLocation: {id: "001", title: "Chicago-Portage Park"},
                    patientMedicalId: "PM003",
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
                    id: "V002",
                    billable: true,
                    date: new Date('2015-10-03T06:00:09.000Z'),
                    pain: {area: "Back", scale: 0},
                    visitLocation: {id: "001", title: "Chicago-Portage Park"},
                    patientMedicalId: "PM003",
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
            id: "P003",
            firstName: 'Joe',
            lastName: 'Smith',
            dob: new Date('2005-11-03T06:00:10.000Z'),
            gender: "female",
            insuranceName: "BCBC",
            medicareFlag: null,
            authVisits: 1,
            visitNum: 1,
            visitFrom: null,
            visitTo: null,
            dx: null,
            totalTxTime: null,
            totalMinCode: null,
            requireAuth: false,
            notes: []
        }
    ];

    this.patientMedicalRecords = [
        {
            id: "PM001",
            patientId: "P001",
            insuranceName: "BCBS",
            medicareFlag: false
        },
        {
            id: "PM002",
            patientId: "P002",
            insuranceName: "Aetna",
            medicareFlag: false
        },
        {
            id: "PM003",
            patientId: "P003",
            insuranceName: "BCBS",
            medicareFlag: false
        }
    ]

    this.getPatientMedical = function (patientMedicalId) {
        var patientMedical = null;
        this.patientMedicalRecords.forEach(function (it) {
            if (it.id == patientMedicalId) {
                patientMedical = angular.copy(it);
            }
        });
        return patientMedical;
    };

    this.savePatientMedical = function (patientMedical) {
        if (patientMedical.id == null) {
            patientMedical.id = patientMedicalRecords.length + 1;
            this.patientMedicalRecords.push(angular.copy(patientMedical));
        } else {
            var indx = null;
            this.patientMedicalRecords.forEach(function (it, index) {
                if (it.id == patientMedical.id) {
                    indx = index;
                }
            });
            this.patientMedicalRecords[indx] = angular.copy(patientMedical);
        }

    }

    this.getPatientCase = function(patientId, caseId){
        var patientCase = null;
        this.getAllPatientCases(patientId).forEach(function (it, index) {
            if (it.id == caseId) {
                patientCase = angular.copy(it);
            }
        });
        return patientCase;
    }

    this.savePatientCase = function (patientCase) {
        if (patientCase.id == null) {
            patientCase.id = this.allCases.length + 1;
            this.allCases.push(angular.copy(patientCase));
        } else {
            var indx = null;
            this.allCases.forEach(function (it, index) {
                if (it.id == patientCase.id) {
                    indx = index;
                }
            });
            this.allCases[indx] = angular.copy(patientCase);
        }

    }

    this.allCases = [

        {
            patientId: "P001",
            id: "C001",
            num: "C001",
            desc: "Upper shoulder",
            discipline: "PT",
            status: "ACT",
            evalDate: new Date('2005-11-03T06:00:10.000Z')
        },

        {
            patientId: "P002",
            id: "C002",
            num: "C002",
            desc: "Upper shoulder",
            discipline: "PT",
            status: "ACT",
            evalDate: new Date('2005-11-03T06:00:10.000Z')
        },
        {
            patientId: "P002",
            id: "C003",
            num: "C003",
            desc: "Knew issue",
            discipline: "OT",
            status: "ACT",
            evalDate: new Date('2005-11-03T06:00:10.000Z')
        },
        {
            patientId: "P003",
            id: "C004",
            num: "C004",
            desc: "Back pain, Head injury",
            discipline: "PT",
            status: "ACT",
            evalDate: new Date('2005-11-03T06:00:10.000Z')
        },
        {
            patientId: "P003",
            id: "C005",
            num: "C005",
            desc: "Shoulder pain",
            discipline: "PT",
            status: "CSD",
            evalDate: new Date('2005-11-03T06:00:10.000Z')
        },
        {
            patientId: "P003",
            id: "C006",
            num: "C006",
            desc: "Leg injury",
            discipline: "ST",
            status: "CSD",
            evalDate: new Date('2005-11-03T06:00:10.000Z')
        }

    ];

    this.getAllPatientCases = function (patientId) {
        var patientCases = [];
        this.allCases.forEach(function (it, index) {
            if (it.patientId == patientId) {
                patientCases.push(it);
            }
        });
        return patientCases;
    };

    this.getTotalVisits = function (patientId, date) {
        var count = 0;
        var patient = this.getPatient(patientId);
        if (date) {
            patient.notes.forEach(function (it, index) {
                if (it.date <= date) {
                    count++
                }
            });
        } else {
            count = patient.notes.length;
        }
        return count;
    };

    this.getAllPatients = function () {
        return patients;
    };

    this.getAllPatientItems = function () {
        var patientItems = [];
        patients.forEach(function(it, index){
            patientItems.push({id: it.id, name: it.firstName+" "+it.lastName})
        });
        return patientItems;
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

})
;

mainApp.service('ProfileService', function () {
    var profiles = [
        {
            id:"P001",
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
            id:"P002",
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
            id:"P003",
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
            id:"P004",
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