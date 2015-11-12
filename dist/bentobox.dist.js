/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Newsletter = __webpack_require__(1);
	var Reservations = __webpack_require__(2);
	var Utils = __webpack_require__(3);
	var Forms = __webpack_require__(4);
	var GiftCards = __webpack_require__(5);

	var Bento = {};

	Bento.Utils = Utils;
	Bento.Newsletter = Newsletter;
	Bento.Reservations = Reservations;
	Bento.Forms = Forms;
	Bento.GiftCards = GiftCards;

	window.Bento = Bento;

	module.exports = Bento;

/***/ },
/* 1 */
/***/ function(module, exports) {

	var Newsletter = (function() {
		var newsletter = {};

		newsletter.options = {
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);

	var Reservations = (function() {
		var reservations = {};
		
		options = {
			selector: "a.reserve",
		};

		reservations.handleOpentable = function(event) {
			var reserveUrl = 'http://www.opentable.com/single.aspx?rid=' + options.opentable_id + '&restref=' + options.opentable_id;

			if (Utils.isMobile()) {
				window.location.href = reserveUrl;
			} else {
				var modal = $($('#opentable-modal-template').html());
				modal.show();
				modal.find('iframe').attr('src', reserveUrl);

				$('body').append(modal);
				$.featherlight(modal, {
					afterClose: function() {
						modal.hide();
					}
				});
			}
		};

		reservations.handleReservation = function(event) {
			event.preventDefault();

			switch(options.provider) {
				case 'opentable':
					reservations.handleOpentable();
				default: 
					return;
			}
		};

		reservations.initialize = function(userOptions) {
			for (var attributeName in userOptions) {
				options[attributeName] = userOptions[attributeName];
			}
			$(options.selector).on('click', reservations.handleReservation);
		};

		return reservations;	
	}());

	module.exports = Reservations;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var Utils = (function() {
		var utils = {};
		
		utils.isMobile = function() {
			return (window.matchMedia("(max-width: 800px)").matches);
		}

		return utils;
	}());

	module.exports = Utils;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);

	var Forms = (function() {
		var forms = {};
		
		options = {
			formSelector: "form",
			success: "div.success",
			error: "div.error",
			successCallback: forms.successCallback,
			errorCallback: forms.errorCallback,
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

		return forms;	
	}());

	module.exports = Forms;

/***/ },
/* 5 */
/***/ function(module, exports) {

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

	        gc.clearErrors(form);

	        if (!gc.validateForm(form)) {
	            return false;
	        }

	        $.ajax({
	            type: "POST",
	            url: form.attr('action'),
	            data: dataString,
	            success: gc.formSubmitSuccess,
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
	            };
	        }, this);

	        return !hasErrors;
	    },

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

	    gc.initialize = function() {
	    	$(options.buttonsSelector).on('click', gc.showForm);
	    	$(options.formContainerSelector).on('change', 'input[name="email_gifter"]', gc.showHideRecipientFields);
	        
	        if (options.handleFormSubmit) {
	            $(options.formContainerSelector).on("click", "button", gc.handleFormSubmit)    
	        }
	    };

	    return gc;
	}());

	module.exports = GiftCards;


/***/ }
/******/ ]);