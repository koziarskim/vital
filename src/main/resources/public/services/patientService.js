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
        var localPatients = [];
        patients.forEach(function(it, index){
            localPatients.push(angular.copy(it))
        })
        return localPatients;
    };

    this.getAllPatientItems = function () {
        var patientItems = [];
        patients.forEach(function (it, index) {
            patientItems.push({id: it.id, name: it.firstName + " " + it.lastName})
        });
        return patientItems;
    };

    this.savePatient = function (patient) {
        if (patient != null) {
            if (patient.id == null) {
                patient.id = "P00"+patients.length + 1;
                patients.push(patient);
            } else {
                patients.forEach(function (it, index) {
                    if (it.id == patient.id) {
                        patients[index] = it;
                    }
                });
            }
        }
        return patient.id;
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
