var Utils = require('./utils.js');

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