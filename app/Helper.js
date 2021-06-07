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
        
    }

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



