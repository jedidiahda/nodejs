
'user strict';

function Account(){
    const UIControl = {};

    UIControl.$elem = {
        txtusername: $('.txtusername'),
        txtpassword: $('.txtpassword'),
        butLogin: $('.butLogin'),
    }

    UIControl.init = () => {
        UIControl.$elem.butLogin.on('click', UIControl.onButLoginClick);
    }

    UIControl.onButLoginClick = (e) => {
        console.log(e);
        console.log(UIControl.$elem.txtusername.val())
    }

    return{
        UIControl: UIControl,
    }
}

var acct = new Account();
acct.UIControl.init();

