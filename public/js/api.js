/*
User stuff
*/
var addUser = function(email, username, password, callback){
	$.ajax({
		url: "/users/",
		type: "POST",
		data: {email: email, username: username:, password: password},
		datatype: "json",
		success:function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in adding the new user!");
		}
	});
}

var login = function(username, password, callback){
	$.ajax({
		url: "/users/login",
		type: "POST",
		data: {username: username:, password: password},
		datatype: "json",
		success:function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in logging in the user!");
		}
	});
}

var getCurrentUser = function(callback){
	$.ajax({
		url: "/users/current",
		type: "GET",
		datatype: "json",
		success:function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in getting the current user!");
		}
	});
}

var logout = function(callback){
	$.ajax({
		url: "/users/logout",
		type: "POST",
		datatype: "json",
		success:function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in logging out the user!");
		}
	});
}

var editUsername = function(newun, callback){
	$.ajax({
		url: "/users/editUsername",
		type: "POST",
		data: {username: newun},
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in editing this user's username!");
		}
	});
}

/*
Fitfix stuff
*/

var addFitFix = function(startDate, duration, numWeeks, title, description, location, type, callback){
	$.ajax({
		url: "/fitfix/addFitFix",
		type: "POST",
		data: {startDate: startDate, duration: duration, numWeeks: numWeeks, title: title, description: description,
			location: location, type: type},
		datatype: "json",
		success: function(data){
			callback(data);
		},
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in creating a FitFix!!!");
		}
	});
}

var getFitFix= function(ffid, callback){
	$.ajax({
		url: "/fitfix/"+ffid,
		type: "GET",
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in getting the Fitfix!");
		}
	});
}

var deleteFitFix= function(ffid, callback){
	$.ajax({
		url: "/fitfix/"+ffid,
		type: "DELETE",
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in deleting the Fitfix!");
		}
	});
}

var changeTitle = function(ffid, newtitle, callback){
	$.ajax({
		url: "/fitfix/changeTitle"+ffid,
		type: "POST",
		data: {title: newtitle},
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in deleting the Fitfix!");
		}
	});
}

var ffInviteUser = function(ffid, username, callback){
	$.ajax({
		url: "/fitfix/inviteUser/"+ffid,
		type: "POST",
		data: {username: username},
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in inviting the user to a event!");
		}
	});
}

var ffInviteGroup = function(ffid, groupname, callback){
	$.ajax({
		url: "/fitfix/inviteGroup/"+ffid,
		type: "POST",
		data: {groupname: groupname},
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in inviting the group to a event!");
		}
	});
}

var ffRemoveUserInvite = function(ffid, username, callback){
	$.ajax({
		url: "/fitfix/removeUserInvite/"+ffid,
		type: "POST",
		data: {username: username},
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in removing the user from the Fitfix invite list!");
		}
	});
}

/*
Group stuff
*/
var addGroup = function(groupname, description, callback){
	$.ajax({
		url: "/group/addGroup",
		type: "POST",
		data: {groupname: groupname, description: description},
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in creating the group!!!!");
		}
	});
}

var getGroup = function(gid, callback){
	$.ajax({
		url: "/group/"+gid,
		type: "GET",
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in getting the group!!!!");
		}
	});
}

var deleteGroup = function(gid, callback){
	$.ajax({
		url: "/group/"+gid,
		type: "DELETE",
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in deleting the group!!!!");
		}
	});
}

var groupInviteUser = function(username, groupname, callback){
	$.ajax({
		url: "/group/inviteUser",
		type: "POST",
		data: {username: username, groupname: groupname},
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in inviting the user to the group!!!!");
		}
	});
}

var groupRemoveUser = function(gid,username, callback){
	$.ajax({
		url: "/group/deleteUser/"+gid,
		type: "POST",
		data: {username: username},
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in removing the user from the group!!!!");
		}
	});
}

var groupRemoveUserInvite = function(username, groupname, callback){
	$.ajax({
		url: "/group/removeUserInvite",
		type: "POST",
		data: {username: username, groupname: groupname},
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in removing the user from the group invite list!!!!");
		}
	});
}

var addMember = function(gid, username, callback){
	$.ajax({
		url: "/group/addUser/"+gid,
		type: "POST",
		data: {username: username},
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in adding the user to the group!!!!");
		}
	});
}

var editGroupDescription = function(gid, newdesc, callback){
	$.ajax({
		url: "/group/editDescription/"+gid,
		type: "POST",
		data: {description: newdesc},
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in creating a new description for the group!!!!");
		}
	});
}
var editGroupName = function(gid, newname, callback){
	$.ajax({
		url: "/group/editName/"+gid,
		type: "POST",
		data: {name: newname},
		datatype: "json",
		success: function(data){
			callback(data);
		}
		error: function(xhr, status, err){
			console.log(err);
			console.log("Error in creating a new name for the group!!!!");
		}
	});
}


