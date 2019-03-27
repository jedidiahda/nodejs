app = angular.module('app');

app.controller('ItemListController', ['$scope', 'AuthService', '$state', function($scope, AuthService, $state) {
    $scope.items = [];

    function getItems(){
        $scope.items.push({
            name: 'ABC',
            qty: 100,
            stock_price: 10,
            sell_price:12,
        });
        $scope.items.push({
            name: 'Coca',
            qty: 100,
            stock_price: 10,
            sell_price:12,
        });
        $scope.items.push({
            name: 'Sprite',
            qty: 100,
            stock_price: 10,
            sell_price:12,
        });
    }

    getItems();

}]);

