import ko from "knockout"
import template from "./view.html"

class VM{
    constructor(params){
        this._PageRoot=params;

    }

    navigateLogin(){

        this._PageRoot.currentPage('host-login');

    }
}



ko.components.register("host-site",{

viewModel:VM,
template:template

});