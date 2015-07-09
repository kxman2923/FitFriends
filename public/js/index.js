currentUser = undefined;
Handlebars.registerPartial('fitfix-preview', Handlebars.templates['fitfix-preview']);

$(document).ready(function() {
  //see if the current user is logged in, and if so, redirect to feed page
  $.get('/users/current', function(response) {
    if (response.content.loggedIn) {
      currentUser = response.content.user;
      loadFeed(); //redirect to main feed
    }
    else {
      loadPage('welcome');
    }
  });
});



var loadPage = function(template, data) {
  data = data || {};
  var temp = Handlebars.templates[template](data)
  $('#main-container').html(temp);
};


var populateNav = function() {
  $.get('/users/groups', function(response){
    var groups = response.groups
      var part1 = "<div id ='nav-items' <ul class='navbar-nav nav'> \
      <ul class='nav navbar-nav navbar-right'>\
      <li><a href='#' id = 'profile-button'>Profile</a></li>\
      <li><a href='#' id = 'search-button'>Search FitFixes</a></li>\
      <li><a href='#' id='logout-link'>Logout</a></li></ul>\
      <li class='dropdown'>\
      <a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'> Groups \
      <span class='caret'></span></a>\
      <ul class='dropdown-menu' id = 'groups-dropdown' role='menu'>"
      for (var i = 0; i < groups.length ; i++) {
        var group = groups[i];
        part1 = part1 + "<li><href ='#' class = 'group-button btn' id= '" + group._id + "' >" + group.name + "</a></li>"
      }
      part1 = part1 +"</ul>\
  </li>\
  </ul></div>"
  $("#logged-in-nav").replaceWith(part1);
  })
}


function formatDate(date) {
  var offset = (new Date()).getTimezoneOffset();
  o_date = (new Date(new Date(date)-offset*60*1000)).toJSON().slice(0,19);
  r_date = moment(o_date).format("dddd, MMMM D, YYYY, h:mm a");
  return r_date;
}

var loadFeed = function() {
  populateNav();
  $.when(
    $.get('/users/fitfixes', function(ffs){
      var ffs = ffs;
    }),
    $.get('/fitfix', function(fitfixes){
      var fitfixes = fitfixes;
    }),
    $.get('/users/recommendations', function(recommends){
      var recommends = recommends;
      console.log(recommends)
    }),
    $.get('/users/groups', function(groups){
      var groups = groups;
    })    
    ).then(function(ffs, fitfixes, recommends, groups){
        var ffs = ffs[0];
        var fitfix = fitfixes[0];
        var recommends = recommends[0];
        var groups = groups[0];
        var ff_ids = [];
        var upcoming = [];
        for(var i=0; i < ffs.fitfixes.length; i++){
          ff_ids.push(ffs.fitfixes[i]._id);
        }
        for(var i=0; i < fitfix.length; i++){
          var ff = fitfix[i];
          ff.isAuthor = false;
          ff.notCommitted = true;   
          if($.inArray(ff._id, ff_ids) > -1){
            ff.notCommitted = false;
          }
          if(ff.author === currentUser._id){
            ff.isAuthor = true;
          }
          var startDate = formatDate(ff.startDate);
          var newMoment = moment(ff.startDate);
          if(newMoment > moment()){
            ff.startDate = newMoment.format("dddd, MMMM D, YYYY, h:mm a");
            ff.startDate = startDate;
            ff.endDate = newMoment.add(ff.duration, 'h');
            upcoming.push(ff);
          }
      }
        for(var i=0; i < recommends.recs.length; i++){
          var r = recommends.recs[i];
            r.startDate = formatDate(r.startDate);
            r.notCommitted = true;
            r.isAuthor = false;
            if($.inArray(r._id, ff_ids) > -1){
              r.notCommitted = false;
            }
            if(r.author === currentUser._id){
              r.isAuthor = true;
            }
          }
      loadPage('feed', {fitfix:upcoming, currentUser:currentUser, recommendations: recommends.recs,
                        groups:groups.groups});
    });

    
}

var loadHomePage = function(){
    loadPage('welcome');
};



//load the login form
$(document).on('click', '#login-btn', function(evt) {
  evt.preventDefault();
  loadPage('login');
});

//load the signup form
$(document).on('click', '#signup-btn', function(evt) {
  evt.preventDefault();
  loadPage('signup');
});

$(document).on('click', '#logo', function(evt) {
  evt.preventDefault();
  $.get('/users/current', function(response) {
    if (response.content.loggedIn) {
      loadFeed(); //redirect to main feed
    }
  });
});

//logout the user
$(document).on('click', '#logout-link', function(evt) {
  evt.preventDefault();
  $.post(
    '/users/logout'
  ).done(function(response) {
    currentUser = undefined;
    $("#nav-items").remove();
    loadPage('welcome');
  }).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
    loadFeedPage({error: response.err});
  });
});


//trying out when
$(document).on('click', '#profile-button', function(evt){
  evt.preventDefault();
  $.when(
    $.get('/users/ginvites', function(groupInvite){
      var groupInvites = groupInvite;
      console.log(groupInvites, "gi")
    }),

    $.get('/users/finvites', function(fitFixInvite){
      var fitFixInvites = fitFixInvite;
      console.log(fitFixInvites, "fi")
    }),

    $.get('/users/groups', function(groups){
      var groups = groups;
      console.log(groups,"gourps")
    }),

    $.get('/users/fitfixes', function(fitfixes){
      var fitfixes = fitfixes;
      console.log(fitfixes, "ff")
    }),
    $.get('users/stats', function(stats) {
    var stats = stats; 
    })       
    ).then(function(groupInvites, fitFixInvites, groups, fitfixes, stats){
      console.log(stats,"stats");
      var upcoming = [];
      for(var i=0; i< fitfixes[0].fitfixes.length; i++){
        var ff = fitfixes[0].fitfixes[i];
        var startDate = formatDate(ff.startDate);
        var newMoment = moment(ff.startDate);
        ff.formatDate = formatDate(ff.startDate);
        ff.startDate = newMoment.format("D-M-YYYY H:mm:ss");
        if(newMoment > moment()){
          ff.endDate = newMoment.add(ff.duration, 'h');
          var endMoment = moment(ff.endDate);
          ff.endDate = endMoment.format("D-M-YYYY H:mm:ss");
          upcoming.push(ff);
        }
      }
      loadPage('user', {currentUser: currentUser, 
        groupInvites: groupInvites[0].groups, 
        fitFixInvites: fitFixInvites[0].fitfixes,
        groups: groups[0].groups,
        fitfixes: upcoming});
      $("#stats-visual-time").empty();
      console.log(stats);
      console.log(stats[0].timeData);
      helpers.drawLineGraph(stats[0].timeData, '#stats-visual-time');
      $("#stats-visual-type").empty();
      helpers.drawBarGraph(stats[0].typeData, "#stats-visual-type");
     });
});


$(document).on('click', '#create-fitfix-btn', function(evt) {
  evt.preventDefault();
  if ($("#new-fitfix-description").val().length < 1 || $("#new-fitfix-title").val().length < 1
  || $("#new-fitfix-duration").val().length < 1 || $("#new-fitfix-location").val().length < 1
  || $("#new-fitfix-startDate").val().length < 1 || $("#new-fitfix-recurring").val().length < 1){
    $('.form-error').text('Missing some required fields!');
    return;
  }
  var formData = helpers.getFormData($("#create-fitfix-form"));
  formData.startDate = moment(formData.startDate).toDate();
  var startMoment = moment(formData.startDate);
  var now = moment();
  if (startMoment < now) {
    $('.form-error').text('FitFix date can\'t be earlier than right now!');
    return;
  }
 
  var content = {'title':formData.title,
          'description': formData.description,
          'startDate': formData.startDate,
          'duration': formData.duration,
          'location': formData.location,
          'type':formData.type,
          'recurring': formData.recurring};

  $.post(
    '/fitfix/fitfix',
    content
  ).done(function(response) {
    window.location.reload(true);
  }).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
    $('.form-error').text(response.error);
  });
});

$(document).on('click', '#create-group-btn', function(evt) {
  evt.preventDefault();
  if ($("#new-group-description").val().length < 1 || $("#new-group-name").val().length < 1 ){
    $('.form-error').text('Missing some required fields!');
    return;
  }

  var formData = helpers.getFormData($("#create-group-form"));
  //find out where to post this
  $.post(
    '/group/group',
    formData
  ).done(function(response) {
    $.get('/users/current', function(response) {
      if (response.content.loggedIn) {
        currentUser = response.content.user;
        //populateNav();
        window.location.reload(true);
        loadFeed();
      }
    });
  }).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
    $('.form-error').text(response.error);
  });
});


$(document).on('click', '.group-button', function(evt) {
  var ID = $(this).attr('id');
  request_url = 'group/' + ID;
  $.get(request_url, function(response) {
    var notInGroup = true;
    for(var i=0; i<response.members.length; i++){
      if(response.members[i]._id === currentUser._id){
        notInGroup = false;
      }
    }
    loadPage('group', {group: response, notInGroup: notInGroup});
  });
});

$(document).on('click', '.join-btn', function(evt) {
  var ID = $(this).attr('id');
  var formData = {
    username: currentUser.local.username
  }
  var request_url = 'group/member/' + ID;
  $.post(request_url, formData).done(function(response) {
        loadPage('group', {group:response, notInGroup: false});
  }).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
    $('#join-error').text(response.error);
  });
})

$(document).on('click', '.commit-btn', function(evt) {
  var form = $(this);
  var postData = {
    username: currentUser.local.username,
    fitfixid: $(this).attr('id')
  }
  $.post("/users/commit", postData).done(function(response) {
    //$('.invite-message').addClass('invite-success').removeClass('error').text(response.message);
    window.location.reload(true);
  }).fail(function(jqxhr){
    var response = $.parseJSON(jqxhr.responseText);
    var message = form.find($('.invite-message'));
    message.addClass('error').removeClass('invite-success').text(response.error);
  })
})

//Send an AJAX request to the server to add the member to the fitfix
$(document).on('submit', '#invite-fitfix-form', function(evt) {
  evt.preventDefault();
  var username = helpers.getFormData($(this)).username;
  var form = $(this)
  if (helpers.getFormData($(this)).username.length < 1) {
    $('.form-error').text('Missing some required fields!');
    return;
  }
  var fitfixId = $(this).data('fitfix-id');
  console.log($(this).find($('.invite-message')))
  var formData = {'fitfixId': fitfixId, 
                  'username':username,
                  'currentUser': currentUser._id};
  $.post(
    '/fitfix/inviteUser' ,
    formData
  ).done(function(response) {
    window.location.reload(true);
  }).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
    var message = form.find($('.invite-message'));
    message.addClass('error').removeClass('invite-success').text(response.error);
  });
});

//Send an AJAX request to the server to add the group to the fitfix
$(document).on('submit', '#inviteg-fitfix-form', function(evt) {
  evt.preventDefault();
  var group = helpers.getFormData($(this)).group;
  var form = $(this)
  if (group < 1) {
    $('.form-error').text('Missing some required fields!');
    return;
  }
  var fitfixId = $(this).data('fitfix-id');

  var formData = {'fitfixId': fitfixId, 
                  'group':group,
                  'currentUser': currentUser._id};
  $.post(
    '/fitfix/inviteGroup' ,
    formData
  ).done(function(response) {
    window.location.reload(true);
  }).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
    var message = form.find($('.invite-message'));
    message.addClass('error').removeClass('invite-success').text(response.error);
  });
});

$(document).on('submit', '#invite-member-form', function(evt) {
  evt.preventDefault();
  if ($("#invite-username").val().length < 1) {
    $('.form-error').text('Missing some required fields!');
    return;
  }
  var groupId = $(this).data('group-id');
  var username = helpers.getFormData($(this)).username;
  var formData = {'groupId': groupId,
                   'username':username };

  $.post(
    '/group/invite',
    formData
  ).done(function(response) {
    window.location.reload(true);
  }).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
    $('.invite-message').addClass('error').removeClass('invite-success').text(response.error);
  });
});
//Search stuff

//Search page
$(document).on('click', '#search-button', function(evt){
  console.log('here in index.js?');
  evt.preventDefault();
  $.get('/users/current', function(response){
    if(response.content.loggedIn){
      currentUser= response.content.user;
    }
    loadPage('search', {currentUser: currentUser});
  });
});

//Methods to use the search fitfix feature

$(document).on('click', '#search-fitfix-btn', function(evt){
  console.log('here in index.js2?');
  evt.preventDefault();

  if($('#search-startTime').val().length <1 || $('#search-endTime').val().length <1){
    $('.form-error').text('Missing some required fields');
    return;
  }

  var formData = helpers.getFormData($('#search-fitfix-form'));
  $.get('/fitfix', function(fitfixes){
    var searchType= formData.type;
    var startTime = moment(formData.searchStartTime);
    var endTime = moment(formData.searchEndTime);
    var searchresults= [];
    for(i=0; i< fitfixes.length; i++){
      var ff = fitfixes[i];
      if((ff.type === searchType) || searchType==="Any"){
        var fftime = moment(ff.startDate);

        //Does not take the fitfix duration into account in the search. Only considers start times
        if((fftime.isAfter(startTime) || fftime.isSame(startTime)) && (fftime.isBefore(endTime) || fftime.isSame(endTime))){
          ff.startDate = formatDate(ff.startDate);
          ff.isAuthor = false;
          ff.notCommitted = true;   
            if($.inArray(ff._id, currentUser.fitfixes) > -1){
              ff.notCommitted = false;
            }
            if(ff.author === currentUser._id){
              ff.isAuthor = true;
            }
            searchresults.push(ff); 
          }
        }
    }
    loadPage('search', {fitfix: searchresults, currentUser: currentUser});
  });
});

/*Display Unit Tests*/
$(document).on('click', '#tests', function(evt){
  evt.preventDefault();
  // window.open("./test/test.html", "Tests for FitFriends!");
  window.location.href = "./test/test.html";
})
