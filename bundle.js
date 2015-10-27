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

	var Bento = {};

	Bento.Utils = Utils;
	Bento.Newsletter = Newsletter;
	Bento.Reservations = Reservations;
	Bento.Forms = Forms;

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
			var reserveUrl = 'http://www.opentable.com/single.aspx?rid=' + options.opentable_id + '&amp;restref=' + options.opentable_id;

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

/***/ }
/******/ ]);