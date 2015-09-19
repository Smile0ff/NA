var app = app || {};

(function(app, $, root){

	"use strict";

	function ToggleScroll(){
		this.el = $("body");
		this.initialize.apply(this, arguments);
	}
	ToggleScroll.prototype = {
		isEnabled: true,
		initialize: initialize,
		enable: enable,
		disable: disable,
		status: status
	}

	function initialize(){
		
	}
	function enable(){
		this.el.addClass("stop-scroll");
		this.isEnabled = false;
	}
	function disable(){
		this.el.removeClass("stop-scroll");
		this.isEnabled = true;
	}
	function status(){
		return this.isEnabled;
	}

	app.ToggleScroll = ToggleScroll;

})(app, jQuery, window);