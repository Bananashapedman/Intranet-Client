import ko from "knockout"
import template from "./view.html"
import {config} from "app/Helper"

class pageRoot{
    constructor(params){
        this.params=params;
        this.currentPage=ko.observable("host-site");
        config.root_page=this;

   }

   show_Login(){
       this.currentPage("host-login");
   }
   showme(){
       console.log(this);
   }
}

ko.components.register("page-host",{

    viewModel:pageRoot,
    template:template
});