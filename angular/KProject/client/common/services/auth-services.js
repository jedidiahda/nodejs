angular
  .module('app')
  .factory('AuthService', ['User', '$q', '$rootScope', function (User, $q,
                                                                 $rootScope) {
    function login(email, password) {
      return User
        .login({email: email, password: password})
        .$promise
        .then(function (response) {
          console.log(response.user.id)
          User.findOne({
            filter: {
              where: {
                id: response.user.id
              },
              // include: [
              //   'roles'
              // ]
            }
          }, function (data) {
            console.log('data', data);
            $rootScope.currentUser = data;
            
          });
        });
    }

    function logout() {
      return User
        .logout()
        .$promise
        .then(function () {
          $rootScope.currentUser = null;
        });
    }

    function register(email, password,roleId,callback) {
      User.create([
        {
          email: email,
          password: password
        }
      ], function(err, users) {
        console.log(users)
        if (err) return cb(err);
    
        //create the admin role
        /*
        Role.create({
          name: 'admin'
        }, function(err, role) {
          if (err) cb(err);
    
          //make bob an admin
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[2].id
          }, function(err, principal) {
            cb(err);
          });
        });
        */

        callback();
      });
      

    }

    return {
      login: login,
      logout: logout,
      register: register
    };
  }]);
