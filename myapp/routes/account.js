var express = require('express');
var router = express.Router();
var hash = require('pbkdf2-password')();
var utils = require('../common/utils');

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function (req, res, next) {
  authenticate(req.body.username, req.body.password, function (err, user) {
    if (user) {
      req.session.regenerate(function () {
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
                            + ' click to <a href="/logout">logout</a>. ';
        res.redirect('/');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
                        + ' username and password.'
                        + ' (use "tj" and "foobar")';
      res.redirect('/account');
    }
  });
});

router.get('/logout', function (req, res) {
  req.session.destroy(function () {
    res.redirect('/');
  });
});

var users = {
  tj: { name: 'tj' }
};

hash({ password: 'foobar' }, function (err, pass, salt, hash) {
  if (err) throw err;
  // store the salt & hash in the "db"
  users.tj.salt = salt;
  users.tj.hash = hash;
});

// Authenticate using our plain-object database of doom!

function authenticate(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);

  var user = users[name];
  
  if (!user) return fn(new Error('cannot find user'));
  
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user)
    fn(new Error('invalid password'));
  });

}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/account');
  }
}

this.getUser = () => {
  
}



module.exports = router;
module.exports.restrict = restrict;
