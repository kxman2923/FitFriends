var run_tests= function(){
	test_signUpUser();
}

var test_signUpUser = function(){
	//Trying signing up with a non-mit email
	addUser("andy123@gmail.com", "andy", "pass", function(user1){
		if(!user1){
			console.log("Signing up with non-mit email test PASSED");
			//Trying signing up without a valid email address (not in email format)
			addUser("andy123", "andy", "pass", function(user2){
				if(!user2){
					console.log("Signing up without a email format string PASSED");
					//Try signing up with a valid email address
					addUser("andy123@mit.edu", "andy", "pass", function(user3){
						if("andy123@mit.edu" === user3.email &&
							"andy" === user3.local.username &&
							"pass" === user3.local.password){
							console.log("Signing up with a valid email address PASSED");
						}
						else{
							console.log("Signing up with a valid email address FAILED");
						}
					});
				}
				else{
					console.log("Signing up without a email format string FAILED");
				}
			});
		}
		else{
			console.log("Signing up with non-mit email test FAILED");
		}
		test_login();
	});
}

var test_login = function(){
	//Try logging in with the correct credentials (should pass)
	login("andy", "pass", function(user){
		if("andy" === user.local.username &&
			"pass" === user.local.password){
			console.log("Logging in with correct credentials PASSED");
		}
		else{
			console.log("Logging in with correct credentials FAILED");
		}
		test_createGroup();
		test_createFitfix();
		test_editUsername();
	});
}

var test_createGroup = function(){
	addGroup("coolKids", "Cool kids only", function(group){
		if("coolKids" === group.name &&
			"Cool kids only" === group.description){
			console.log("Creating group PASSED");
			//Try duplicating the group, should fail
			addGroup("coolKids", "Cool kids only", function(group2){
				if(!group2){
					console.log("No duplicate group PASSED");
				}
				else{
					console.log("No duplicate group FAILED");
				}
			});
		}
		else{
			console.log("Creating group FAILED");
		}
		test_groupInviteUserTwice(group);
	});
}

var test_createFitfix = function(){
	var date = new Date();
	addFitFix(date, 60, 0, "RUN", "running", "track field", "track", function(ff){
		if(date === ff.startDate &&
			60 === ff.duration &&
			0 === ff.numWeeks &&
			"RUN" === ff.title &&
			"running" === ff.description &&
			"track field" === ff.location &&
			"track" === ff.type){
			console.log("Creating a new fitfix PASSED");

			//Try creating a Fitfix with the same title (should pass)
			addFitFix(date, 60, 0, "RUN", "running!", "field", "track", function(ff2){
				if(date === ff2.startDate &&
				60 === ff2.duration &&
				0 === ff2.numWeeks &&
				"RUN" === ff2.title &&
				"running!" === ff2.description &&
				"field" === ff2.location &&
				"track" === ff2.type){
					console.log("Creating a new, same title fitfix PASSED");

					//Try creating a Fitfix with a date in the past (should fail)
					//TODO
					var date2= new Date(date.getFullYear(), date.getMonth(), date.getDay()-1);
					addFitFix(date2, 60, 0, "RUN", "running!", "field", "track", function(ff3){
						if(ff3){
							console.log("Testing creating a past fitfix FAILED");
						}
						else{
							console.log("Testing creating a past fitfix PASSED");
						}
					});
				}
				else{
					console.log("Creating a new fitfix, same title FAILED");
				}
			});
		}
		else{
			console.log("Creating a new fitfix FAILED");
		}
		test_ffInviteUserTwice(ff);
	});
}

//Tests inviting one user to a FitFix twice. Only one FitFix invite should be created in this case.
var test_ffInviteUserTwice = function(fitfix){
	//Add another user for this test
	//Must logout after adding to access another user
	addUser("carl@mit.edu", "carl", "pass", function(carl){
		if(carl){
			logout(function(u){
				//Try to invite a user twice
				//First login a different user (from a previous test)
				login("andy", "pass", function(user){
					if(user){
						ffInviteUser(fitfix._id, "carl", function(ffinvite){
							if(ffinvite){
								ffInviteUser(fitfix._id, "carl", function(ffinvite2){
									if(ffinvite2){
										console.log("Inviting a user to a FitFix twice FAILED");
									}
									else{
										console.log("Inviting a user to a FitFix twice PASSED");
									}
								});
							}
							else{
								console.log("Something went wrong in creating the fitfix (user) invite!");
							}
						});
					}
					else{
						console.log("Something went wrong with getting the current user!");
					}
				});
			});	
		}
		else{
			console.log("Something went wrong with creating a new user (carl)!");
		}
		test_ffInviteUserSelf(fitfix);
	});
}

//Tests one user inviting itself to a FitFix. A FitFix invite should not be created in this case.
var test_ffInviteUserSelf = function(fitfix){
	getCurrentUser(function(user){
		ffInviteUser(fitfix._id, user.local.username, function(ffinvite){
			if(ffinvite){
				console.log("Inviting self to a FitFix FAILED");
			}
			else{
				console.log("Inviting self to a FitFix PASSED");
			}
		});
		test_ffInviteUserNone(fitfix);
	});
}

//Tests inviting a non existant user to a FitFix. A fitfix invite should not be created in this case.
var test_ffInviteUserNone = function(fitfix){
	ffInviteUser(fitfix._id, "asdfasfasf", function(ffinvite){
		if(ffinvite){
			console.log("Inviting a non existent user to a FitFix FAILED");
		}
		else{
			console.log("Inviting a non existent user to a FitFix PASSED");
		}
		tset_ffInviteGroupTwice(fitfix);
	});
}

//Test inviting a group to a FitFix twice. Only one FitFix invite should be created for each user to this FitFix.
var test_ffInviteGroupTwice = function(fitfix){
	//First create a random group
	addGroup("FH", "floor hockey club!", function(group){
		//Create a random FitFix
		var date = new Date();
		addFitFix(date, 60, 0, "Floor hockey", "floor hockey", "walker", "hockey", function(ff){
			//Add the group to the FitFix
			ffInviteGroup(fitfix._id, group.name, function(ffinvite){
				if(ffinvite){
					ffInviteGroup(fitfix._id, group.name, function(ffinvite2){
						if(ffinvite2){
							console.log("Inviting a group to a FitFix twice FAILED");
						}
						else{
							console.log("Inviting a group to a FitFix twice PASSED");
						}
					});
				}
				else{
					console.log("Something went wrong in inviting a group to a FitFix");
				}
			});
		});
		test_ffInviteGroupNone(fitfix);
	});
}

//Test inviting a non-existant group to a FitFix. Should not create any FitFix invites.
var test_ffInviteGroupNone = function(fitfix){
	ffInviteGroup(fitfix._id, "asdfasfasf", function(ffinvite){
		if(ffinvite){
			console.log("Inviting a non-existent group to a FitFix FAILED");
		}
		else{
			console.log("Inviting a non-existent group to a FitFix PASSED");
		}
	});
}

//Test inviting a user to a group twice. Only one group invite should be created.
var test_groupInviteUserTwice = function(group){
	addUser("bob@mit.edu", "bob", "pass", function(bob){
		if(bob){
			logout(function(u){
				//Try to invite a user twice
				//First login a different user (from a previous test)
				login("andy", "pass", function(user){
					if(user){
						groupInviteUser("bob", group.name, function(ginvite){
							if(ginvite){
								groupInviteUser("bob", group.name, function(ginvite2){
									if(ginvite2){
										console.log("Inviting a user to a group twice FAILED");
									}
									else{
										console.log("Inviting a user to a group twice PASSED");
									}
								});
							}
							else{
								console.log("Something went wrong in creating the group (user) invite!");
							}
						});
					}
					else{
						console.log("Something went wrong with logging in a current user!");
					}
				});
			});	
		}
		else{
			console.log("Something went wrong with creating a new user (bob)!");
		}
		test_groupInviteUserNone(group);
	});
}

//Tests inviting a non-existent user to a group. No group invites should be created.
var test_groupInviteUserNone = function(group){
	groupInviteUser("asdfasdfasdf", group.name, function(ginvite){
		if(ginvite){
			console.log("Inviting a non-existent user to a group FAILED");
		}
		else{
			console.log("Inviting a non-existent user to a group PASSED");
		}
	});
}

//Tests editing the current user's username.
var test_editUsername = function(){
	getCurrentUser(function(user){
		editUsername("joey", function(newuser){
			if(newuser.local.username === "joey"){
				console.log("Editing the current user's username PASSED");
			}
			else{
				console.log("Editing the current user's username FAILED")
			}
		});
		test_logout();
	});
};

var test_logout = function(){
	logout(function(user){});
}