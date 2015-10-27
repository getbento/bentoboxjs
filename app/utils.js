var Utils = (function() {
	var utils = {};
	
	utils.isMobile = function() {
		return (window.matchMedia("(max-width: 800px)").matches);
	}

	return utils;
}());

module.exports = Utils;