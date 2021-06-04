import ko from "knockout"
import template from "./view.html"


class VM{
    constructor(params){
        this._PageRoot=params;
        //=====================================================================
        this.username=ko.observable();
        this.password=ko.observable();
        this.emp_ID=ko.observable();

        this.ID=ko.observable();
        this.endPoint = "https://zeus.eaddon.local:9999/Thesis/GetProgram/1/2021/5";

    }


    async _login(un,ps) { 
        let request = "https://zeus.eaddon.local:9999/Thesis/Login"
        try {
            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },                
                body: JSON.stringify({un,ps})
            }
            let response = await fetch(request, options);
            if (response.ok) {
                let serviceData = await response.json();
                return serviceData;
            }
            else
                throw Error(response.statusText);
        } catch (e) {
            alert(e.message);
        }
    }

async _onLogin(){

    this.emp_ID= await this._login(this.username(),this.password());
    console.log(this.emp_ID);
    if (this.emp_ID!=null){
       this.navigateDashboard();
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