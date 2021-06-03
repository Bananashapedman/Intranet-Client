import ko from "knockout"
import template from "./view.html"


class VM{
    constructor(params){
        this._PageRoot=params;
        //=====================================================================
        this.username=ko.observable();
        this.password=ko.observable();

        this.ID=ko.observable();
        this.endPoint = "https://zeus.eaddon.local:9999/Thesis/GetProgram/1/2021/5";

    }

   async _loginRequest(){
       try{
           let options={
               method: "GET",
               credentials:"include",
               headers:{
                   Authorization:"Basic "+ btoa(this.username+":"+this.password)
               }
           }

           let response= await fetch("https://zeus.eaddon.local:9999/Thesis/GetProgram/1/2021/5",options);

           if (response.ok){
               this.ID="accepted"; // response.custom me8odos
           }

           else {throw Error(response.statusText);}

       }
       catch(e){
           alert(e.message);
       }

    }

navigateDashboard(){

    this._PageRoot.currentPage('host-dashboard');

}

_onClickAction(){
    console.log('hello');
}
}


ko.components.register("host-login",{

    viewModel:VM,
    template:template
});