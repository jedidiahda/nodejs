var app = angular
    .module('app', [
        'lbServices',
        'ui.router',
        'ngResource'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,
        $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                templateUrl: 'views/partial-home.html'
            })

            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('about', {
                url: '/about',
                views: {
        
                    // the main template will be placed here (relatively named)
                    '': { templateUrl: 'views/partial-about.html' },
        
                    // the child views will be defined here (absolutely named)
                    'columnOne@about': { template: 'Look I am a column!' },
        
                    // for column two, we'll define a separate controller 
                    'columnTwo@about': { 
                        templateUrl: 'views/table-data.html',
                        controller: 'ItemController'
                    }
                }
        
            })
            // nested list with custom controller
            .state('home.list', {
                url: '/list',
                templateUrl: 'views/partial-home-list.html',
                controller: function ($scope) {
                    $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
                }
            })

            // nested list with just some random string data
            .state('home.paragraph', {
                url: '/paragraph',
                template: 'I could sure use a drink right now.'
            })

            //show list of item, add, update, delete ability
            .state('item',{
                url:'/item',
                templateUrl:'views/partial-items.html',
                controller:'ItemController',
            })

    }]);