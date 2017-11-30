app.factory('ItemResource', function($resource) {
    console.log('item resource')
    return 1;// $resource('/api/items/:id'); // Note the full endpoint address
  });