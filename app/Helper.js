import ko from 'knockout';

class HELP{
    constructor(){
        
        this.d=new Date();
        this.user_id=null;
        this.user_pwd=null;
        this.employee_id=null;
        this.current_Month=this.d.getMonth();
        this.next_Month=this.calc_Next_Month();
        this.current_Year=this.d.getFullYear();

        this.month_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.employee_name=ko.observable();
        this.employee_face=ko.observable();

        

        
    }

    pick_Face(){
       
        if (this.employee_id==1){
            this.employee_name("John Bepis");
            this.employee_face("/dist/ICONS/Dashboard/lucy.png");
        }
        else if(this.employee_id==3){
            this.employee_name("Hector Simis");
            this.employee_face("/dist/ICONS/Dashboard/gunther.png")
        }
        else{
            this.employee_name("Boban Marjano");
            this.employee_face("/dist/ICONS/Dashboard/elfo.jpg");
        }
    }// to trexw sthn Fetch (anagastika)


    
    




    display_month(num){
        return this.month_array[num];

    }

    calc_Next_Month() {
        let _d = this.d.getMonth();
        _d!=11 ? _d++ : _d=0;
        return _d;

    }

}

export let config=new HELP();



