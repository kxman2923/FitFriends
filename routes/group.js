var express = require('express');
var passport = require('passport');
var models = require('../model/fitfriend-model.js');
var router = express.Router();
var validator = require('validator');
var controller = require('../controller/groups-controller.js');

/*
POST creates a group
*/
router.post('/group', function(req,res){
	controller.addGroup(req,res);
});

/*
GET retrieves the information (name, description, list of users) of a group
*/
router.get('/:gid', function(req,res){
	controller.getGroup(req,res);
});

/*GET all of the groups*/
router.get('/', function(req,res){
	if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
	models.Group.find({ }).sort({ "name" : "asc"}).exec(function(err, doc){
	 	if(err){
			res.status(400).json({err: "That group does not exist!"});
		}
		else{
			res.status(200).json(doc);
		}
	});
});

/*
POST invites a user to a group. Based on username and group name.
*/
router.post('/invite', function(req, res){
	controller.inviteUser(req,res);
});

/*
POST adds a user to a group. Based on username.
*/
router.post('/member/:gid', function(req,res){
	controller.addUser(req,res);
});


module.exports = router;
