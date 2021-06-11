export class WorkDay {                     //building a day

    constructor(obj) {
        this.date = obj.Date
        this.z = obj.z
        this.t = obj.t
        this.m_Ar = [ "January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.d_Ar = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        this.s_Ar = ["m", "a", "n"];
        this.ss_Ar = ["09:00", "17:00", "01:00"];
        //=====================================================================
        this.day_num = this._day_num();
        this.day_string = this._day_string();
        this.shift = this._shift();
        this.shift_start = this._shift_start();
    }

    _month() {
        let month = new Date(this.date);
        month = month.getMonth();
        return this.m_Ar[month];
    }

    _day_num() {
        let temp = this.date.split("-");
        return temp[2];
    }

    _day_string() {

        let day = new Date(this.date);
        day = day.getDay();
        return this.d_Ar[day];
    }

    _shift() {

        let temp = this.s_Ar[this.z - 1];

        if (this.t === 1) {
            temp = temp.toUpperCase();
            return temp;
        }
        else {
            return temp;
        }
    }

    _shift_start() {
        let temp = this.ss_Ar[this.z - 1];
        return temp;
    }

}