import ko from "knockout"
import template from "./view.html"
import {config} from "app/Helper"

class VM{
    constructor(params){
        this.params=params;
        this.dash_content=ko.observable('dash-schedule');
        this.config=config;
    }

    _selectPage(ele, name){
        
        
        this.dash_content(name);
        this._selectedMenuItem(ele);
        this._collapseLarge();
    }

    //================================================

    _selectedMenuItem(ele){
        
        let parent=ele.parentElement.parentElement;
        let children=parent.querySelectorAll('a');
        children.forEach(child=>{
            child.classList.remove('active');
           
        })

        ele.classList.add('active');
    }

    //===============================================

    _ham(){
        const cover=document.getElementById('cover');
        const sidebar=document.getElementById('hs-sidebar');
        sidebar.classList.add('open');
        cover.classList.remove('d-none');
        }

    _coverCollapse(ele){
        ele.classList.add('d-none');
        document.getElementById('hs-sidebar').classList.remove('open');
    }

    _collapseLarge(){
        document.getElementById('hs-sidebar').classList.remove('open');
        document.getElementById('cover').classList.add('d-none');
    }


    _logOut(){
        config.root_page.show_Login();
        config.user_id=null;
        config.user_pwd=null;
        config.employee_id=null;
    }




}


ko.components.register("host-dashboard",{

    viewModel:VM,
    template:template
    
    });







    
