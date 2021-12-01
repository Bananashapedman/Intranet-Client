import ko from "knockout"
import { config } from "app/Helper"
import template from "./view.html"


class VM {
    constructor(params) {
        this._PageRoot = params;
        //=====================================================================
        this.showLoader = ko.observable(false);
        //=====================================================================
        this.username = ko.observable();
        this.password = ko.observable();
        this.emp_ID = ko.observable();
        this.ID = ko.observable();
    }
     //=========================================================================
    
    async _login(un, ps) {
        let request = "https://thesis-api.azurewebsites.net/Thesis/Login"
        try {
            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ un, ps })
            }
            let response = await fetch(request, options);
            if (response.ok) {
                let serviceData = await response.json();
                return serviceData;
            }
            else
                throw Error(response.statusText);
        } catch (e) {
            this.showLoader(false);
            alert(e.message);
        }
    }
    //------------------------------------------------------------------------- 

    async _onLogin() {
        debugger;
        this.showLoader(true);
        this.emp_ID = await this._login(this.username(), this.password());
        if (this.emp_ID != null) {
            config.user_id = this.username();
            config.user_pwd = this.password();
            config.employee_id = this.emp_ID;
            this.navigateDashboard();
        }
    }

    //------------------------------------------------------------------------- 

    navigateDashboard() {
        this.showLoader(false);
        config.dash_body();
        this._PageRoot.currentPage('host-dashboard');
    }

    //------------------------------------------------------------------------- 

    navigateMainPage() {
        this._PageRoot.currentPage('host-site');
        config.site_body();
    }

    //------------------------------------------------------------------------- 

    _onClickAction() {
        console.log('hello');
    }

    //------------------------------------------------------------------------- 

    _showPass() {
        let pwd = document.getElementById('pwd');
        if (pwd.type == 'password') {
            pwd.type = "text";
        }
        else {
            pwd.type = 'password';
        }
    }
}

//=============================================================================

ko.components.register("host-login", {

    viewModel: VM,
    template: template
});