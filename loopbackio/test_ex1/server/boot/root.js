'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  //This code says that for any GET request to the root URI (“/”), the application will return the results of loopback.status().
  // close this one because it will goto loopback.status
  // we want to "/" goto index.html which has been config in middleware.json
  // var router = server.loopback.Router();
  // router.get('/', server.loopback.status());
  // server.use(router);
};
