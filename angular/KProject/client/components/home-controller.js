app.controller('HomeController', ['$scope', '$state','AuthService', function ($scope, $state,AuthService) {
    $scope.user = {};
    $scope.gotoLogin = function(){
        $state.go('login');
      }

      $scope.register = function(){
        AuthService.register($scope.user.email, $scope.user.password,2).then(function() {
            $state.go('home');
          });
      }
  }]);