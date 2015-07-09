var models = require('../model/fitfriend-model.js');
var moment = require('moment');

var controller = function(){
	return {
		commit: function(req,res){
			if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
		    models.User.find({'local.username': req.body.username}).where('fitfixes')
		    .in([req.body.fitfixid]).exec(function(err, user){
		        if(user.fitfixes) return res.status(400).json({'error': "You've already committed"});
	            models.User.findOne({'local.username': req.body.username}).exec(function(err,newUser){
	                if (err) return res.status(400).json({'error': 'Error in finding user.'});
	                models.Fitfix.findOne({_id: req.body.fitfixid}, function(err, ff){
	                    newUser.fitfixes.push(ff);
	                    newUser.save(function(err){
	                        if(err) return res.status(400).send(err);
	                    });
	                });
	            models.FFInvite.findOneAndRemove({fitfix: req.body.fitfixid, invitee: newUser._id},function(err, ffinvite){
	                if (err) return res.status(400).json({'error': 'Error deleting fitfix invite.'});
	                res.status(200).json({'message':'You successfully committed!'}).end();
	                });

	            });        
		    });
		},
		getGroupInvites: function(req,res){
			if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
		    var invites = [];
		    models.User.findOne({_id: req.user._id}).populate('ginvites').exec(function(err, user){
		        if (err) res.status(500).send(err);
		        models.User.populate(user,[{path:'ginvites.group', model:'Group'}], function(err, populatedUser){
		            if (err) return res.status(500).send(err);
		            if(populatedUser.ginvites.length === 0){
		                return res.json({groups: invites});
		            }
		            for(var i=0; i < populatedUser.ginvites.length; i++){
		                if(populatedUser.ginvites[i].accepted === false) {
		                    var data = populatedUser.ginvites[i].group;
		                    invites.push(data);
		                    if (i === invites.length-1) {
		                            return res.json({groups: invites});
		                        }
		                }
		            }
		        });
		    });
		},
		getFitFixInvites: function(req,res){
		    if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
		    var invites = []; 
		    models.User.findOne({_id: req.user._id}).populate('ffinvites').sort({ "startDate" : "asc"}).exec(function(err, user){
		        if (err) return res.status(500).send(err);
		        models.User.populate(user, [{path:'ffinvites.fitfix', model:'Fitfix'}], function(err, populatedUser){
		            if (err) return res.status(500).send(err);
		            if(populatedUser.ffinvites.length === 0){
		                return res.json({fitfixes: invites});
		            }
		            for(var i=0; i < populatedUser.ffinvites.length; i++){
	                    invites.push(populatedUser.ffinvites[i].fitfix);
	                    if (i === populatedUser.ffinvites.length-1) {
	                            return res.json({fitfixes: invites});
	                        }
		            }            
		        });

		    });
		},
		getGroups: function(req,res){
			if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
		    models.User.findOne({_id: req.user._id}).populate('groups').exec(function(err, user){
		        if (err) return res.status(500).send(err);
		        return res.json({groups: user.groups});
		    });
		},
		getFitFixes: function(req,res){
			if (!req.isAuthenticated()) return res.status(401).send({'error': 'You are not logged in!'});
		    models.User.findOne({_id: req.user._id}).populate('fitfixes').exec(function(err, user){
		        if(err) return res.status(400).send(err);
		        return res.json({fitfixes: user.fitfixes}); 
		    });	
		},
		getStats: function(req,res){
			if (!req.isAuthenticated()) return res.status(401).json("error: There is no user logged in");
		    models.User.findOne({_id: req.user._id}).populate('fitfixes').exec(function(err, user) {
		    if (err) return res.status(400).json("This user does not exist");
		        
	        var types = {
	            Swimming: {label: "Swimming", x: 0, y: 0}, 
	            Yoga: {label: "  Yoga  ", x: 2, y:0}, 
	            GroupExercise: {label: " Group  ", x: 3, y: 0}, 
	           	Running: {label: "Running ", x: 1, y:0}, 
	            TeamSports: {label: "  Team  ", x:4, y:0}, 
	            Strength: {label: "Strength", x: 5, y: 0}, 
	            Cardio: {label: " Cardio ", x: 6, y: 0}, 
	            Other: {label: "  Other ", x: 7, y: 0},
	            RaquetSports: {label: " Raquet " , x: 8, y: 0}, 
	            run: {label: "   run  ", x: 9, y: 0}
	            } ;
	        var time = {
	            0: {label: "Sunday" ,x: 0, y: 0}, 
	            1: {label: "Monday" ,x: 1, y: 0}, 
	            2: {label: "Tuesday", x: 2, y: 0}, 
	            3: {label: "Wednesday", x: 3, y: 0}, 
	            4: {label: "Thursday" ,x: 4, y:0}, 
	            5: {label: "Friday" , x: 5, y: 0}, 
	            6: {label: "Saturday" , x: 6, y: 0}
	        }
	        var userFitfixes = [];
	        var today = new Date();
	        today = moment(today);
	        var lastMonth = moment(today);
	        lastMonth = moment(today.subtract(1, 'm'));
	        for (var i = 0; i < user.fitfixes.length; i++) {
	            if (moment(user.fitfixes[i].startDate) < today && moment(user.fitfixes.startDate) > lastMonth) {
	                userFitfixes.push(user.fitfixes[i]);
	            }
	        }

	        for (var j = 0; j < userFitfixes.length; j++) {
	            var day = (userFitfixes[j].startDate).getDay();
	            var type = userFitfixes[j].type;
	            var day_thing = time[day];
	            var type_thing = types[type];
	            day_thing.y = day_thing.y + 1;
	            type_thing.y = type_thing.y + 1;
	        }
	        var timeData = [];
	        for (var w = 0; w < 7; w++) {
	            console.log(time[w])
	            timeData.push(time[w]);
	        }
	        var typeData = [];
	        for (var key in types) {

	            typeData.push(types[key]);
	        }
	        res.status(200).json({typeData: typeData, timeData: timeData})
			});
		},
	}
};

module.exports = controller();