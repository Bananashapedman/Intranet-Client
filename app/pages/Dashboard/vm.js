import ko from "knockout"
import template from "./view.html"

class VM{
    constructor(params){
        this.app=params;
    }
}


ko.components.register("host-dashboard",{

    viewModel:VM,
    template:template
    
    });