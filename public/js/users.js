$(document).on('submit', '#login-form', function(evt) {
  evt.preventDefault();
  $.post(
    '/users/login',
    helpers.getFormData(this)
  ).done(function(response) {
    currentUser = response.user;
    window.location.href = '/';
  }).fail(function(jqxhr) {
    console.log(jqxhr.responseText)
    var response = $.parseJSON(jqxhr.responseText);
    loadPage('login', {error: response.error});
  });
});

$(document).on('submit', '#signup-form', function(evt) {
  evt.preventDefault();
  var formData = helpers.getFormData(this);
  if (formData.password !== formData.confirm) {
    $('.error').text('The passwords do not match!');
    return;
  }
  if (!(formData.username.match(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]?)*$/))){
      $('.error').text('Your username is of an invalid format! Your username must begin with a letter and can contain numbers, letters, periods and underscores.');
      return;
  }
  delete formData['confirm'];
  console.log(formData)
  $.post(
    '/users',
    formData
  ).done(function(response) {
    console.log(response)
    currentUser = response.user;
    window.location.href = '/';
  }).fail(function(jqxhr) {
    console.log(response)
    var response = $.parseJSON(jqxhr.responseText);
    loadPage('signup', {error: response.error});
  });
});


