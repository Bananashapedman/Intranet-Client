import ko from 'knockout'
import template from "./view.html"
import { Work_Collection } from "./Work_Collection"
import { config } from "app/Helper"
import $ from "jQuery"


class VM {

    constructor(params) {
        this.printDiv=null;       
        this.curDate=new Date();

        this.isWorking=ko.observable();
        this.isNotWorking=ko.observable();
        this.curtain_table=ko.observable(false);
        this.day_obj=ko.observable();
        //===============================================================            
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

    //changing shift on ANY day
    async _fetchChangeShift(condition){
       
        let month=this.day_obj().date;
        month= month.split("-");
        
        let endPoint_Change=null;

        if (condition==true){
           endPoint_Change=`${this.endPoint_Change}/${config.employee_id}/${this.day_obj().date}/${this.day_obj().z}/${0}`;
        }
        else{

           endPoint_Change=`${this.endPoint_Change}/${config.employee_id}/${this.day_obj().date}/${this.day_obj().z}/${1}`;

        }

        await this._callFetchService(endPoint_Change,false);
    
        if (this.curDate.getMonth()==month[1]-1){
              this._fetchProgram(false);
       }

        else{
            this._fetchProgram(true);
        }
    }

    
        //requesting a day off
  async _fetchDayOff(){

    let endPoint_Change=`${this.endPoint_Change}/${config.employee_id}/${this.day_obj().date}/${this.day_obj().z}/${0}`;

    await this._callFetchService(endPoint_Change,false);

    if (this.curDate.getMonth()==month){
                this._fetchProgram(false);
    }
    else{
        this._fetchProgram(true);
    }

  }





    async _fetchProgram(IsNext) {
        this.curtain_table(true);
                
        let month_selection = null;
        if (IsNext === false || IsNext === undefined) {
            month_selection = config.current_Month;
            this.show_month((config.display_month(month_selection-1)));
        }
        else {
            month_selection = config.next_Month;
            this.show_month((config.display_month(month_selection-1)));
        }

        let endPoint = `${this.endPoint}/${config.employee_id}/${config.current_Year}/${month_selection}`
        let response = await this._callFetchService(endPoint,true);
        let ar = JSON.parse(response[0].Program);
        this.workCollection(new Work_Collection(ar));
        this._adjustData();
        config.pick_Face();  // weird position but okay!
    }

    async _callFetchService(request, isJSON) {
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
                if (isJSON){
                    let serviceData = await response.json();
                    this.curtain_table(false);
                    return serviceData;
                }
                        }
            else
                throw Error(response.statusText);
        }
        catch (e) {
            this.curtain_table(false);
            console.log(e.message);
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

    _fixedCurtain(ele,e){
        var translate = "translate(0," + ele.scrollTop + "px)";
        document.getElementById("curtain-table").style.transform = translate;
     }

    _fixedElements(ele){
        this._fixedHeader(ele);
        this._fixedCurtain(ele);
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
 
request_schedule_change(condition, trigger){
        console.log(trigger);
        const select= document.getElementById('shifts');
        this.day_obj().z=select.value;
        this.day_obj().t=1;
        this._fetchChangeShift(condition);
        this.curtain_drop();
 }

//=========================================================================
//styling components

curtain_drop(){
       
    document.getElementById('curtain').classList.add('hide-curtain');
} 
curtain_lift(){
    document.getElementById('curtain').classList.remove('hide-curtain');
}
kill_Prop(e){
    e.stopPropagation();

}

//============================================================================
//html print handling


startWatching(element){
    this.printDiv=element;
}

print() {
    let $ph = $("#printingHost");
    $ph.html("");
    let _html = $(this.printDiv).html();
    $ph.html(_html);
    setTimeout(window.print, 333);
}



}



ko.components.register("dash-schedule", {

    viewModel: VM,
    template: template


})





