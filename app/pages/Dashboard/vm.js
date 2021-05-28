import ko from "knockout"
import template from "./view.html"

class VM{
    constructor(params){
        this.params=params;
        this.dash_content=ko.observable();
    }

    _selectPage(name){
        this.dash_content(name);
    }
}


ko.components.register("host-dashboard",{

    viewModel:VM,
    template:template
    
    });