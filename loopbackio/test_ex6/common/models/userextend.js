'use strict';

var app = require('../../server/server'); //require `server.js` as in any node.js app
module.exports = function (userextend) {
    //console.log(userextend)
    var user = app.models.User;
    var role = app.models.Role;

    userextend.addUserRole = function (email, password,roleId, cb) {
        User.create({ email: email, password: password }, function (err, user) {
            if (err) return cb(err);
            role.principals.create({
                roleId: roleId, 
                //principalType: 'User', //user, application, role
                principalId: user.id
            }, function (err, principal) {
                if(err){
                    success = false;                    
                }else success = err;

                cb(err);                
            });
        });
        cb();
    };
    userextend.remoteMethod(
        'addUserRole', {
            accepts: [{ arg: 'roleId', type: 'number' },
            { arg: 'email', type: 'string' },
            { arg: 'password', type: 'string' }
            ],
            returns: { arg: 'success', type: 'string' },
            http: { path: '/createuserrole', verb: 'post' }
        }
    );
    userextend.beforeRemote('addUserRole', function (context, unused, next) {
        console.log('before remote')
        next();
    });
    userextend.afterRemote('addUserRole', function (context, success, next) {
        console.log(success)
        next();
    });

}