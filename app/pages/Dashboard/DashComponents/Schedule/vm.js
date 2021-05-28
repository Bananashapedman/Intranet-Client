import ko from 'knockout'
import template from "./view.html"
import { Work_Collection } from "./Work_Collection"


class VM{

    constructor(params){
   

        this.ar = [
            { "Date": "2021-05-01", "z": 1, "t": 1 },
            { "Date": "2021-05-02", "z": 1, "t": 1 },
            { "Date": "2021-05-03", "z": 1, "t": 1 },
            { "Date": "2021-05-04", "z": 1, "t": 0 },
            { "Date": "2021-05-05", "z": 1, "t": 0 },
            { "Date": "2021-05-06", "z": 1, "t": 1 },
            { "Date": "2021-05-07", "z": 2, "t": 1 },
            { "Date": "2021-05-08", "z": 2, "t": 1 },
            { "Date": "2021-05-09", "z": 2, "t": 1 },
            { "Date": "2021-05-10", "z": 3, "t": 0 },
            { "Date": "2021-05-11", "z": 3, "t": 1 },
            { "Date": "2021-05-12", "z": 3, "t": 1 },
            { "Date": "2021-05-05", "z": 1, "t": 0 },
            { "Date": "2021-05-06", "z": 1, "t": 1 },
            { "Date": "2021-05-07", "z": 2, "t": 1 },
            { "Date": "2021-05-08", "z": 2, "t": 1 },
            { "Date": "2021-05-09", "z": 2, "t": 1 },
            { "Date": "2021-05-10", "z": 3, "t": 0 },
            { "Date": "2021-05-11", "z": 3, "t": 1 },
            { "Date": "2021-05-12", "z": 3, "t": 1 }
        ];

        this.workCollection = new Work_Collection(this.ar);
        this._adjustData();
    }


    _adjustData() {
        this.workCollection.build_Days();
        this.workCollection.get_month();
    }



}


ko.components.register("dash-schedule",{
    
    viewModel:VM,
    template:template
})
