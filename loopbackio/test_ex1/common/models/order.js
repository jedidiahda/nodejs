'use strict';

module.exports = function(Order) {
    Order.read = function() {
        var ds = Order.app.datasources.mysql;
        //var sql = "CALL `GetOrders`('" + old_abc + "','" + new_abc + "');";
        var sql = "CALL `GetOrders`();";
        ds.connector.query(sql, function (err, data) {
            if (err) {
              console.log("Error:", err);
            }
            //cb(null, data);
            //console.log("data:", data);
            return data;
          });
        
         
      };

      Order.remoteMethod(
        'read',
        {
        accepts: [
            //{arg: 'old_abc', type: 'string'},
            //{arg: 'new_abc', type: 'string'}
        ],
        returns: {arg: 'result', type: 'object'},
        http: {path: '/read', verb: 'post'}
        }
    );

};
