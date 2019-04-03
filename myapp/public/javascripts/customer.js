'use strict';

function Customer(){
    const UIControl = {},
          DataControl = {},
          $w = $('.customer-wrapper');

    UIControl.$elem = {
        butSave:        $('.butSave',$w),
        txtFirstName:   $('.txtFirstName',$w),
        txtLastName:    $('.txtLastName',$w),
        optGender:      $('.optGender',$w),
        txtEmail:       $('.txtEmail',$w),
        optGroup:       $('.optGroup',$w),
        txtPhone:       $('.txtPhone',$w),
        filePicture:    $('.filePicture',$w)
    };
    
    UIControl.init = () => {
        UIControl.$elem.butSave.off('click').on('click', UIControl.ButSave.onClick);
    };

    UIControl.ButSave = {
        onClick: e => {
            $.ajax({
                type: 'POST',
                url: '/customer/create',
                data: {
                    firstName: UIControl.$elem.txtFirstName.val(),
                    lastName: UIControl.$elem.txtLastName.val(),
                    gender: UIControl.$elem.optGender.val(),
                    email: UIControl.$elem.txtEmail.val(),
                    group: UIControl.$elem.optGroup.val(),
                    phone: UIControl.$elem.txtPhone.val(),
                },
                success: UIControl.ButSave.onSuccess,
                error: UIControl.ButSave.onError
            });
        },
        onSuccess: res => {
            console.log(res);
        },
        onError: (xhr, status, error) => {
            console.log(error);
        }
    }

    return{
        UIControl: UIControl,
        DataControl: DataControl,
    }
}

const customer = new Customer();
customer.UIControl.init();