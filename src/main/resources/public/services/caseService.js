mainApp.service('CaseService', function (PatientService) {

    var allCases = [
        {
            patientId: "P001",
            id: "C001",
            num: "C001",
            dxs: [
                {name: "Upper shoulder"},
                {name: "Lower back"}
            ],
            discipline: "PT",
            discharged: false,
            evalDate: new Date('2005-11-03T06:00:10.000Z')
        },
        {
            patientId: "P002",
            id: "C002",
            num: "C002",
            dxs: [
                {name: "Knee Issue"},
                {name: "Lower back"}
            ],
            discipline: "PT",
            discharged: false,
            evalDate: new Date('2005-11-03T06:00:10.000Z')
        },
        {
            patientId: "P002",
            id: "C003",
            num: "C003",
            dxs: [
                {name: "Head injury"},
                {name: "Lower back"}
            ],
            discipline: "OT",
            discharged: true,
            evalDate: new Date('2005-11-03T06:00:10.000Z')
        },
        {
            patientId: "P003",
            id: "C004",
            num: "C004",
            dxs: [
                {name: "Finger issue"},
                {name: "Lower back"}
            ],
            discipline: "PT",
            discharged: false,
            evalDate: new Date('2005-11-03T06:00:10.000Z')
        },
        {
            patientId: "P003",
            id: "C005",
            num: "C005",
            dxs: [
                {name: "Hand issue"},
                {name: "Lower back"}
            ],
            discipline: "PT",
            discharged: false,
            evalDate: new Date('2005-11-03T06:00:10.000Z')
        },
        {
            patientId: "P003",
            id: "C006",
            num: "C006",
            dxs: [
                {name: "Leg issue"},
                {name: "Lower back"}
            ],
            discipline: "ST",
            discharged: false,
            evalDate: new Date('2005-11-03T06:00:10.000Z')
        }
    ];

    this.getPatientCase = function (patientId, caseId) {
        var patientCase = null;
        this.getAllPatientCases(patientId).forEach(function (it, index) {
            if (it.id == caseId) {
                patientCase = angular.copy(it);
            }
        });
        return patientCase;
    }

    this.getPatientCase = function (caseId) {
        var patientCase = null;
        allCases.forEach(function (it, index) {
            if (it.id == caseId) {
                patientCase = angular.copy(it);
            }
        });
        return patientCase;
    }

    this.savePatientCase = function (patientCase) {
        if (patientCase.id == null) {
            patientCase.id = "C00"+allCases.length + 1;
            if(patientCase.num == null){
                patientCase.num = patientCase.id;
            }
            allCases.push(angular.copy(patientCase));
        } else {
            var indx = null;
            allCases.forEach(function (it, index) {
                if (it.id == patientCase.id) {
                    indx = index;
                }
            });
            allCases[indx] = angular.copy(patientCase);
        }
        return patientCase.id;
    }

    this.getAllPatientCases = function (patientId) {
        var patientCases = [];
        allCases.forEach(function (it, index) {
            if (it.patientId == patientId) {
                var patient = PatientService.getPatient(it.patientId);
                it.patient = angular.merge(patient);
                patientCases.push(it);
            }
        });
        return patientCases;
    };

    this.deleteCase = function (caseId) {
        allCases.forEach(function (patientCase, index) {
            if (patientCase.id == caseId) {
                allCases.splice(index, 1);
            }
        });
    }
})
;