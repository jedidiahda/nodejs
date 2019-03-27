app = angular.module('app', [
  'ui.router',
  'lbServices',
  //'lbModels',
  'ngRoute'
]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'HomeController',
      templateUrl: 'components/home.html'
    })
    .state('login', {
      url: '/login',
      controller: 'LoginController',
      templateUrl: 'components/login/login.html'
    })
    .state('itemlist', {
      url: '/itemlist',
      controller: 'ItemListController',
      templateUrl: 'components/item-list/item-list.html'
    })
  $urlRouterProvider.otherwise('home');
}]);

app.run(['$rootScope', '$state', function ($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    // redirect to login page if not logged in
    if (next.authenticate && !$rootScope.currentUser) {
      event.preventDefault(); //prevent current page from loading
      //$state.go('forbidden');
    }
  });
}]);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
  // Inside app config block
  $httpProvider.interceptors.push(function ($q, $location, LoopBackAuth) {
    return {
      responseError: function (rejection) {
        if (rejection.status == 401) {
          // Clearing the loopback values from client browser for safe logout...
          LoopBackAuth.clearUser();
          LoopBackAuth.clearStorage();
          $location.nextAfterLogin = $location.path();
          $location.path('/login');
        }
        return $q.reject(rejection);
      }
    };
  });


  // // Intercept 401 responses and redirect to login screen
  // $httpProvider.interceptors.push(function ($q, $location) {
  //   return {
  //     responseError: function (rejection) {

  //       return $q.reject(rejection);
  //     }
  //   };
  // });
}]);

app.controller('appController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {

}]);