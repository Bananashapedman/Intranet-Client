import ko from 'knockout'
import template from "./view.html"
import { Work_Collection } from "./Work_Collection"
import { config } from "app/Helper"


class VM {

    constructor(params) {

        this.workCollection = ko.observable();
        this.show_month = ko.observable();
        this.endPoint = "https://zeus.eaddon.local:9999/Thesis/GetProgram";

        this._fetchProgram();

        //changing days
        //===============================================================



    }

    async _fetchProgram(IsNext) {
        console.log(IsNext)
        //    let month_selection = IsNext ? config.current_Month : config.next_Month; 
        let month_selection = null;
        if (IsNext === false || IsNext === undefined) {
            month_selection = config.current_Month;
            this.show_month((config.display_month(month_selection)));

        }
        else {
            month_selection = config.next_Month;
            this.show_month((config.display_month(month_selection)));

        }

        console.log(month_selection);
        let endPoint = `${this.endPoint}/${config.employee_id}/${config.current_Year}/${month_selection}`
        let response = await this._callFetchService(endPoint);
        let ar = JSON.parse(response[0].Program);
        this.workCollection(new Work_Collection(ar));
        this._adjustData();
        config.pick_Face();  // weird position but okay!
    }

    async _callFetchService(request) {
        try {
            let options = {
                method: "GET",
                credentials: "include",
                headers: {
                    Authorization: "Basic " + btoa(config.user_id + ":" + config.user_pwd)
                }
            }
            let response = await fetch(request, options);
            if (response.ok) {
                let serviceData = await response.json();
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

    _fixedHeader(ele) {

        var translate = "translate(0," + ele.scrollTop + "px)";
        document.querySelector("thead").style.transform = translate;

    }


    _logOut() {
        alert('logouts');
    }

    //===============================================================================
    //handling schedule changes

    grab_day(day_obj) {
          let date_current=new Date();
          console.log(Date.parse(date_current));
          console.log(Date.parse(day_obj.date));
        // if (this.exclude_previous_days(day_obj.date) == true) {
        //     alert('ok');
        // }

        // else {
        //     alert("Hey!! You can't do that!!");
        // }
    }


    exclude_previous_days(date_selected) {
      
        // let date_current = new Date();
        // if (date_selected.valueOf() <= date_current.valueOf()) {
        //     return false;
        // }
        // else {
        //     return true;
        // }
    }


    curtain_drop(){
       
        document.getElementById('curtain').classList.add('hide-curtain');
    }
    curtain_lift(){
        document.getElementById('curtain').classList.remove('hide-curtain');
    }
    kill_Prop(e){
        e.stopPropagation();

    }

    reveal_shift(){
        document.getElementById('hidden-shifts').classList.toggle('hidden-shifts');
        
    }

}



ko.components.register("dash-schedule", {

    viewModel: VM,
    template: template
})



