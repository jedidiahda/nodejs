'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
<<<<<<< HEAD
  //var router = server.loopback.Router();
  //router.get('/', server.loopback.status());
  //server.use(router);
=======
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
>>>>>>> e871ff94802951fa05c03959dd6b34ccf1495997
};
