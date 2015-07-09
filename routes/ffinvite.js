var express = require('express');
var passport = require('passport');
var models = require('../model/fitfriend-model.js');
var router = express.Router();
// var moment = require('moment');
// var validator = require('validator');

/* GET all fitfix invites*/
router.get('/', function(req, res){
	if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
	models.FFInvite.find({}, function(err, doc){
		if(err){
			res.status(400).json({err: "Could not find that fitfix invite!"});
		}
		res.status(200).json(doc);
	});
});

/*GET a specific fitfix invite*/
router.get('/:fiid', function(req,res){
	if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
	models.FFInvite.find({_id: req.params.fiid}, function(err, doc){
		if(err){
			res.status(400).json({err: "Could not find that specific fitfix invite"});
		}
		res.status(200).json(doc);
	});
});

/*GET all fitfix invites pertaining to a certain fitfix, by fitfix id*/
router.get('/ff/:fid', function(req,res){
	if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
	models.FFInvite.find({"fitfix": req.params.fid}, function(err, doc){
		if(err){
			res.status(400).json({err: "Could not find invites by that fitfix!"});
		}
		res.status(200).json(doc);
	});
});

module.exports = router;