mainApp.service('NoteService', function (CaseService, PatientService) {
    var allNotes = [
        {
            id: "V001",
            caseId: "C001",
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
            caseId: "C002",
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
            caseId: "C003",
            billable: true,
            date: new Date('2015-10-03T06:00:05.000Z'),
            pain: {area: "Back", scale: 0},
            visitLocation: {id: "001", title: "Chicago-Portage Park"},
            patientMedicalId: "PM001",
            txAreas: []
        },
        {
            id: "V004",
            caseId: "C004",
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
    ];

    this.getReportItems = function (dateFrom, dateTo, locationId, patientId, caseId) {
        var reportItems = [];
        if (caseId) {
            //$scope.caseItems = CaseService.getAll
        } else if (patientId) {
            var patient = PatientService.getPatient(patientId);
            var patientCases = CaseService.getAllPatientCases(patientId);
            patientCases.forEach(function (patientCase, index) {
                var caseNotes = getNotesForCase(patientCase.id);
                caseNotes.forEach(function (note, index){
                    if ((note.date > dateFrom || dateFrom == null) && (note.date < dateTo || dateTo == null)) {
                        var reportItem = {};
                        reportItem.noteId = note.id;
                        reportItem.noteDate = note.date;
                        reportItem.caseId = patientCase.id;
                        reportItem.caseNum = patientCase.num;
                        reportItem.patientId = patient.id;
                        reportItem.patientName = patient.firstName + ", " + patient.lastName;
                        reportItems.push(reportItem);
                    }
                });

            });
        } else if (locationId) {
            var notes = this.getNotesForLocation(locationId);
            notes.forEach(function (note, index){
                var patientCase = CaseService.getPatientCase(note.caseId);
                var patient = PatientService.getPatient(patientCase.patientId);
                if ((note.date > dateFrom || dateFrom == null) && (note.date < dateTo || dateTo == null)) {
                    var reportItem = {};
                    reportItem.noteId = note.id;
                    reportItem.noteDate = note.date;
                    reportItem.caseId = patientCase.id;
                    reportItem.caseNum = patientCase.num;
                    reportItem.patientId = patient.id;
                    reportItem.patientName = patient.firstName + ", " + patient.lastName;
                    reportItems.push(reportItem);
                }
            })

        }
        return reportItems;
    };

    this.getNotesForLocation = function (locationId) {
        return allNotes;
    };

    getNotesForCase = function (caseId) {
        var notes = [];
        allNotes.forEach(function (note, index) {
            if (note.caseId == caseId) {
                notes.push(angular.copy(note));
            }
        });
        return notes;
    };

    this.getNotesForCase = function (caseId) {
        var notes = [];
        allNotes.forEach(function (note, index) {
            if (note.caseId == caseId) {
                notes.push(angular.copy(note));
            }
        });
        return notes;
    };

    this.saveNote = function (caseId, note) {
        if (note.id == null) {
            note.id = "C00" + allNotes.length + 1;
            note.caseId = caseId;
            allNotes.push(angular.copy(note));
        } else {
            var indx = null;
            allNotes.forEach(function (it, index) {
                if (it.id == note.id) {
                    indx = index;
                }
            });
            allNotes[indx] = angular.copy(note);
        }
        return note.id;
    }
    this.deleteNote = function (noteId) {
        allNotes.forEach(function (note, index) {
            if (note.id == noteId) {
                allNotes.splice(index, 1);
            }
        });
    }
    this.getNote = function (noteId) {
        var note = null;
        allNotes.forEach(function (it, index) {
            if (it.id == noteId) {
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

    this.getInitNote = function (caseId) {
        var note = null;
        var notes = this.getNotesForCase(caseId);
        if (notes != null && notes.length > 0) {
            note = notes[0];
        }
        return note;
    }

    this.getLastNote = function (caseId) {
        var note = null;
        var notes = this.getNotesForCase(caseId);
        if (notes) {
            note = notes[notes.length - 1];
        }
        return note;
    }

});