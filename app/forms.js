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

		var ajaxOptions = {
			type: "POST",
			url: targetForm.attr('action'),
			data: dataString,
			success: forms.formSubmitSuccess,
			error: forms.formSubmitError
		};

		var fileInputSelector = options.fileInputSelector;

		if (targetForm.find(fileInputSelector).val()) {
			ajaxOptions.data = new FormData(targetForm[0]);
			ajaxOptions.contentType = false;
			ajaxOptions.processData = false;
		}

		$.ajax(ajaxOptions);
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
			forms.currentForm.find('input, select, textarea').removeClass('error');
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
        var inputs = targetForm.find('input, select, textarea');

        _.each(inputs, function(input) {
            if (!input.checkValidity()) {
                $(input).addClass('error');
                hasErrors = true;
            } else {
        	 	$(input).removeClass('error');
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
		fileInputSelector: "#uploaded_file",
	};

	return forms;
}());

module.exports = Forms;
