var express = require('express');
var router = express.Router();
var passport = require('passport');
var models = require('../model/fitfriend-model.js');
var moment = require('moment');
var controller = require('../controller/users-controller.js');

/* 
	POST to signup
	Takes a JSON POST body with a desired username, password, name, and location (optional)
	If the username is valid/untaken, a User document will be created and the current user will be logged in.
	Otherwise, return an error.
*/
router.post('/', function(req, res, next){
    passport.authenticate('local-signup', function(err, user, info){
        if (err) return res.status(400).send(err);
        if (!user) return res.status(400).send({error:info});
        else {
            req.login(user, function(err){
                if (err) return next(err);
                return res.status(201).json({content:{'message': 'Successfully created user', 'user': user}}).end();
            }); 
        }    
    })(req, res, next);
});

/*
	POST to login with username/password 
	Takes a JSON POST body with a username and a password parameter.
	If the username and password are valid, it will log the user in, otherwise return an error.
*/
router.post('/login', function(req, res, next){
    passport.authenticate('local-login', function(err, user, info){
        if (err) return next(err);
        if (!user) return res.status(400).send(info);
        else {
            req.login(user, function(err){
                if (err) return next(err);
                return res.status(200).json({content:{'message': 'Successfully logged in', 'user': user}}).end();
            });
        }
    })(req, res, next);
});

/* POST to logout */
router.post('/logout', function(req, res){
    req.logout();
    res.status(200).send({message: 'Logout successful'});
});

/*
	GET - return the current logged in user. If no one is logged in, return {loggedIn: false};
*/
router.get('/current', function(req, res) {
  if (req.user) {
    res.status(200).json({content:{loggedIn: true, user: req.user}}).end();
  } else {
    res.status(200).json({content:{loggedIn: false}}).end();
  }
});

/* POST to commit */
router.post('/commit', function(req, res){
    controller.commit(req,res);
});

/*
*    GET - return the groups that a particular user is invited to 
*/
router.get('/ginvites', function(req, res){
    controller.getGroupInvites(req,res);
});


/*
    GET - return the fitfixes that a particular user is invited to 
*/
router.get('/finvites', function(req, res){
    console.log(req.body)
    controller.getFitFixInvites(req,res);
});

/*
    GET - return the groups of a particular user
*/
router.get('/groups', function(req, res){
    controller.getGroups(req,res);
});

/*
    GET - return the fitfixes of a particular user
*/
router.get('/fitfixes', function(req,res){
    controller.getFitFixes(req,res);
});


//returns the user stats for a given individual 
router.get('/stats', function(req, res) {
    controller.getStats(req,res);
});

//HELPER FUNCTION calculates the distance between two fitfixes, based on type, day of week, and time of day 
var getDistanceTwo = function(ff1, ff2) {
    var distance = 0;
    var type1 = ff1.type;
    var type2 = ff2.type;
    var time1 = ff1.startDate.getHours(); 
    var time2 = ff2.startDate.getHours();
    var day1 = ff1.startDate.getDay();
    var day2 = ff2.startDate.getDay();
    //calculating the distance between types 
    if (type1 !== type2) {
    }
    //calculating the distance between hours 
    distance = distance + (Math.pow((time1 - time2), 2));

    //calculating the distance between days of the week 
    if (day1 !== day2) {
        distance = distance + (Math.pow((day1 - day2), 2));
    }
    return Math.sqrt(distance);
}
var contains = function(array, testID) {
    var contain = false; 
    for (var i = 0; i < array.length; i++) {
        if (String(array[i]._id) === String(testID)) {
            contain = true;
        }
    }
    return contain;
}

//returns two recommendations for the logged in user based on the users most recent commitment using a variation of nearest neighbor
router.get('/recommendations', function(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(400).json("error: There is no user logged in");
    }
    else {
        models.User.findOne({_id: req.user._id}).populate('fitfixes').exec(function(err, user) {
            if (err) {
                return res.status(400).json("this user does not exist");
            }
            var allFitfixes = user.fitfixes;
            mostRecentFitfix = allFitfixes[allFitfixes.length -1];
            var d = new Date();
            var distanceArray = [];
            var finalArray = [];
            models.Fitfix.find({startDate: {$gte: d}}, function(err, fitfixes) {
                if (err) {
                    res.status(400).json("error: this user has no prior fitfixes")
                }
                if (mostRecentFitfix === undefined) {
                    for (var l = 0; l < Math.min(fitfixes.length, 2); l++) {
                        finalArray.push(fitfixes[l]);
                    }
                }
                else {
                    var today = new Date();
                    for (var k= 0; k < fitfixes.length; k++) {
                        dist = getDistanceTwo(mostRecentFitfix, fitfixes[k]);
                        var ff = fitfixes[k];
                        var start = ff.startDate;
                        //dist = dist + 0.000000000001*(start.getTime() - today.getTime())
                        if (String(fitfixes[k]._id) === String(mostRecentFitfix._id)) {
                            distanceArray.push({ff: fitfixes[k], distance: 9999999});
                        }                        
                        else if (contains(user.fitfixes, fitfixes[k]._id)) {
                            distanceArray.push({ff: fitfixes[k], distance: 9999999});
                        }
                        else {
                            distanceArray.push({ff: fitfixes[k], distance: dist});
                        }
                    }
                    distanceArray.sort(function(a, b) {
                        return a.distance - b.distance;
                    });
                    for (var j =0; j < 2; j++) {
                        if (distanceArray[j] !== undefined) {
                            finalArray.push(distanceArray[j].ff)
                        }
                    }
            }
                res.status(200).json({recs: finalArray});

            });

        });
    }
})

module.exports = router;
