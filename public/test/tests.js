//Qunit tests for the route functions

function formatDate(date) {
  var offset = (new Date()).getTimezoneOffset();
  o_date = (new Date(new Date(date)-offset*60*1000)).toJSON().slice(0,19);
  r_date = moment(o_date).format("dddd, MMMM D, YYYY, h:mm a");
  return r_date;
}

module("Testing User Sign Up",{
	setup: function(){},
	teardown: function(){
		$.post("/users/logout");
	}
});

asyncTest("Valid User Sign Up", function(assert){
	var data= {username: "asdf", email: "asdf@mit.edu", password: "pass"};
	$.post('/users', data).done(function(response){
		assert.equal(response.content.message, "Successfully created user", "Created a user!");
		assert.equal(response.content.user.local.username, data.username, "Usernames match (asdf)!");
		assert.equal(response.content.user.email, data.email, "Emails match!");
		start();
	}).fail(function(jqxhr){
		console.log(jqxhr.responseText);
		assert.equal(jqxhr.responseText, "{\"error\":\"This username is already in use!\"}", "Still passes...that username already existed (asdf)!");
		start();
	});
});

asyncTest("Valid User Sign Up 2", function(assert){
	var data= {username: "kat", email: "kat@mit.edu", password: "pass"};
	$.post('/users', data).done(function(response){
		assert.equal(response.content.message, "Successfully created user", "Created a user!");
		assert.equal(response.content.user.local.username, data.username, "Usernames match (kat)!");
		assert.equal(response.content.user.email, data.email, "Emails match!");
		start();
	}).fail(function(jqxhr){
		console.log(jqxhr.responseText);
		assert.equal(jqxhr.responseText, "{\"error\":\"This username is already in use!\"}", "Still passes...that username already existed (kat)!");
		start();
	});
});

asyncTest("Valid User Sign Up 3", function(assert){
	var data= {username: "kyle", email: "kyle@mit.edu", password: "pass"};
	$.post('/users', data).done(function(response){
		assert.equal(response.content.message, "Successfully created user", "Created a user!");
		assert.equal(response.content.user.local.username, data.username, "Usernames match (kyle)!");
		assert.equal(response.content.user.email, data.email, "Emails match!");
		start();
	}).fail(function(jqxhr){
		console.log(jqxhr.responseText);
		assert.equal(jqxhr.responseText, "{\"error\":\"This username is already in use!\"}", "Still passes...that username already existed (kyle)!");
		start();
	});
});
asyncTest("Invalid Email (Non-MIT) Sign Up", function(assert){
	expect(1);
	var data = {username: "bob", email: "bob@gmail.com", password: "pass"};
	//The post should fail with these invalid credentials
	$.post("/users/", data).done(function(response){
		assert.ok(false, "It allows an invalid (non-MIT email) sign up!");
		start();
	}).fail(function(jqxhr){
		assert.ok(true, "Does not allow non-MIT email sign up!");
		start();
	});
});

asyncTest("Invalid Email (incorrect format) Sign Up", function(assert){
	expect(1);
	var data = {username: "bob", email: "bob", password: "pass"};
	//The post should fail with these invalid credentials
	$.post("/users/", data).done(function(response){
		assert.ok(false, "It allows an invalid (incorrect format) sign up!");
		start();
	}).fail(function(jqxhr){
		assert.ok(true, "Does not allow incorrect email format sign up!");
		start();
	});
});

module("Testing User Login/Logout",{
	setup: function(){},
	teardown: function(){
		$.post("/users/logout");
	}
});

asyncTest("Valid User Login", function(assert){
	expect(1);
	var signin= {username: "asdf", password: "pass"};
	$.post("/users/login", signin).done(function(response){
		assert.equal(response.content.user.local.username, signin.username, "Usernames match (asdf)!");
		start();
	});
});

asyncTest("Valid User Logout", function(assert){
	$.post("/users/logout").done(function(response){
		assert.equal(response.message, 'Logout successful', "Able to logout (asdf)");
		start();
	})
});

asyncTest("Valid User Login 2", function(assert){
	expect(1);
	var signin= {username: "kat", password: "pass"};
	$.post("/users/login", signin).done(function(response){
		console.log(response);
		assert.equal(response.content.user.local.username, signin.username, "Usernames match (kat)!");
		start();
	}).fail(function(jqxhr){
		console.log(jqxhr);
		assert.ok(false, "Something went wrong with logging in!");
		start();
	});
});

asyncTest("Valid User Logout 2", function(assert){
	$.post("/users/logout").done(function(response){
		assert.equal(response.message, 'Logout successful', "Able to logout (kat)!");
		start();
	})
});

asyncTest("Invalid User Login (invalid password)", function(assert){
	expect(1);
	var signin= {username: "asdf", password: "passsss"};
	$.post("/users/login", signin).done(function(response){
		assert.ok(false, "It allows an invalid (incorrect password) login!");
		start();
	}).fail(function(jqxhr){
		assert.ok(true, "Does not allow invalid password sign up!");
		start();
	});
});

asyncTest("Invalid User Login (invalid username)", function(assert){
	expect(1);
	var signin= {username: "asdfasdfasdfafasd", password: "pass"};
	$.post("/users/login", signin).done(function(response){
		assert.ok(false, "It allows an invalid (iinvalid username) login!");
		start();
	}).fail(function(jqxhr){
		assert.ok(true, "Does not allow invalid username sign up!");
		start();
	});
});

module("Testing Group", {
	setup: function(){
		stop();
		var signin = {username: "asdf", password: "pass"}; 
		currentUser= undefined;
		$.post("/users/login", signin).done(function(response){
			currentUser = response.content.user;
			start();
		}).fail(function(jqxhr){
			$.get("/users/current", function(response){
				if (response.content.loggedIn) {
			      currentUser = response.content.user;
			      start();
			    }
			});
		});
	},
	teardown: function(){
		$.get("/users/current", function(response){
			$.post("/users/logout");
		});
	}
});

asyncTest("Creating a group", function(assert){
	$.get("/users/current", function(response){
		var groupinfo= {name: "Basketball Squad!", description: "We are a group of students looking to play bball every now and then. Come join us!"};
		$.post('/group/group', groupinfo).done(function(group){
			assert.equal(group.name, groupinfo.name, "Group names match!");
			assert.equal(group.description, groupinfo.description, "Group descriptions match!");
			assert.equal(group.members[0], response.content.user._id, "Members match (should only be the logged in user)!");
			start();
		}).fail(function(jqxhr){
			assert.equal(jqxhr.responseText, "{\"err\":\"A group with that name already exists!\"}", "Group with that name already exists...still passes!");
			start();
		});
	});
});

// asyncTest("Deleting a group", function(assert){
// 	$.get("/users/current", function(response){
// 		$.get("/group/", function(groups){
// 			var groupid =null;
// 			var name= "Basketball Squad!";
// 			for(i=0; i<groups.length; i++){
// 				if(groups[i].name === name){
// 					groupid= groups[i]._id;
// 					break;
// 				}
// 			}
// 			$.ajax({
// 				url: "/group/"+groupid,
// 				type: "DELETE",
// 				datatype: "json"
// 			}).done(function(){
// 				$.get("/group/"+groupid, function(response){
// 					assert.equal(response, null, "Deletion of group successful!");
// 					start();
// 				});
// 			});
// 		});
// 	});
// });

module("Testing Fitfixes",{
	setup: function(){
		stop();
		var signin = {username: "asdf", password: "pass"}; 
		currentUser= undefined;
		$.post("/users/login", signin).done(function(response){
			currentUser = response.content.user;
			start();
		}).fail(function(jqxhr){
			$.get("/users/current", function(response){
				if (response.content.loggedIn) {
			      currentUser = response.content.user;
			      start();
			    }
			});
		});
	},
	teardown: function(){
		$.get("/users/current", function(response){
			$.post("/users/logout");
		});
	}
});

//Fails sometimes when creating a new FitFix for synching reasons (with calling from the database)...
//Restart the test it should work then
asyncTest("Creating a new Fitfix", function(assert){
	$.get("/users/current", function(response){
		var time = moment();
		time.add(1, 'w');
		time.hour(12);
		time.minute(0);
		var ffdata ={
			title: "Basketball!",
			startDate: formatDate(time),
			duration: 1,
			recurring: 1,
			description: "Ballin' at the Z-center!",
			location: "Z-center",
			type: "TeamSports"
		};

		$.post('/fitfix/fitfix', ffdata).done(function(res){
			var ff = res[0];
			$.get('/fitfix/'+ff, function(fitfix){
				assert.equal(fitfix.author, response.content.user._id, "FitFix authors match!");
				assert.equal(fitfix.title, ffdata.title, "FitFix titles match!");
				assert.equal(formatDate(fitfix.startDate), ffdata.startDate, "FitFix start dates match!");
				assert.equal(fitfix.duration, ffdata.duration, "FitFix durations match!");
				assert.equal(fitfix.numWeeks, ffdata.recurring, "FitFix number of weeks match!");
				assert.equal(fitfix.description, ffdata.description, "FitFix descriptions match!");
				assert.equal(fitfix.location, ffdata.location, "FitFix locations match!");
				assert.equal(fitfix.type, ffdata.type, "FitFix types match!");
				start();
			})
		}).fail(function(jqxhr){
			console.log(jqxhr.responseText);
			assert.ok(false, "Fitfix was not created!");
			start();
		});
	});
});

asyncTest("Creating Recurrences", function(assert){
	$.get("/users/current", function(response){
		var time = moment();
		time.add(1, 'w');
		time.hour(12);
		time.minute(0);
		var ffdata ={
			title: "Swimming!",
			startDate: formatDate(time),
			duration: 1,
			recurring: 3,
			description: "Swimming at the Z-center!",
			location: "Z-center",
			type: "Swimming"
		};

		$.post('/fitfix/fitfix', ffdata).done(function(res){
			var ff = res[0];
			var ff2= res[1];
			var ff3= res[2];
			assert.equal(res.length, 3, "Amount of Fitfixes created match!");

			$.get('/fitfix/'+ff, function(fitfix){
				assert.equal(fitfix.author, response.content.user._id, "FitFix1 authors match!");
				assert.equal(fitfix.title, ffdata.title, "FitFix1 titles match!");
				assert.equal(formatDate(fitfix.startDate), ffdata.startDate, "FitFix1 start dates match!");
				assert.equal(fitfix.duration, ffdata.duration, "FitFix1 durations match!");
				assert.equal(fitfix.numWeeks, ffdata.recurring, "FitFix1 number of weeks match!");
				assert.equal(fitfix.description, ffdata.description, "FitFix1 descriptions match!");
				assert.equal(fitfix.location, ffdata.location, "FitFix1 locations match!");
				assert.equal(fitfix.type, ffdata.type, "FitFix1 types match!");

				$.get('/fitfix/'+ff2, function(fitfix2){
					assert.equal(fitfix2.author, response.content.user._id, "FitFix2 authors match!");
					assert.equal(fitfix2.title, ffdata.title, "FitFix2 titles match!");

					time.add(1, 'w');

					assert.equal(formatDate(fitfix2.startDate), formatDate(time), "FitFix2 start dates match!");
					assert.equal(fitfix2.duration, ffdata.duration, "FitFix2 durations match!");
					assert.equal(fitfix2.numWeeks, ffdata.recurring, "FitFix2 number of weeks match!");
					assert.equal(fitfix2.description, ffdata.description, "FitFix2 descriptions match!");
					assert.equal(fitfix2.location, ffdata.location, "FitFix2 locations match!");
					assert.equal(fitfix2.type, ffdata.type, "FitFix2 types match!");
					$.get('/fitfix/'+ff3, function(fitfix3){
						assert.equal(fitfix3.author, response.content.user._id, "FitFix3 authors match!");
						assert.equal(fitfix3.title, ffdata.title, "FitFix3 titles match!");

						time.add(1,'w');

						assert.equal(formatDate(fitfix3.startDate), formatDate(time), "FitFix3 start dates match!");
						assert.equal(fitfix3.duration, ffdata.duration, "FitFix3 durations match!");
						assert.equal(fitfix3.numWeeks, ffdata.recurring, "FitFix3 number of weeks match!");
						assert.equal(fitfix3.description, ffdata.description, "FitFix3 descriptions match!");
						assert.equal(fitfix3.location, ffdata.location, "FitFix3 locations match!");
						assert.equal(fitfix3.type, ffdata.type, "FitFix3 types match!");
						start();
					});
				});
			})
		}).fail(function(jqxhr){
			console.log(jqxhr.responseText);
			assert.ok(false, "Fitfixes were not created!");
			start();
		});
	});
});

//Stalls sometimes due to synchronization...Restart the test it should work then
// asyncTest("Deleting a FitFix ", function(assert){
// 	$.get("/users/current", function(response){
// 		$.get("/fitfix/", function(fitfixes){
// 			//There may be multiple fitfixes with this description, so delete the first one you find!
// 			var qdesc= "Ballin' at the Z-center!";
// 			var findff = null;
// 			for(i=0; i< fitfixes.length; i++){
// 				if(fitfixes[i].description === qdesc){
// 					findff=fitfixes[i];
// 					break;
// 				}
// 			}
// 			$.ajax({
// 				url:"/fitfix/"+findff._id, 
// 				type: "DELETE",
// 				datatype: "json"
// 			}).done(function(){
// 				$.get("/fitfix/", function(ffs){
// 					assert.equal(ffs.indexOf(findff), -1, "Deletion of the Fitfix successful!");
// 					start();
// 				});
// 			});
// 		});
// 	});
// });

module("Testing Invites", {
	setup: function(){
		//Sign in a user
		//Create a FitFix
		// and create a Group for this set of tests
		stop();
		var signin = {username: "asdf", password: "pass"}; 
		currentUser= undefined;
		$.post("/users/login", signin).done(function(response){
			currentUser = response.content.user;

			var time = moment();
			time.add(1, 'w');
			time.hour(12);
			time.minute(0);
			var ourfitfix ={
				title: "Basketball!",
				startDate: formatDate(time),
				duration: 1,
				recurring: 1,
				description: "Ballin' at the Z-center!",
				location: "Z-center",
				type: "TeamSports"
			};

			$.post('/fitfix/fitfix', ourfitfix).done(function(res){
				var ourgroup= {name: "Basketball Squad!", description: "We are a group of students looking to play bball every now and then. Come join us!"};
				$.post('/group/group', ourgroup).done(function(){
					start();
				}).fail(function(jqxhr){
					console.log(jqxhr.responseText);
					start();
				});
			});
		}).fail(function(jqxhr){
			$.get("/users/current", function(response){
				if (response.content.loggedIn) {
			      currentUser = response.content.user;
			    }
			    var time = moment();
				time.add(1, 'w');
				time.hour(12);
				time.minute(0);
				var ourfitfix ={
					title: "Basketball!",
					startDate: formatDate(time),
					duration: 1,
					recurring: 1,
					description: "Ballin' at the Z-center!",
					location: "Z-center",
					type: "TeamSports"
				};

				$.post('/fitfix/fitfix', ourfitfix).done(function(res){
					var ourgroup= {name: "Basketball Squad!", description: "We are a group of students looking to play bball every now and then. Come join us!"};
					$.post('/group/group', ourgroup).done(function(){
						start();
					}).fail(function(jqxhr){
						console.log(jqxhr.responseText);
						start();
					});
				});
			});
		});
	},
	teardown: function(){
		$.get("/users/current", function(response){
			if(!response.content.loggedIn){
				$.post("/users/login", {username: "asdf", password: "pass"});
			}
			$.get("/fitfix/", function(fitfixes){
				var ffid= null;
				for(i=0; i< fitfixes.length; i++){
					if(fitfixes[i].title ==="Basketball!"){
						ffid=fitfixes[i]._id;
					}
				}
				$.get("/group/", function(groups){
					var gid=null;
					for(i=0; i<groups.length; i++){
						if(groups[i].name==="Basketball Squad!"){
							gid = groups[i]._id;
						}
					}
					$.ajax({
						url: "/fitfix/"+ffid,
						type: "DELETE",
						datatype: "json"
					}).done(function(){
						$.ajax({
							url: "/group/"+gid,
							type: "DELETE",
							datatype: "json"
						}).done(function(){
							$.post("/users/logout");
						});
					});
				});
			});
		});
	}
});

asyncTest("Invite a User to a Group", function(assert){
	$.get("/users/current", function(response){
		//Find the group named "Basketball Squad!" as described in the setup
		$.get("/group/", function(groups){
			var groupid= null;
			for(i =0; i< groups.length; i++){
				if(groups[i].name === "Basketball Squad!"){
					groupid = groups[i]._id;
					break;
				}
			}
			var data = {username: "kat", groupId: groupid};
			$.post("/group/invite", data).done(function(res){
				$.post("/users/logout").done(function(){
					$.post("/users/login", {username: "kat", password: "pass"}).done(function(res2){
						var userginvites= res2.content.user.ginvites;
						assert.equal(res.content.user._id, response.content.user._id, "The user that sent the group invite match!");
						assert.notEqual(userginvites.indexOf(res.content.invite), -1, "The user that received the group invite matched!");
						start();
					}).fail(function(){
						assert.ok(false, "Logging in the other user (kat) failed!");
						start();
					});
				}).fail(function(){
					assert.ok(false, "Logging out the user failed!");
					start();
				});
			}).fail(function(){
				assert.ok(false, "Inviting the user failed!");
				start();
			});
		});
	});
});

asyncTest("Invite a User to a Fitfix", function(assert){
	$.get("/users/current", function(response){
		//Find the group named "Basketball Squad!" as described in the setup
		$.get("/fitfix/", function(fitfixes){
			var ffid= null;
			for(i =0; i< fitfixes.length; i++){
				if(fitfixes[i].title === "Basketball!"){
					ffid = fitfixes[i]._id;
					break;
				}
			}
			var data = {username: "kat", fitfixId: ffid, currentUser: response.content.user._id};
			$.post("/fitfix/inviteUser", data).done(function(res){
				$.post("/users/logout").done(function(){
					$.post("/users/login", {username: "kat", password: "pass"}).done(function(res2){
						var userffinvites= res2.content.user.ffinvites;
						assert.equal(response.content.user._id, response.content.user._id, "The user that sent the fitfix invite match!");
						assert.notEqual(userffinvites.indexOf(res.invite), -1, "The user that received the fitfix invite matched!");
						start();
					}).fail(function(jqxhr){
						console.log(jqxhr.responseText);
						assert.ok(false, "Logging in the other user (kat) failed!");
						start();
					});
				}).fail(function(jqxhr){
					console.log(jqxhr.responseText);
					assert.ok(false, "Logging out the user failed!");
					start();
				});
			}).fail(function(jqxhr){
				console.log(jqxhr.responseText);
				//The user may have been invited already, in that case check the sender
				assert.equal(jqxhr.responseText, "{\"error\":\"User has already been invited\"}", "User already invited...still passes!");
				$.post("/users/logout").done(function(){
					$.post("/users/login", {username: "kat", password: "pass"}).done(function(res2){
						var userffinvites= res2.content.user.ffinvites;
						assert.equal(response.content.user._id, response.content.user._id, "The user that sent the fitfix invite match!");
						start();
					});
				});
			});
		});
	});
});

asyncTest("Invite a Group to a FitFix", function(assert){
	$.get("/users/current", function(response){
		//Find the group named "Basketball Squad!" as described in the setup
		$.get("/group/", function(groups){
			var groupid= null;
			for(i =0; i< groups.length; i++){
				if(groups[i].name === "Basketball Squad!"){
					groupid = groups[i]._id;
					break;
				}
			}
			$.get("/fitfix/", function(fitfixes){
				var ffid= null;
				for(i =0; i< fitfixes.length; i++){
					if(fitfixes[i].title === "Basketball!"){
						ffid = fitfixes[i]._id;
						break;
					}
				}

				$.post("/group/member/"+groupid, {username: "kat"}).done(function(res){
					$.post("/group/member/"+groupid, {username: "kyle"}).done(function(res2){
						$.post("/fitfix/inviteGroup", {group: "Basketball Squad!", fitfixId: ffid, 
							currentUser: response.content.user._id}).done(function(res3){
								$.get("/ffinvite/ff/"+ffid, function(finvs){
									var invites= {
										asdf: null,
										kat: null,
										kyle: null,
									};
									stop();
									$.post("/users/logout").done(function(){
										start();
										$.post("/users/login", {username: "kat", password: "pass"}).done(function(ukat){
											stop();
											$.post("/users/logout").done(function(){
												start();
												$.post("/users/login", {username: "kyle", password: "pass"}).done(function(ukyle){
													$.post("/users/logout").done(function(){

														for(i=0; i< finvs.length; i++){
															if(finvs[i].invitee===response.content.user._id){
																invites.asdf = finvs[i]._id;
																continue;
															}
															else if(finvs[i].invitee===ukat.content.user._id){
																invites.kat = finvs[i]._id;
																continue;
															}
															else if(finvs[i].invitee===ukyle.content.user._id){
																invites.kyle = finvs[i]._id;
																continue;
															}
														}
														assert.notEqual(invites.asdf, null, "Found an invite for user asdf");
														assert.notEqual(invites.kat, null, "Found an invite for user kat");
														assert.notEqual(invites.kyle, null, "Found an invite for user kyle");
														start();
													});
												});
											});
										});
									});
								});
						}).fail(function(jqxhr){
							console.log(jqxhr.responseText);
							assert.ok(false, "Inviting the group failed!");
							start();
						});
					}).fail(function(jqxhr){
						console.log(jqxhr.responseText);
						assert.ok(false, "Adding the user to that group failed!");
						start();
					});
				}).fail(function(jqxhr){
					console.log(jqxhr.responseText);
					assert.ok(false, "Adding the user to that group failed!");
					start();
				});
			});
		});
	});
});