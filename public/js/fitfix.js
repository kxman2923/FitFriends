$(document).ready(function() {
  $.get('/users/current', function(response) {
    if (response.content.loggedIn) {
      currentUser = response.content.user;
    }
    loadHomePage();
  });
});

//Send an AJAX request to the server to add the member to the fitfix
$(document).on('submit', '#invite-user-btn', function(evt) {
  evt.preventDefault();
  var fitfixId = $(this).data('fitfix-id');
  var username = helpers.getFormData($(this)).username;
  var formData = {'fitfixId': fitfixId};
  //get right post
  $.post(
    '/fitfix/' + username ,
    formData
  ).done(function(response) {
    $('.invite-message').addClass('invite-success').removeClass('error').text(response.content.message);
  }).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
    $('.invite-message').addClass('error').removeClass('invite-success').text(response.error);
  });
});
