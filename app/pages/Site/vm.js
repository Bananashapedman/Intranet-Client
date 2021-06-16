import ko from "knockout"
import template from "./view.html"



class VM{
    constructor(params){
        this._PageRoot=params;

    }

    navigateLogin(){

        this._PageRoot.currentPage('host-login');


    }

    menuDrop(){
        document.getElementById('hs-drop').classList.toggle('active');
  }


  whaleGrab(){
    document.getElementById('img_grab').classList.add('_moveOnLoad');
}
}



ko.components.register("host-site",{

viewModel:VM,
template:template

});