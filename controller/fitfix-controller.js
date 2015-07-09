var moment = require('moment');
var validator = require('validator');
var jquery = require('jquery');
var models = require('../model/fitfriend-model.js');

var controller = function(){
	return {
		addFitFix: function(req,res){
		if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
		models.User.findById(req.user._id, function(err, u){
			if (err) return res.status(400).send(err);
			var series = [];
			var prevWeek = moment(req.body.startDate);
			prevWeek = moment(prevWeek.subtract(1,'w'));
			for(var i=0; i < req.body.recurring; i++) {
				var fitfix = models.Fitfix({
				author: req.user._id,
				title: validator.toString(req.body.title),
				startDate: moment(prevWeek.add(1,'w')),
				duration: validator.toInt(req.body.duration),
				numWeeks: validator.toInt(req.body.recurring),
				description: validator.toString(req.body.description),
				location: validator.toString(req.body.location),
				type: req.body.type,
				});	
				fitfix.save(function(err){
					if(err) return res.status(400).json({'error': "Something went wrong with creating the FitFix!"});
				});
				series.push(fitfix._id);
			}
			for(var i=0; i < series.length; i++){
				u.fitfixes.push(series[i]);
			}
			u.save(function(err){
				if (err) res.status(400).json({'error': "Error in adding fitfix ref to author"});
			})
			if(series.length > 1){
				var s = models.Series({
					fitfixes: series
				});
				s.save(function(err){
					if (err) return res.status(400).json({'error': "error in saving series"});
				});
			}
			res.status(200).json(series).end();
		});
		},
		getFitFixes: function(req,res){
			if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
			models.Fitfix.find({ }).sort({ "startDate" : "asc"}).exec(function(err, doc){
			 	if(err) return res.status(400).json({err: "That FitFix does not exist!"});
				res.status(200).json(doc);
			});
		},
		inviteUser: function(req,res){
			if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
			models.User.find({'local.username': validator.toString(req.body.username)}).where('fitfixes').in([req.body.fitfixId]).exec(function(err,user){
				if(user.length ==! 0) return res.status(400).send({'error': "User has already committed!"});
				models.User.findOne({'local.username': req.body.username}).populate('ffinvites').exec(function(err, popUser){
					if(!popUser) return res.status(400).send({'error': 'That user does not exist.'});
					models.FFInvite.find({'fitfix': req.body.fitfixId, 'invitee': popUser._id}, function(err, invite){
						if(invite.length ==! 0) return res.status(400).json({'error': "User has already been invited"});
						var ffinvite = new models.FFInvite({
							fitfix: req.body.fitfixId,
							inviter: req.body.currentUser,
							invitee: popUser._id 
						});
						ffinvite.save(function(err){
							if (err) return res.status(400).json({'error': "Error in creating the FitFix invitation"});
						});
						popUser.ffinvites.push(ffinvite._id);
						popUser.save(function(err){
							if (err) return res.status(400).json({'error': "Error in creating the FitFix invitation"});
						});
						return res.status(200).json({'message': 'Successfully invited user', invite:ffinvite._id, user:popUser});
					});
				});
			});
		},
		inviteGroup: function(req,res){
			if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
			var invites = [];
			var groupMembers = null;
			models.Group.findOne({'name': validator.toString(req.body.group)}).exec(function(err,group){
				if(!group) return res.status(400).json({'error': "Can't find that group!"});
				models.Fitfix.findOne({_id: req.body.fitfixId}, function(err, ff){
					if(err) return res.status(400).json({'error': "Can't find that Fitfix!"});
					groupMembers = group.members;
					for(var i=0; i< groupMembers.length; i++){
						var invite = new models.FFInvite({
							fitfix: req.body.fitfixId,
							inviter: req.body.currentUser,
							invitee: groupMembers[i],
						});
						invites.push(invite)
						invite.save(function(err){
							if (err) return res.status(400).json({'error': 'Error in saving group invites.'});
						});
					}
					for(var i=0; i<groupMembers.length; i++){
						models.User.findById(groupMembers[i], function(err, user){
							if (!user) res.status(400).json({'error': "Can't find that user in that group!"});
							user.ffinvites.push(invites[i]._id);
							user.save(function(err){
								if (err) return res.status(400).json({'error':'Error in saving a particular ff invite.'})
							});
						});
						if(i === groupMembers.length-1){
							return res.status(200).json(ff);
						}
					}	
				});
				
			});			
		},
		getFitFix: function(req,res){
			if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
			models.Fitfix.findOne({_id: req.params.fid}, function(err, doc){
			 	if(err) return res.status(400).json({err: "That FitFix does not exist!"});
				res.status(200).json(doc);
			});
		}
	}
};

module.exports = controller();