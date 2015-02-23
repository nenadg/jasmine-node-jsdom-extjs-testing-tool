// work by: https://github.com/component/xmlhttprequest
var hasCORS = require('has-cors');

module.exports = function(opts) {
	var xdomain = opts? opts.xdomain: false;
	
	// XMLHttpRequest can be disabled on IE
	try {
		if ('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
			return new XMLHttpRequest();
		}
	} catch (e) { }
	if (!xdomain) {
		try {
			return new ActiveXObject('Microsoft.XMLHTTP');
		} catch(e) { }
	}
}