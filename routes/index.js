var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'FitFriends' });
});

// check if user session exists; otherwise redirect to homepage
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(400).send({message: 'You are not logged in!'});
}

module.exports = router;
