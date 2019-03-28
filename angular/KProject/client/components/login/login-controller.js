app = angular.module('app');

app.controller('LoginController', ['$scope', 'AuthService', '$state', function($scope, AuthService, $state) {

  $scope.user = {};

  $scope.login = function() {
    AuthService.login($scope.user.email, $scope.user.password).then(function() {
      $state.go('itemlist');
    });
  };

}]);

