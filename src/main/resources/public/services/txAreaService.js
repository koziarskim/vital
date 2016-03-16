mainApp.service('TxAreaService', function () {

    var allTxAreas = [


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