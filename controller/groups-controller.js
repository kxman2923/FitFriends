var models = require('../model/fitfriend-model.js');
var validator = require('validator');

var controller = function() {
	return {
		addGroup: function(req,res){
			if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
			models.Group.findOne({name: validator.toString(req.body.name)}, function(err, group){
				var users = []
				if(group === null){ 
					//if the group is null it means nobody has claimed it so we are good
					//The user creating the group is one of the members of the group
					users.push(req.user._id);
					var group = new models.Group({
						name: req.body.name,
						description: validator.toString(req.body.description),
						members: users,
					});

					group.save(function(err){
						if(err) return res.status(400).json({err: "Can't create that group!"});
						req.user.groups.push(group);
						models.User.findOne({_id: req.user._id}, function(err, foundUser) {
							foundUser.groups.push(group);
							foundUser.save(function(err) {
								if (err) return res.status.json({'error':err});	
							});	
							if (err) return res.status.json({'error':err});	
						});
						res.status(200).json(group);
					});
				}
				else{
					return res.status(400).json({err: "A group with that name already exists!"});
				}
			});
		},
		getGroup: function(req,res){
			if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
			models.Group.findOne({_id: req.params.gid}).populate('members').exec(function(err, group){
				if(err) return res.status(400).json({err: "Can't find that group!"});
				res.status(200).json(group);
			});
		},
		inviteUser: function(req,res){
			if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
				models.User.findOne({'local.username': validator.toString(req.body.username)}).populate('ginvites').exec(function(err, user) {
				if(err) return res.status(400).json({'error': 'Error in finding user.'});
				if(!user) return res.status(400).send({'error': 'That user does not exist.'});
				var invite = new models.GroupInvite({
							group: req.body.groupId,
							inviter: req.user._id,
							invitee: user._id,
						});
				invite.save(function(err){
					if (err) res.status(400).json({err: "Error in creating the FitFix invitation"});
					console.log("successfully invited ", user._id, "to ", req.body.groupId);
					user.ginvites.push(invite._id);
					user.save(function(err){
						if (err) res.status(400).json({err: "Error in adding ff ref to user"});
						console.log(user.ginvites);
						res.status(200).json({content:{invite: invite._id, user: req.user}}).end();
					});
				});
			});
		},
		addUser: function(req,res){
			if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
			models.User.findOne({'local.username': validator.toString(req.body.username)}).exec(function(err, user){
				if(err) return res.status(400).json({'error': 'Error in finding user.'});
				if(!user) return res.status(400).json({'error':'Can\'t find that user!'});
				models.Group.findOneAndUpdate({_id: req.params.gid}, {$push:{members : user}}).populate('members').exec(function(err, group){
					if(err) return res.status(400).json({err: "Something went wrong with adding this user to this group!"});
					user.groups.push(req.params.gid);
					user.save(function(err){
						if(err) return res.status(400).json({'error': "Something went wrong with creating the FitFix!"});
					});
					models.GroupInvite.findOneAndRemove({group: req.params.gid, invitee: user._id},function(err, ginvite){
						if (err) return res.status(400).json({'error': 'Error deleting group invite.'});
						res.status(200).json(group).end();
					});
				});
			});
		},
	}
};

module.exports = controller();
