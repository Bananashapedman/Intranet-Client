import ko from "knockout"
import template from "./view.html"

class pageRoot{
    constructor(params){
        this.params=params;
        this.currentPage=ko.observable("host-site");
    }
}

ko.components.register("page-host",{

    viewModel:pageRoot,
    template:template
});