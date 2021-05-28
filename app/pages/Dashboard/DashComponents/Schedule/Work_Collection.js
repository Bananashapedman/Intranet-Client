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
    }

    build_Days() {
        let entries = [];
        for (let i = 0; i < this.monthly_schedule.length; i++) {
            entries.push( new WorkDay(this.monthly_schedule[i]));
        }
        this.work_list(entries);
    }
}