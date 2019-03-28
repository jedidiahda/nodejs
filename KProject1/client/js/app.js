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
      templateUrl: 'components/home/home.html'
    })
    .state('users', {
      abstract: true,
      url: '/users',
      templateUrl: 'views/elements/main.html',
      controller: 'UsersController'
    })
    .state('users.list', {
      url: '',
      templateUrl: 'views/users/list.html',
      controller: 'AllUsersController'
    })
    .state('users.add', {
      url: '/add',
      templateUrl: 'views/users/form.html',
      controller: 'AddUserController',
      authenticate: true
    })
    .state('users.edit', {
      url: '/edit/:id',
      templateUrl: 'views/users/form.html',
      controller: 'EditUserController',
      authenticate: true
    })
    .state('users.view', {
      url: '/view/:id',
      templateUrl: 'views/users/view.html',
      controller: 'ViewUserController',
      authenticate: false
    })
    .state('users.delete', {
      url: '/delete/:id',
      controller: 'DeleteUserController',
      authenticate: true
    })

    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'views/users/forbidden.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/users/login.html',
      controller: 'AuthLoginController'
    })
    .state('logout', {
      url: '/logout',
      controller: 'AuthLogoutController'
    })
    .state('sign-up', {
      url: '/sign-up',
      templateUrl: 'views/users/sign-up-form.html',
      controller: 'SignUpController'
    })
    .state('sign-up-success', {
      url: '/sign-up/success',
      templateUrl: 'views/users/sign-up-success.html'
    });
  $urlRouterProvider.otherwise('home');
}]);

app.run(['$rootScope', '$state', function ($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    // redirect to login page if not logged in
    if (next.authenticate && !$rootScope.currentUser) {
      event.preventDefault(); //prevent current page from loading
      $state.go('forbidden');
    }
  });
}]);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
  // Intercept 401 responses and redirect to login screen
  $httpProvider.interceptors.push(function ($q, $location) {
    return {
      responseError: function (rejection) {

        return $q.reject(rejection);
      }
    };
  });
}]);
