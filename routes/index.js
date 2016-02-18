var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Gerador de Curriculo' });
});

router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback'
,passport.authenticate('facebook',
{
    successRedirect : '/helloworld',
    failureRedirect: '/login'
}),function(req, res)
{
    res.redirect('/');
});

router.get('/logout'
, function(req, res)
{
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = router;
