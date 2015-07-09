currentUser = undefined;

Handlebars.registerPartial('fitfix-preview', Handlebars.templates['fitfix-preview']);

var loadPage = function(template, data) {
  data = data || {};
  $('#search').html(Handlebars.templates[template](data));
};

var loadHomePage = function() {
  if (currentUser) {
    loadFeedPage();
  } else {
    window.location.href = '/';
  }
};

var loadFeedPage = function() {
	$.get('/users/fitfeed', function(response) {
		loadPage('feed');
	});
}

function formatDate(date) {
  var offset = (new Date()).getTimezoneOffset();
  o_date = (new Date(new Date(date)-offset*60*1000)).toJSON().slice(0,19);
  r_date = moment(o_date).format("dddd, MMMM D, YYYY, h:mm a");
  return r_date;
}

$(document).ready(function(){
	console.log('here in search.js?');
	$/get('/users/current', function(response){
		if(response.content.loggedIn){
			currentUser = response.content.user;
		}
		else{
			loadHomePage();
		}
	});
});

//Search page
$(document).on('click', '#search-button', function(evt){
  console.log('here in search.js???');
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
  console.log('here in search.js?');
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
          searchresults.push(ff);
        }
      }
    }
    loadPage('search', {fitfix: searchresults, currentUser: currentUser});
  });
});
