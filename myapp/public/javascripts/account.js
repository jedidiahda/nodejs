
'user strict';

function Account(){
    const UIControl = {};

    // UIControl.$elem = {
    //     txtusername: $('.txtusername'),
    //     txtpassword: $('.txtpassword'),
    //     butLogin: $('.butLogin'),
    // }

    // UIControl.init = () => {
    //     UIControl.$elem.butLogin.on('click', UIControl.onButLoginClick);
    // }

    // UIControl.onButLoginClick = (e) => {
    //     console.log(e);
    //     console.log(UIControl.$elem.txtusername.val())

    //     $.ajax({
    //         url:'/account',
    //         method: 'POST',
    //         data: {username:'tj',password:'foobar'}
    //     })
    //     .done(function(res){
            
    //         console.log("result",res);
    //     })
    //     .fail(function(error){
    //         console.log("error",error);
    //     })
    // }

    return{
        UIControl: UIControl,
    }
}

// var acct = new Account();
// acct.UIControl.init();

