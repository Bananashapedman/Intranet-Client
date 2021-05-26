import ko from "knockout"
import "pages/_pageRegister"


class App{
    constructor(){
        this.currentPage=ko.observable();
    }

    _selectPage(name){
        this.currentPage(name);
    }
}

let app= new App();
ko.applyBindings(app);                        