var Utils = require('./utils.js');

var Forms = (function() {
	var forms = {};
	
	options = {
		formSelector: "form",
		success: "div.success",
		error: "div.error"
	};

	forms.handleSubmit = function(event) {
		event.preventDefault();

		var targetForm = $(this);

		var dataString = targetForm.serialize();

		forms.currentForm = targetForm;
		forms.hideMessages();

		$.ajax({
			type: "POST",
			url: targetForm.attr('action'),
			data: dataString,
			success: forms.formSubmitSuccess,
			error: forms.formSubmitError
		});
	};

	forms.hideMessages = function() {
		forms.currentForm.find(options.success).hide();
		forms.currentForm.find(options.error).hide();
	};

	forms.formSubmitSuccess = function(data) {
		if (data.success == true || data.success == "true") {
			forms.currentForm.find(options.success).fadeIn();
			forms.currentForm.trigger('reset');
		} else {
			forms.currentForm.find(options.error).fadeIn();
		}
	};

	forms.formSubmitError = function() {
		forms.currentForm.find(options.error).fadeIn();
	};

	forms.initialize = function(userOptions) {
		for (var attributeName in userOptions) {
			options[attributeName] = userOptions[attributeName];
		}

		$(options.formSelector).on('submit', forms.handleSubmit);
	};

	return forms;	
}());

module.exports = Forms;