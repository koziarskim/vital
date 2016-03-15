mainApp.service('NoteService', function (CaseService, PatientService, ProfileService) {
    var allNotes = [
        {
            id: "V001",
            caseId: "C001",
            billable: true,
            date: new Date('2010-10-03T06:00:03.000Z'),
            pain: {
                area: {id: "001", title: "Back"},
                scale: 2
            },
            visitLocation: {id: "001", title: "Chicago-Portage Park"},
            patientMedicalId: "PM001",
            vitalSigns: {
                beforeTx: {
                    bpl: 80,
                    bph: 120,
                    hr: 60,
                    resp: 12
                },
                afterTx: {
                    bpl: 90,
                    bph: 150,
                    hr: 50,
                    resp: 11
                }
            },
            assessment: {
                commentsOne: "comments one...",
                commentsTwo: "comments two...",
                commentsThree: "comments three..."
            },
            plan: {
                commentsOne: "comments one...",
                commentsTwo: "comments two..."
            }
        },
        {
            id: "V002",
            caseId: "C002",
            billable: true,
            date: new Date('2015-10-03T06:00:04.000Z'),
            pain: {
                area: {id: "001", title: "Back"},
                scale: 2
            },            visitLocation: {id: "003", title: "Park Ridge"},
            patientMedicalId: "PM002",
            vitalSigns: {
                beforeTx: {
                    bpl: 80,
                    bph: 120,
                    hr: 60,
                    resp: 12
                },
                afterTx: {
                    bpl: 90,
                    bph: 150,
                    hr: 50,
                    resp: 11
                }
            },
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
            }
        },
        {
            id: "V003",
            caseId: "C003",
            billable: true,
            date: new Date('2015-10-03T06:00:05.000Z'),
            pain: {
                area: {id: "001", title: "Back"},
                scale: 2
            },            visitLocation: {id: "001", title: "Chicago-Portage Park"},
            patientMedicalId: "PM001",
            vitalSigns: {
                beforeTx: {
                    bpl: 80,
                    bph: 120,
                    hr: 60,
                    resp: 12
                },
                afterTx: {
                    bpl: 90,
                    bph: 150,
                    hr: 50,
                    resp: 11
                }
            }
        },
        {
            id: "V004",
            caseId: "C004",
            billable: true,
            date: new Date('2015-11-03T06:00:06.000Z'),
            pain: {
                area: {id: "001", title: "Back"},
                scale: 2
            },            visitLocation: {id: "003", title: "Park Ridge"},
            patientMedicalId: "PM001",
            vitalSigns: {
                beforeTx: {
                    bpl: 80,
                    bph: 120,
                    hr: 60,
                    resp: 12
                },
                afterTx: {
                    bpl: 90,
                    bph: 150,
                    hr: 50,
                    resp: 11
                }
            },
            assessment: {
                commentsOne: "comments one...",
                commentsTwo: "comments two...",
                commentsThree: "comments three..."
            },
            plan: {
                commentsOne: "comments one...",
                commentsTwo: "comments two..."
            }
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
            note.id = "C00" + (+allNotes.length + 1);
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

    this.getAvailablePainAreas = function(){
        var availablePainAreas = [
            {id: "001", title: "Back"},
            {id: "002", title: "Front"},
            {id: "003", title: "Bottom"},
            {id: "004", title: "Upper"}
        ];
        return availablePainAreas;
    }

    this.getNewNote = function(caseId, currentUid){
        var profile = ProfileService.getProfile(currentUid);
        var lastNote = this.getLastNote(caseId);
        var note = {};
        if (lastNote) {
            note = angular.copy(lastNote);
            note.id = null;
            note.caseId = caseId;
            note.billable = null;
            note.visitLocation = null;
        }
        note.date = new Date();
        note.therapistName = profile.firstName+" "+profile.lastName+", "+profile.credentials;
        note.coTherapistName = null;
        note.signDate = new Date();
        note.coSignDate = new Date();
        return note;
    }
});