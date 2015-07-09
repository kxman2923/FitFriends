var express = require('express');
var passport = require('passport');
var models = require('../model/fitfriend-model.js');
var router = express.Router();
var moment = require('moment');
var validator = require('validator');
var jquery = require('jquery');
var controller = require('../controller/fitfix-controller.js');

/*
GET gets all FitFix events 
*/
router.get('/', function(req,res){
	controller.getFitFixes(req,res);
});

/*
GET gets a specific FitFix event (by id)
*/
router.get('/:fid', function(req,res){
	controller.getFitFix(req,res);
});

/*
POST creates a FitFix (event).
*/
router.post('/fitfix', function(req,res){
	controller.addFitFix(req,res);	
});


/*
POST invites a user to a FitFix
*/
router.post('/inviteUser', function(req,res){
	controller.inviteUser(req,res);
});

/*
POST invites a group (i.e all of its users) to a FitFix
*/
router.post('/inviteGroup', function(req, res){
	controller.inviteGroup(req,res);
});


module.exports = router;

