'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var errorHandler = require('strong-error-handler');

var app = module.exports = loopback();

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

// //use cookies for authentication
// app.use(loopback.token({
//   model: app.models.accessToken
// }));

//To display vanity user URLs, configure the token middleware with currentUserLiteral options. 
/*
The currentUserLiteral defines a special token that can be used in the URL for REST APIs, for example:
curl -X GET http://localhost:3000/api/users/me/orders?access_token=$ACCESS_TOKEN
Please note the URL will be rewritten to http://localhost:3000/api/users/<currentLoggedInUserId>/orders?access_token=$ACCESS_TOKEN by LoopBack.
*/
// app.use(loopback.token({
//   model: app.models.accessToken,
//   currentUserLiteral: 'me'
// }));

app.use(errorHandler({
  debug: app.get('env') === 'development',
  log: true,
}));

