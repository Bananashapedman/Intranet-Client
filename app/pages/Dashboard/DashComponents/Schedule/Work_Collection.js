import ko from "knockout";
import { WorkDay } from "./WorkDay"
// ============================================================================
export class Work_Collection {   //building whole month

    constructor(obj) {
        this.monthly_schedule = obj;
        this.work_list = ko.observableArray([]);   //binding list to HTML, fills after running the function
        this.cur_month = ko.observable();          //binding text to HTML, fills after running the function
    }

    get_month() {
        let month = new WorkDay(this.monthly_schedule[0]);
        month = month._month();
        this.cur_month(month);
        console.log(this.work_list());
    }

    build_Days() {
        debugger;
        let entries = [];
        for (let i = 0; i < this.monthly_schedule.length; i++) {
            entries.push( new WorkDay(this.monthly_schedule[i]));
        }
        this.work_list(entries);
    }
}



// [ 
    
//     {"Date": "2021-08-01", "z":2, "t":0 },
//     {"Date": "2021-08-02", "z":3, "t":1 },
//     {"Date": "2021-08-03", "z":3, "t":0 },
//     {"Date": "2021-08-04", "z":1, "t":0 },
//     {"Date": "2021-08-05", "z":1, "t":1 },
//     {"Date": "2021-08-06", "z":1, "t":0 },
//     {"Date": "2021-08-07", "z":2, "t":1 },
//     {"Date": "2021-08-08", "z":3, "t":0 },
//     {"Date": "2021-08-09", "z":1, "t":1 },
//     {"Date": "2021-08-10", "z":3, "t":0 },
//     {"Date": "2021-08-11", "z":1, "t":1 },
//     {"Date": "2021-08-12", "z":2, "t":1 },
//     {"Date": "2021-08-13", "z":1, "t":0 },
//     {"Date": "2021-08-14", "z":1, "t":1 },
//     {"Date": "2021-08-15", "z":1, "t":0 },
//     {"Date": "2021-08-16", "z":2, "t":0 },
//     {"Date": "2021-08-17", "z":2, "t":1 },
//     {"Date": "2021-08-18", "z":3, "t":1 },
//     {"Date": "2021-08-19", "z":2, "t":0 },
//     {"Date": "2021-08-20", "z":1, "t":1 },
//     {"Date": "2021-08-21", "z":3, "t":0 },
//     {"Date": "2021-08-22", "z":1, "t":0 },
//     {"Date": "2021-08-23", "z":3, "t":0 },
//     {"Date": "2021-08-24", "z":2, "t":1 },
//     {"Date": "2021-08-25", "z":2, "t":0 },
//     {"Date": "2021-08-26", "z":1, "t":1 },
//     {"Date": "2021-08-27", "z":1, "t":1 },
//     {"Date": "2021-08-28", "z":1, "t":0 },
//     {"Date": "2021-08-29", "z":2, "t":0 },
//     {"Date": "2021-08-30", "z":2, "t":1 },
//     {"Date": "2021-08-31", "z":1, "t":0 }
      
//   ]
  