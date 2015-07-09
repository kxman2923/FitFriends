var express = require('express');
var passport = require('passport');
var models = require('../model/fitfriend-model.js');
var router = express.Router();
// var moment = require('moment');
// var validator = require('validator');

/* GET all group invites*/
router.get('/', function(req, res){
	if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
	models.GroupInvite.find({}, function(err, doc){
		if(err){
			res.status(400).json({err: "Could not find that group invite!"});
		}
		res.status(200).json(doc);
	});
});

/*GET a specific group invite*/
router.get('/:giid', function(req,res){
	if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
	models.GroupInvite.find({_id: req.params.giid}, function(err, doc){
		if(err){
			res.status(400).json({err: "Could not find that specific group invite"});
		}
		res.status(200).json(doc);
	});
});

/*GET all group invites pertaining to a certain group, by group id*/
router.get('/group/:gid', function(req,res){
	if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
	models.GroupInvite.find({"group": req.params.gid}, function(err, doc){
		if(err){
			res.status(400).json({err: "Could not find invites by that group!"});
		}
		res.status(200).json(doc);
	});
});

module.exports = router;