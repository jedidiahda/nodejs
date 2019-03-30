app.controller('LoginController', function ($scope, Item,$location,User,$rootScope,$cookies) {
    $scope.login = function(){
        User.login({email:$scope.email,password:$scope.password},function(err,token){
            console.log(err);
            //console.log(token)
            //$rootScope.global.
            if(err){
                $location.path('/home');
                $cookies.put('currentUser',err) 
            }
      
            
        })
        
    }

    $scope.logout = function(){
        User.logout();
        $cookies.remove('currentUser') 
        $location.path('/login');
    }
});