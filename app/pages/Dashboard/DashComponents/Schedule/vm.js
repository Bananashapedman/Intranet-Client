import ko from 'knockout'
import template from "./view.html"
import { Work_Collection } from "./Work_Collection"
import { config } from "app/Helper"


class VM {

    constructor(params) {
        
       

        this.isWorking=ko.observable();
        this.isNotWorking=ko.observable();
        this.day_obj=ko.observable();
        
     
        
        this.shift_list=["Morning","Afternoon","Night"];
        this.workCollection = ko.observable();
        this.show_month = ko.observable();
        this.selected_day=ko.observable();
        this.selected_workday=ko.observable();
        this.selected_shift=ko.observable();
        this.endPoint = "https://thesis-api.azurewebsites.net/Thesis/GetProgram"; 
        this.endPoint_Change= "https://thesis-api.azurewebsites.net/Thesis/ChangeDayProgram";

        this._fetchProgram();

        //changing days
        //===============================================================

    }

    async _fetchChangeOFF(){
        debugger;
        let endPoint_Change=`${this.endPoint_Change}/${config.employee_id}/${this.day_obj().date}/${this.day_obj().z}/${this.day_obj().t}`;
        let response= await this._callFetchService(endPoint_Change);
        console.log(response);
        

    }

    async _fetchProgram(IsNext) {
        console.log(IsNext)
        //    let month_selection = IsNext ? config.current_Month : config.next_Month; 
        let month_selection = null;
        if (IsNext === false || IsNext === undefined) {
            month_selection = config.current_Month;
            this.show_month((config.display_month(month_selection-1)));

        }
        else {
            month_selection = config.next_Month;
            this.show_month((config.display_month(month_selection-1)));

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
        this.day_obj(day_obj);
          let date_current=new Date();

        if (Date.parse(date_current)<Date.parse(day_obj.date)) {
            
            let temp = day_obj.date.split("-");
            this.selected_day(temp[2]);
            this.selected_workday(day_obj);
            this.working(day_obj.t);
            this.selected_shift(day_obj.z);
            this.curtain_lift();
        }

        else {
            alert("Whoops, unfortunately you cannot change the past :'[");
        }
    }

    current_shift(){
        let list=["Morning","Afternoon","Night"];
        return list[this.selected_workday().z-1];
        
    }

    working(value){
        if (value==0){
            this.isWorking(false);
            this.isNotWorking(true);
        }

        else{
            this.isWorking(true);
            this.isNotWorking(false);
        }
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


    disableBTN(boolean){
       
         btn.target.classList.add('disabled');
    }

    
request_day_off(){
    
    this.day_obj().t=0;
    console.log(this.day_obj());
    //fetch kai ta resta
}

request_schedule_change(){
        const select= document.getElementById('shifts');
        this.day_obj().z=select.value;
        this.day_obj().t=1;
        console.log(this.day_obj().date);
        this._fetchChangeOFF();
    

}// trekse thn fetch
 


}



ko.components.register("dash-schedule", {

    viewModel: VM,
    template: template
})



