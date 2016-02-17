var Newsletter = (function() {
	var newsletter = {};

	var newsletter.options = {
		formSelector: 'form#email_newsletter',
		successMessage: 'div#success',
		errorMessage: 'div#error',
	};

	newsletter.handleFormSubmit = function(event) {
		event.preventDefault();

		$(newsletter.options.errorMessage).hide();

		var form = $(this);
		$.ajax({
			type: 'POST',
			url: form.attr('action'),
			data: form.serialize(),
			success: newsletter.formSuccess,
			error: newsletter.formError,
		});
	};

	newsletter.formSuccess = function(result) {
		if (result.success != true){
			newsletter.formError();
		} else {
			$(newsletter.options.successMessage).fadeIn();
		}
	};

	newsletter.formError = function(result) {
		$(newsletter.options.errorMessage).fadeIn();
	};

	newsletter.initialize = function(options) {
		for (var attributeName in options) {
			newsletter.options[attributeName] = options[attributeName];
		}

		if (newsletter.options.formSelector !== undefined) {
			$(newsletter.options.formSelector).on('submit', newsletter.handleFormSubmit);
		}
	};

	return newsletter;
}());

module.exports = Newsletter;
