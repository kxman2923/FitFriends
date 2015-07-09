(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['create'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      "
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div id=\"create\">\n  <h3>Create a FitFix</h1>\n  <div class=\"error\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n  <div id=\"create-fields\">\n    <div id = \"nameInput\" class = \"input-group\">\n      <span class=\"input-group-addon\"> FitFix Name </span>\n      <input type=\"text\" id=\"fitfixName\" class=\"form-control\" placeholder=\"FitFix Name\" required />\n    </div>\n    <div id = \"descriptionInput\" class = \"input-group\">\n      <span class=\"input-group-addon\"> Description </span>\n      <input type=\"text\" name=\"description\" class=\"form-control\" placeholder=\"Describe your FitFix\" required />\n    </div>\n    <div id = \"locationInput\" class = \"input-group\">\n      <span class=\"input-group-addon\"> Location to Meet </span>\n      <input type=\"text\" name=\"location\" class=\"form-control\" placeholder=\"Location to meet for the FitFix\" required />\n    </div>\n    <div id = \"startTimeInput\" class = \"input-group\">\n      <span class=\"input-group-addon\"> Start Time </span>\n      <div class=\"input-append bootstrap-timepicker\">\n        <input type=\"text\" name=\"startTime\" class=\"input-small\" required />\n      </div>\n    </div>\n    <div id = \"endTimeInput\" class = \"input-group\">\n      <span class=\"input-group-addon\"> End Time </span>\n      <div class=\"input-append bootstrap-timepicker\">\n        <input type=\"text\" name=\"endTime\" class=\"input-small\" required />\n      </div>\n    </div>\n    <div id = \"recurringInput\" class = \"input-group\">\n      <span class=\"input-group-addon\"> Recurring Event </span>\n      <input type=\"checkbox\" name=\"recurring\" class=\"form-control\">\n    </div>\n</div>";
},"useData":true});
templates['feed'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      "
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helper = (helper = helpers['form-error'] || (depth0 != null ? depth0['form-error'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"form-error","hash":{},"data":data}) : helper)))
    + "\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = this.invokePartial(partials['fitfix-preview'], '      ', 'fitfix-preview', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div id=\"feed\">\n  <div class = \"page-header\">\n    <h1> "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.currentUser : depth0)) != null ? stack1.local : stack1)) != null ? stack1.username : stack1), depth0))
    + "'s FitFeed </h1>\n  </div>\n</div>\n  <div class=\"error\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "  </div>\n\n <!-- Form for creating new Group -->\n  <button class=\"btn btn-lg\" data-toggle=\"modal\" data-target=\"#new-group-modal\" id=\"create-group-modal-btn\">\n    Create New Group\n  </button>\n  <!-- Modal -->\n  <div class=\"modal fade\" id=\"new-group-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"new-group-modal-label\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\">\n      <div class=\"modal-content\"> \n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n            <span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>\n          </button>\n          <h3 class=\"modal-title\" id=\"new-group-modal-label\">Create a New Group!</h3>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"form-error\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['form-error'] : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </div>\n            <form id=\"create-group-form\" class=\"form-inline\">\n              <div class=\"form-group\">\n                <label for=\"new-group-name\">Group Name</label>\n                <input type=\"text\" name=\"name\" id=\"new-group-name\" class=\"form-control\" placeholder=\"Your group's name\" required />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"new-group-description\">Description</label>\n                <input type=\"text\" name=\"description\" id=\"new-group-description\" class=\"form-control\" placeholder=\"A short description of your group\" required />\n              </div>\n          </form>\n        </div>\n        <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn\" data-dismiss=\"modal\">Close</button>\n          <button type=\"button\" class=\"btn edit-btn\" id=\"create-group-btn\">Create!</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n<!-- Form for creating new FitFix -->\n <button class=\"btn btn-lg\" data-toggle=\"modal\" data-target=\"#new-fitfix-modal\" id=\"create-fitfix-modal-btn\">\n    Create New FitFix\n  </button>\n  <!-- Modal -->\n  <div class=\"modal fade\" id=\"new-fitfix-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"new-fitfix-modal-label\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n            <span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>\n          </button>\n          <h3 class=\"modal-title\" id=\"new-fitfix-modal-label\">Create a New FitFix!</h3>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"form-error\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['form-error'] : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </div>\n            <form id=\"create-fitfix-form\" class=\"form-inline\">\n              <div class=\"form-group\">\n                <label for=\"new-fitfix-title\">FitFix Title</label>\n                <input type=\"text\" name=\"title\" id=\"new-fitfix-title\" class=\"form-control\" placeholder=\"Your FitFix's title\" required />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"new-fitfix-description\">Description</label>\n                <input type=\"text\" name=\"description\" id=\"new-fitfix-description\" class=\"form-control\" placeholder=\"A short description of your fitfix\" required />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"new-fitfix-startdate\">Date and Time</label>\n                <input type=\"datetime-local\" name=\"startDate\" id=\"new-fitfix-startDate\" class=\"form-control\" placeholder=\"When will the FitFix happen?\" required />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"new-fitfix-duration\">Duration</label>\n                <input type=\"number\" name=\"duration\" id=\"new-fitfix-duration\" class=\"form-control\" placeholder=\"How long will the FitFix be? (in hours)\" required />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"new-fitfix-location\">Location</label>\n                <input type=\"text\" name=\"location\" id=\"new-fitfix-location\" class=\"form-control\" placeholder=\"Your FitFix's location\" required />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"new-fitfix-type\">Fitness Type</label>\n                <select name=\"type\" id=\"new-fitfix-type\" class=\"form-control\"required>\n                  <option value=\"Running\">Running</option>\n                  <option value=\"Swimming\"> Swimming </option>\n                  <option value=\"Yoga\"> Yoga </option>\n                  <option value=\"GroupExercise\"> Group Exercise </option>\n                  <option value=\"RaquetSports\"> Raquet Sports </option>\n                  <option value=\"TeamSports\"> Team Sports </option>\n                  <option value=\"Strength\"> Strength </option>\n                  <option value = \"Cardio\"> Cardio </option>\n                  <option value=\"Other\">Other</option>\n                </select>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"new-fitfix-recurring\">Weekly Events</label>\n                <input type=\"number\" name=\"recurring\" id=\"new-fitfix-recurring\" class=\"form-control\"\n                placeholder=\"Number of weeks recurring\" min=\"1\" max=\"52\" value=\"1\" required />\n              </div>\n          </form>\n        </div>\n        <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn\" data-dismiss=\"modal\">Close</button>\n          <button type=\"button\"class=\"btn edit-btn\" id=\"create-fitfix-btn\">Create!</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class = \"row\" id = changing-fitfixes>\n  <div class = \"col-xs-8 panel panel-feed\" id= \"fitfix-item\">\n  <div class= \"panel-body\">\n  <h3> Upcoming FitFixes </h3>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.fitfix : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "  </div>\n  </div>\n  <div class = \"col-xs-4 panel panel-feed\" id = \"fitfix-rec\">\n  <div class = \"panel-body\">\n  <h3> Recommended FitFixes </h3>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.recommendations : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n  </div>\n  </div>\n  </div>";
},"usePartial":true,"useData":true});
templates['fitfix-preview'] = template({"1":function(depth0,helpers,partials,data) {
  return "  <span>You made this event</span><br>\n";
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <button class='btn commit-btn' id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "> Commit! </button>\n";
},"5":function(depth0,helpers,partials,data) {
  return "  <span>You committed to this event.</span>  \n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"fitfix-preview panel panel-primary\" data-fitfix-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n<div class=\"panel-heading\">\n  <h1 class=\"panel-title\"> "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n</div>\n<div class = \"panel-body\">\n<h5>"
    + escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper)))
    + "</h5>\n<h5>Location: "
    + escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"location","hash":{},"data":data}) : helper)))
    + "</h5>\n<h5>Time: "
    + escapeExpression(((helper = (helper = helpers.startDate || (depth0 != null ? depth0.startDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"startDate","hash":{},"data":data}) : helper)))
    + "</h5> \n<h5>Duration: "
    + escapeExpression(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"duration","hash":{},"data":data}) : helper)))
    + " hours</h5> \n<h5>Type: "
    + escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "</h5>\n \n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isAuthor : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.notCommitted : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n\n  <div id=\"invite-fitfix-container\">\n    <form id=\"invite-fitfix-form\" data-fitfix-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n      <h4>Invite Users to This FitFix!</h4>\n      <div class=\"invite-message\"></div>\n      <div class=\"form-group\">\n        <input type=\"text\" name=\"username\" class=\"form-control input-sm\" placeholder=\"Your friend's username\" id=\"invite-username\" required /></div>\n        <button type=\"submit\" class=\"btn btn-sm\" id=\"invite-user-btn\">Invite User</button>\n      \n    </form>\n\n    <form id=\"inviteg-fitfix-form\" data-fitfix-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n      <h4>Invite Groups to This FitFix!</h4>\n      <div class=\"invite-message\"></div>\n      <div class=\"form-group\">\n        <input type=\"text\" name=\"group\" class=\"form-control input-sm\" placeholder=\"Group Name\" id=\"invite-group\" required /></div>\n        <button type=\"submit\" class=\"btn btn-sm\" id=\"invite-group-btn\">Invite Group</button>\n      \n    </form> \n  </div>\n</div>\n</div>";
},"useData":true});
templates['fitfix'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      "
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "\n<div id = \"fitfix\" class=\"panel panel-default\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.fitfix : depth0)) != null ? stack1.type : stack1), depth0))
    + "</h3>\n  </div>\n  <div class=\"panel-body\">\n  	<div>\n    "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.fitfix : depth0)) != null ? stack1.description : stack1), depth0))
    + "\n    </div>\n    <div>\n    "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.fitfix : depth0)) != null ? stack1.location : stack1), depth0))
    + "\n    </div>\n    <div>\n    "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.fitfix : depth0)) != null ? stack1.startDate : stack1), depth0))
    + "\n    </div>\n    <div>\n    "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.fitfix : depth0)) != null ? stack1.duration : stack1), depth0))
    + "\n    </div>\n  </div>\n<div id=\"fitfix-\">\n  <h2 id=\"fitfix-title\">FitFix</h2>\n  <div class=\"error\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n	<div id=\"invite-fitfix-container\">\n		<form id=\"invite-fitfix-form\" data-fitfix-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n			<h3>Invite Users to This FitFix!</h3>\n			<div class=\"invite-message\"></div>\n			<div class=\"form-group\">\n				<input type=\"text\" name=\"username\" class=\"form-control\" placeholder=\"Your friend's username\" id=\"invite-username\" required />\n				<button type=\"submit\" class=\"btn\" id=\"invite-user-btn\">Invite</button>\n			</div>\n		</form>  \n	</div>\n</div>";
},"useData":true});
templates['group'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "			 <h5>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.local : depth0)) != null ? stack1.username : stack1), depth0))
    + "</h5>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "		<button class='btn join-btn' id="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1._id : stack1), depth0))
    + "> Join! </button>\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      "
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<div id=\"groupPage\" data-user-id = "
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n	<div class = \"page-header\">\n		<h1> "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.name : stack1), depth0))
    + " </h1>\n	</div>\n\n	<div>\n	<h4> "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.description : stack1), depth0))
    + " </h4>\n	</div>\n	<div class = \"members panel panel-primary\">\n	<div class = panel-heading>\n		<h5>Members</h5>\n	</div>\n	<div class = panel-body>\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.members : stack1), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "	</div> \n	</div>\n	<div id=join-error></div>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.notInGroup : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "<div id=\"group\">\n  <div class=\"error\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n	<div id=\"invite-member-container\">\n		<form id=\"invite-member-form\" data-group-id = "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n			<h3>Invite Users to This Group!</h3>\n			<div class=\"invite-message\"></div>\n			<div class=\"form-group\">\n				<input type=\"text\" name=\"username\" class=\"form-control\" placeholder=\"Your friend's username\" id=\"invite-username\" required />\n				<button type=\"submit\" class=\"btn\" id=\"invite-member-btn\">Invite</button>\n			</div>\n		</form>  \n	</div>\n</div>";
},"useData":true});
templates['groupInvite-preview'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"groupInvite-preview panel panel-primary\" data-group-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n	<h5>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h5>\n        <button class='btn join-btn' id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "> Join! </button>\n</div>";
},"useData":true});
templates['login'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      "
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div id=\"login\">\n  <h1>Log In</h3>\n  <div class=\"error\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n  <form id=\"login-form\">\n    <div class=\"form-group\"><input type=\"text\" name=\"username\" class=\"form-control\" placeholder=\"Username\" required /></div>\n    <div class=\"form-group\"><input type=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\" required /></div>\n    <button type=\"submit\" class =\"btn btn-default\" id=\"login-submit\"> Log In </button>\n  </form>\n</div>";
},"useData":true});
templates['search'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "			"
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "			"
    + escapeExpression(((helper = (helper = helpers['form-error'] || (depth0 != null ? depth0['form-error'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"form-error","hash":{},"data":data}) : helper)))
    + "\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = this.invokePartial(partials['fitfix-preview'], '	    ', 'fitfix-preview', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div id=\"search\" data-user-id = "
    + escapeExpression(((helper = (helper = helpers.currentUser_id || (depth0 != null ? depth0.currentUser_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"currentUser_id","hash":{},"data":data}) : helper)))
    + ">\n	<div id=\"search\">\n		<div class = \"page-header\">\n		    <h1> Search for FitFixes</h1>\n		</div>\n	</div>\n	<div class=\"error\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "	</div>\n	<div class=\"form-error\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['form-error'] : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "	</div>\n	<form id=\"search-fitfix-form\" class=\"form-inline\">\n		<div class=\"form-group\">\n		    <label for=\"search-fitfix-type\">Fitness Type</label>\n		    <select name=\"type\" id=\"search-fitfix-type\" class=\"form-control\" required>\n				<option value=\"Any\">Any</option>\n				<option value=\"Running\">Running</option>\n                  <option value=\"Swimming\"> Swimming </option>\n                  <option value=\"Yoga\"> Yoga </option>\n                  <option value=\"GroupExercise\"> Group Exercise </option>\n                  <option value=\"RaquetSports\"> Raquet Sports </option>\n                  <option value=\"TeamSports\"> Team Sports </option>\n                  <option value=\"Other\">Other</option>\n		    </select>\n		</div>\n		<div class=\"form-group\">\n			<label for=\"search-startTime\">Start Time</label>\n			<input type=\"datetime-local\" name=\"searchStartTime\" id=\"search-startTime\" class=\"form-control\" required />\n		</div>\n		<div class=\"form-group\">\n			<label for=\"search-endTime\">End Time</label>\n			<input type=\"datetime-local\" name=\"searchEndTime\" id=\"search-endTime\" class=\"form-control\" required />\n		</div>\n		<button type=\"button\" class=\"btn edit-btn\" id=\"search-fitfix-btn\">Search</button>\n	</form>\n\n	<div id= \"fitfix-item\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.fitfix : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "	</div>\n</div>";
},"usePartial":true,"useData":true});
templates['signup'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      "
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div id=\"signup\">\n  <h1>Sign Up</h1>\n  <div class=\"error\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n  <form id=\"signup-form\">\n    <div class=\"form-group\"><input type=\"text\" name=\"username\" class=\"form-control\" placeholder=\"Username\" required /></div>\n    <div class=\"form-group\"><input type=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\" required /></div>\n    <div class=\"form-group\"><input type=\"password\" name=\"confirm\" class=\"form-control\" placeholder=\"Confirm Password\" required /></div>\n    <div class=\"form-group\"><input type=\"text\" name=\"email\" class=\"form-control\" placeholder=\"Your MIT Email\" required /></div>\n    <button type=\"submit\" class =\"btn btn-default\" id=\"signup-submit\"> Sign Up </button>\n  </form>\n</div>";
},"useData":true});
templates['user'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "			<h4> "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + " </h4>\n			<h5> "
    + escapeExpression(((helper = (helper = helpers.formatDate || (depth0 != null ? depth0.formatDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"formatDate","hash":{},"data":data}) : helper)))
    + " </h5>\n			<a href=\"http://example.com/link-to-your-event\" title=\"Add to Calendar\" class=\"addthisevent\">\n			    Add to Calendar\n			    <span class=\"_summary\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n			    <span class=\"_start\">"
    + escapeExpression(((helper = (helper = helpers.startDate || (depth0 != null ? depth0.startDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"startDate","hash":{},"data":data}) : helper)))
    + "</span>\n			    <span class=\"_end\">"
    + escapeExpression(((helper = (helper = helpers.endDate || (depth0 != null ? depth0.endDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"endDate","hash":{},"data":data}) : helper)))
    + "</span>\n			    <span class=\"_zonecode\">15</span>\n			    <span class=\"_description\">"
    + escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper)))
    + "</span>\n			    <span class=\"_location\">"
    + escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"location","hash":{},"data":data}) : helper)))
    + "</span>\n			    <span class=\"_date_format\">DD/MM/YYYY</span>\n			</a>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "			<href class=\"btn group-button\" id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</href>\n			\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <div class=\"fitfixInvite-preview\" data-fitfix-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n        	<h5>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h5>\n        	<button class='btn commit-btn' id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "> Commit! </button>\n        </div>\n";
},"7":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        	<div class=\"groupInvite-preview\" data-group-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n				<h5>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h5>\n        		<button class='btn join-btn' id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "> Join! </button>\n			</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "    <!-- AddThisEvent -->\n    <script type=\"text/javascript\" src=\"https://addthisevent.com/libs/1.5.8/ate.min.js\"></script>\n        <!-- AddThisEvent Settings -->\n    <script type=\"text/javascript\">\n    addthisevent.settings({\n        mouse     : false,\n        css       : false,\n        outlook   : {show:true, text:\"Outlook Calendar\"},\n        google    : {show:true, text:\"Google Calendar\"},\n        ical      : {show:true, text:\"iCal Calendar\"},\n        dropdown  : {order:\"outlook,google,ical\"}\n    });\n    </script>\n<div class = \"container\" id=\"userPage\" data-user-id ="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.currentUser : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n	<div class = \"page-header\">\n		<h1> Welcome "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.currentUser : depth0)) != null ? stack1.local : stack1)) != null ? stack1.username : stack1), depth0))
    + " </h1>\n	</div>\n	<div class = row>\n	<div class = \"col-sm-4\" id = \"fitfixes-attending\">\n	<h2> Your FitFixes </h2>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.fitfixes : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "	</div>\n\n	<div class = \"col-sm-4\" id='user-groups'>\n	<h2> Your Groups </h2>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.groups : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "	</div>\n\n	<div class = \"col-sm-4\" id = \"user-invites\">\n	<h2> Pending Invites </h2>\n        <h3> Fit Fixes </h3>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.fitFixInvites : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        \n        <h3> Groups </h3>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.groupInvites : depth0), {"name":"each","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "	</div>\n</div>\n<div class = \"row\">\n<h2 class= \"text-center\"> In the past month... </h2>\n<div class = \"col-sm-6\">\n<h3> you have committed to these types of FitFixes</h3>\n<svg id=\"stats-visual-type\" width=\"500\" height=\"250\"></svg>\n</div>\n<div class = \"col-sm-6\">\n<h3> you have committed to Fitfixes on these days </h3>\n<svg id=\"stats-visual-time\" width=\"500\" height=\"250\"></svg>\n</div>\n</div>\n<br>\n</div>\n</div>";
},"useData":true});
templates['welcome'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"welcome\">\n	<div class = \"page-header jumbotron\">\n		<h1> Welcome to FitFriends</h1>\n        <p>This is a platform for you to find fun fitness activities and other MIT students to do them with. \n        Simply sign up with your MIT email address and start posting and commiting to events!</p>\n        <p>Let's get started:</p>\n        <div class=\"nav nav-pills\">\n	 	<li><button class=\"btn btn-default\" id = \"signup-btn\"> Signup</button></li>\n	  	<li><button class=\"btn btn-default\" id=\"login-btn\"> Login</button> </li>\n	</div>\n	</div>\n\n</div>";
  },"useData":true});
})();
