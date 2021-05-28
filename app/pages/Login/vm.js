import ko from "knockout"
import template from "./view.html"


class VM{
    constructor(params){
        this._PageRoot=params;
    }

navigateDashboard(){

    this._PageRoot.currentPage('host-dashboard');

}
}


ko.components.register("host-login",{

    viewModel:VM,
    template:template
});