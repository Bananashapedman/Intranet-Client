import ko from 'knockout';
import $ from 'jQuery';

class HELP{
    constructor(){
        
        this.d=new Date();
        this.user_id=null;
        this.user_pwd=null;
        this.employee_id=null;
        this.current_Month=this.d.getMonth()+1;
        this.next_Month=this.calc_Next_Month();
        this.current_Year=this.d.getFullYear();

        this.month_array = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.employee_name=ko.observable();
        this.employee_face=ko.observable();


        this.body_color=ko.observable(true);

        //============ dev visibility 

        this.powered=ko.observable(false);

        

        
    }

    powered_switch(condition){
        this.powered(condition);
    }

    

    pick_Face(){
       
        if (this.employee_id==1){
            this.employee_name("John Bepis");
            this.employee_face("https://lh3.googleusercontent.com/FOw7an19ZuMmwfmj27U87YB8RNBzQeNcSnLcIfJyfxVrjt08Sdlheb41kuUkMrboaSsaH4OWGh1WBUIm34o3NONAM521-9x0CvuOpVZjC79ThniHHM4lyCd0iltJS0lKZxsAHJwa=w2400"); ///dist/ICONS/Dashboard/gunther.png
        }
        else if(this.employee_id==3){
            this.employee_name("Hector Simistiras");
            this.employee_face("https://lh3.googleusercontent.com/AtuL8V4fwTDlBMjFxNGXrVBUfneeYvphsGLyqRv9vUm8x5IHVoOdNMzC98bZnGPdRw0SsDjAF3Fj7xj3pppbP21VARRaeeZOAGtNU-C9ds41kzYb9juGfHYPpqp55YIUOW4iY_uZ=w2400")  ;
        }
        else{
            this.employee_name("Angelos Papadopoulos");
            this.employee_face("https://lh3.googleusercontent.com/AtuL8V4fwTDlBMjFxNGXrVBUfneeYvphsGLyqRv9vUm8x5IHVoOdNMzC98bZnGPdRw0SsDjAF3Fj7xj3pppbP21VARRaeeZOAGtNU-C9ds41kzYb9juGfHYPpqp55YIUOW4iY_uZ=w2400"); ///dist/ICONS/Dashboard/lucy.png
        }
    }// to trexw sthn Fetch (anagastika)


    
    




    display_month(num){
        return this.month_array[num];

    }

    calc_Next_Month() {
        let _d = this.d.getMonth()+1;
        _d!=11 ? _d++ : _d=0;
        return _d;

    }

    dash_body(){
        document.body.classList.add('body-dash');
    }

    site_body(){
        document.body.classList.remove('body-dash');
    }



    
_triggerSuccess(){
    $("#yes-alert").slideDown("slow", function(){
        setTimeout(function(){$('#yes-alert').slideUp(); }, 450);
    });
   
}

_triggerPast(){
    $("#no-alert").slideDown("slow", function(){
        setTimeout(function(){$('#no-alert').slideUp(); }, 450);
    });
   
}


}

export let config=new HELP();



