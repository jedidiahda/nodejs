'use strict';

function CustomerList(){
    const UIControl     = {},
          DataControl   = {},
          $w            = $('.customer-list-wrapper');

    UIControl.$elem = {
        butCreateNew: $('.butCreateNew',$w),
    };
    
    UIControl.init = () => {
        UIControl.$elem.butCreateNew.off('click').on('click', UIControl.ButCreatenew.onClick);
    };

    UIControl.ButCreatenew = {
        onClick: e => {
            window.location = '/customer/create';
        }
    };

    return{
        UIControl: UIControl,
        DataControl: DataControl,
    }
}

const customerList = new CustomerList();
customerList.UIControl.init();