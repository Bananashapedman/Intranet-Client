import ko from 'knockout'
import template from "./view.html"
import { Work_Collection } from "./Work_Collection"


class VM{

    constructor(params){
   
      

        this.endPoint = "https://zeus.eaddon.local:9999/Thesis/GetProgram/1/2021/5";

    
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

        
        this.workCollection = ko.observable();
        this._fetchProgram(); 
        
    }

    async _fetchProgram() {
       
       let response = await this._callFetchService(this.endPoint);
       let ar=JSON.parse(response[0].Program);
       this.workCollection(new Work_Collection(ar));
       this._adjustData();
   }   

   async _callFetchService(request) {
    try {
        let options = {
            method: "GET",
            credentials: "include",
            headers: {
                Authorization: "Basic " + btoa("user-esimis"+":"+"#esimis!123")
            }
        }
        let response = await fetch(request, options);
        if (response.ok) {
            let serviceData = await response.json();
            console.log(serviceData);
            return serviceData;
        }
        else
            throw Error(response.statusText);
    }
     catch (e) {
        alert(e.message);
    }
}



    _adjustData() {
        this.workCollection().build_Days();
        this.workCollection().get_month();
    }

    _fixedHeader(ele){
        
        var translate = "translate(0,"+ele.scrollTop+"px)";
        document.querySelector("thead").style.transform = translate;

    }
   
}


ko.components.register("dash-schedule",{
    
    viewModel:VM,
    template:template
})



