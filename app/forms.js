var Utils = require('./utils.js');

var Forms = (function() {
	var forms = {};

	forms.handleSubmit = function(event) {
		event.preventDefault();

		options.preSubmit();

		var targetForm = $(this);

		var dataString = targetForm.serialize();

		forms.currentForm = targetForm;
		forms.hideMessages();

		if (!forms.validateForm(targetForm)) {
            return false;
        }

		$.ajax({
			type: "POST",
			url: targetForm.attr('action'),
			data: dataString,
			success: forms.formSubmitSuccess,
			error: forms.formSubmitError
		});
	};

	forms.successCallback = function () {
		return;
	},

	forms.errorCallback = function () {
		return;
	},

	forms.hideMessages = function() {
		$(options.success).hide();
		$(options.error).hide();
	};

	forms.formSubmitSuccess = function(data) {
		if (data.success == true || data.success == "true") {
			$(options.success).fadeIn();
			options.successCallback();
			forms.currentForm.trigger('reset');
		} else {
			forms.currentForm.find(options.error).fadeIn();
			options.errorCallback();
		}
	};

	forms.formSubmitError = function() {
		$(options.error).fadeIn();
	};

	forms.initialize = function(userOptions) {
		for (var attributeName in userOptions) {
			options[attributeName] = userOptions[attributeName];
		}

		$(options.formSelector).on('submit', forms.handleSubmit);
	};

	forms.preSubmit = function() {
		return;
	};

	forms.validateForm = function(targetForm) {
        var hasErrors = false;
        var inputs = targetForm.find('input, select');

        _.each(inputs, function(input) {
            if (!input.checkValidity()) {
                $(input).addClass('error');
                hasErrors = true;
            }
        }, this);

        return !hasErrors;
	};

	var options = {
		formSelector: "form",
		success: "div.success",
		error: "div.error",
		successCallback: forms.successCallback,
		errorCallback: forms.errorCallback,
		preSubmit: forms.preSubmit,
	};

	return forms;
}());

module.exports = Forms;
