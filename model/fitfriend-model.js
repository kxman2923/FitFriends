var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/*
Schema for FitFriend users. Users will have a email, username, and password associated with their account.
FitFriends only accept valid MIT emails. Schema also includes the FitFixes and groups the user is a part of.
*/
var userSchema = mongoose.Schema({
	email: {type: String, required: true},
	local:{
		username: {type: String, required: true, unique: true, lowercase: true},
		password: {type: String, required: true}
	},
	fitfixes: [{type: mongoose.Schema.Types.ObjectId, ref:'Fitfix'}],
	groups: [{type: mongoose.Schema.Types.ObjectId, ref:'Group'}],
	ffinvites: [{type: mongoose.Schema.Types.ObjectId, ref:'FFInvite'}],
	ginvites: [{type: mongoose.Schema.Types.ObjectId, ref: 'GroupInvite'}]
});

/*
Schema for FitFix (event). Events have a author associated with it. To describe when the event occurs and for how long,
the model keeps track of the that start date/time (included in the startDate object), the duration of the FitFix (
in terms of hours/minutes), and the number of weeks the FitFix is occuring (for weekly/monthly events). The model also
describes the type of activity involved in the FitFix, as well as a public description and a location for where the event
takes place.
*/
var fitfixSchema = new mongoose.Schema({
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	title: String,
	startDate: Date,
	duration: Number,
	numWeeks: Number,
	description: {type: String, default: ""},
	location: String,
	type: String,
});

/* 
Schema for a group in FitFriends. A group contains one or more users. To distinguish groups, each group must 
have a name. A public description is also included.
*/
var groupSchema = new mongoose.Schema({
	name: String,
	description: {type: String, default: ""},
	members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

/*
Schema for a invite to a FitFix. This models what type of FitFix the invitation is for, 
who sent the invite, who received the invite, and if the receiver has accepted the invite. 
If the receiver (invitee) accepted, mark True. If declined, delete the entry from the database.
Otherwise, mark False (no response).
*/
var fitfixInvite = new mongoose.Schema({
	fitfix: {type: mongoose.Schema.Types.ObjectId, ref: 'Fitfix'},
	inviter: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	invitee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	accepted: {type: Boolean, default: false}
});

/*
Schema for a invite to a group. This models which group the invitation is for, 
who sent the invite, who received the invite, and if the receiver has accepted the invite. 
If the receiver (invitee) accepted, mark True. If declined, delete the entry from the database.
Otherwise, mark False (no response).
*/
var groupInvite = new mongoose.Schema({
	group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
	inviter: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	invitee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	accepted: {type: Boolean, default: false}
});

/*
Schema for a series. A series is a collection of FitFixes that have the same type, author,
and description, but occur on different weeks. For example, to model a FitFix that occurs every Tuesday
for a whole semester, a series will be used to group those FitFixes to model a weekly occurrence.
*/
var series = new mongoose.Schema({
	fitfixes: [{type: mongoose.Schema.Types.ObjectId, ref:'Fitfix'}],
});


exports.Fitfix = mongoose.model('Fitfix', fitfixSchema);
exports.Group = mongoose.model('Group', groupSchema);
exports.FFInvite = mongoose.model('FFInvite', fitfixInvite);
exports.GroupInvite = mongoose.model('GroupInvite', groupInvite);
exports.Series = mongoose.model('Series', series);
module.exports.User = mongoose.model('User', userSchema);



