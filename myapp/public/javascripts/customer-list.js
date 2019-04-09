'use strict';

function CustomerList(){
    const UIControl     = {},
          DataControl   = {},
          $w            = $('.customer-list-wrapper');

    UIControl.$elem = {
        butCreateNew:   $('.butCreateNew',$w),
        table:          $('.m-table', $w),
    };
    
    UIControl.init = () => {
        UIControl.$elem.butCreateNew.off('click').on('click', UIControl.ButCreatenew.onClick);
        UIControl.$elem.table.find('.m-body a').off('click').on('click', UIControl.CustomerTable.onRowClick);

    };

    UIControl.ButCreatenew = {
        onClick: e => {
            window.location = '/customer/create';
        }
    };

    UIControl.CustomerTable = {
        onRowClick: (e,i) => {
            let target = e.target,
                a = $(target).closest('a');
            if(typeof a != 'undefined'){
                let id = $(a).attr('data-id');
                if($(target).hasClass('butDelete')){
                    if(confirm('Are you sure you want to delete?') == true){
                        $.ajax({
                            type:'POST',
                            url:'/customer/delete',
                            data:{id: id},
                            succes: result => {
                                if(result.error)
                                    alert('Cannot delete');
                                else{
                                    location.reload();
                                }
                            },
                            fail: (xhr, status, error) => {
                                alert('Cannot delete');
                                console.log(error)
                            }
                        })
                    }
                }else{        
                    window.location = '/customer/edit/' + id;
                }
            }            
        }
    }

    return{
        UIControl: UIControl,
        DataControl: DataControl,
    }
}

const customerList = new CustomerList();
customerList.UIControl.init();