
'user strict';

class Account{
            
    constructor (){}

    

    init(){
        $('.butLogin').on('click', this.onButLoginClick);
    }

    login(){

    }

    onButLoginClick(e){
        console.log(e);
        console.log('hi')
    };

}

let acct = new Account();

acct.init();
