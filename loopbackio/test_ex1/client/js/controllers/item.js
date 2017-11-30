// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

app.controller('ItemController', function ($scope, Item) {
  $scope.itemData = [];
  $scope.item = {};
  $scope.id = 1;

  $scope.message = 'test';

  $scope.scotches = [
    {
      name: 'Macallan 12',
      price: 50
    },
    {
      name: 'Chivas Regal Royal Salute',
      price: 10000
    },
    {
      name: 'Glenfiddich 1937',
      price: 20000
    }
  ];


  $scope.create = function () {
    //$scope.item.created_date = '2017-11-28 15:42:11';
    $scope.item.active = true;
    Item.create($scope.item, function (result) {
      $scope.getAll();
    });
  }


  $scope.edit = function () {
    var item = Item.get({ id: $scope.item.id });
    item.name = $scope.item.name;
    item.qty = $scope.item.qty;
    item.stock_price = $scope.item.stock_price;
    Item.updateAll({ where: { id: $scope.item.id } }, item, function () {
      $scope.getAll();
    }, function (err) { console.log(err) });


  }

  $scope.delete = function () {
    Item.deleteById({ id: 'a' }, function () {
      $scope.getAll();

    }, function (err) { });

  }

  $scope.getAll = function () {
    var entry = Item.find({ active: true }, function (data) {
      console.log(data)
      $scope.itemData = data;
    });
  }

  $scope.showOrder = function () {

  }

  $scope.getAll();
});

