var GiftCards = (function() {
    var gc = {};

    options = {
        buttonsSelector: '.show-giftcard-form',
        showFormDataAttribute: 'target',
        formContainerSelector: '.formContainer',
        submitSelector: 'button.submit',
        handleFormSubmit: true,
    };

    gc.showForm = function(event) {
        event.preventDefault();

        $(options.formContainerSelector).hide();

        var formSelector = '#' + $(this).data('target');
        $(formSelector).fadeIn();
    };

    gc.showHideRecipientFields = function(event) {
    	var form = $(this).parents('form');

        var email_field = form.find('input[name="recipient_email"]');
        var send_after = form.find('input[name="send_after"]');

    	if (event.target.checked) {
            email_field.removeAttr('required');
    		email_field.parents('.form-group').hide();
    		send_after.parents('.form-group').hide();
    	} else {
            email_field.addAttr('required');
    		email_field.parents('.form-group').show();
    		send_after.parents('.form-group').show();
    	}
    };

    gc.handleFormSubmit = function() {
        event.preventDefault();

        var button = $(this);
        var form = button.closest('form');
        var dataString = form.serialize();
        var successCallback = options.successCallback || gc.formSubmitSuccess;

        gc.clearErrors(form);

        if (!gc.validateForm(form)) {
            return false;
        }

        console.log(options.successCallback);

        $.ajax({
            type: "POST",
            url: form.attr('action'),
            data: dataString,
            success: options.successCallback,
            error: gc.formSubmitError
        });

        gc.currentForm = form;
    };

    gc.validateForm = function(form) {
        var hasErrors = false;
        var inputs = form.find('input, select');

        _.each(inputs, function(input) {
            if (!input.checkValidity()) {
                $(input).addClass('error');
                hasErrors = true;
            }
        }, this);

        return !hasErrors;
    };

    gc.clearErrors = function(form) {
        form.find('div.errorMessage').fadeOut();
        form.find('.error').removeClass('error');
    };

    gc.formSubmitSuccess = function(data) {
        if (data.cart && data.cart.url) {
            window.location = data.cart.url;
        } else {
            window.location = '/store/cart';
        }
    };

    gc.formSubmitError = function(data) {
        var responseData = data.responseJSON;

        if (responseData && responseData.form && responseData.form.errors) {
            $.each(responseData.form.errors, function(key, value) {

                var nameAttr = key;
                var errorMsg = value;
                var selector = 'input[name="' + nameAttr + '"]';

                gc.currentForm.find(selector).addClass('error');
            });
        }

        gc.currentForm.find('div.errorMessage').fadeIn();
    };

    gc.initialize = function(userOptions) {
        for (var attributeName in userOptions) {
            options[attributeName] = userOptions[attributeName];
        }

    	$(options.buttonsSelector).on('click', gc.showForm);
    	$(options.formContainerSelector).on('change', 'input[name="email_gifter"]', gc.showHideRecipientFields);

        if (options.handleFormSubmit) {
            $(options.formContainerSelector).on("click", "button", gc.handleFormSubmit);
        }
    };

    return gc;
}());

module.exports = GiftCards;
