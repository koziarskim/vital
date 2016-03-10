mainApp.service('TxAreaService', function () {

    var allTxAreas = [
        {
            id: "TX001",
            noteId: "V001",
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
                name: "EL. Stim",
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
                arom: 2,
                prom: 2,
                mmt: 2,
                promn: 2,
                aromn: 2
            }, {
                id: "002",
                code: "Extension",
                name: "EL. Stim",
                arom: 1,
                prom: 2,
                mmt: 2,
                promn: 2,
                aromn: 2
            }]
        },
        {
            id: "TX002",
            noteId: "V001",
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
                name: "EL. Stim",
                time: 4,
                comments: "Repeat every monday"
            }],
            procedures: [],
            motions: []
        },
        {
            id: "TX003",
            noteId: "V002",
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
                name: "EL. Stim",
                time: 4,
                comments: "Repeat every monday"
            }],
            procedures: [],
            motions: []
        },
        {
            id: "TX004",
            noteId: "V002",
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
                name: "EL. Stim",
                time: 4,
                comments: "Repeat every monday"
            }],
            procedures: [],
            motions: []
        },
        {
            id: "TX005",
            noteId: "V003",
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
                name: "EL. Stim",
                time: 4,
                comments: "Repeat every monday"
            }],
            procedures: [],
            motions: []
        },
        {
            id: "TX006",
            noteId: "V004",
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
    ];

    this.getAvailableTxAreas = function(){
        var availableTxAreas = [
            {id: "001", title: "Back"},
            {id: "002", title: "Up"},
            {id: "003", title: "Front"},
            {id: "004", title: "Leg"}
        ];
        return availableTxAreas;

    }

    this.getAvailableTxAreaByName = function(name){
        var txArea = null;
        this.getAvailableTxAreas().forEach(function (it, index){
            if(it.title == name){
                txArea = angular.copy(it);
            }
        })
        return txArea;
    }

    this.getTxAreasForNote = function (noteId) {
        var txAreas = [];
        allTxAreas.forEach(function (txArea, index) {
            if (txArea.noteId == noteId) {
                txAreas.push(angular.copy(txArea));
            }
        });
        return txAreas;
    };

    this.getTxArea = function (txAreaId) {
        var txArea = null;
        allTxAreas.forEach(function (it, index) {
            if (it.id == txAreaId) {
                txArea = it;
            }
        });
        return txArea;
    }

    this.deleteTxArea = function (txAreaId) {
        allTxAreas.forEach(function (txArea, index) {
            if (txArea.id == txAreaId) {
                allTxAreas.splice(index, 1);
            }
        });
    }

    this.saveTxArea = function (txArea) {
        if(txArea.noteId == null){
            alert("noteId is null");
        }
        if (txArea.id == null) {
            txArea.id = "TX00" + (+allTxAreas.length + 1);
            allTxAreas.push(angular.copy(txArea));
        } else {
            var indx = null;
            allTxAreas.forEach(function (it, index) {
                if (it.id == txArea.id) {
                    indx = index;
                }
            });
            allTxAreas[indx] = angular.copy(txArea);
        }
        return txArea.id;
    }
});