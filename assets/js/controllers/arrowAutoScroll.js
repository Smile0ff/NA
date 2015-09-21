var app = app || {};

(function(app, $, root){

	"use strict";

	var screenResolution = new app.ScreenResolution();

	function ArrowAutoScroll(){
		this.el = $(".arrow-down");
		this.initialize.apply(this, arguments);
	}
	ArrowAutoScroll.prototype = {
		initialize: initialize,
		_events: _events,
		handleArrow: handleArrow
	}

	function initialize(){
		this._events();
	}
	function _events(){
		this.el.on("click", $.proxy(this.handleArrow, this));
	}
	function handleArrow(e){
		e.preventDefault();
		var target = $(e.target).closest(".arrow-down"),
			slideIndex = target.closest(".sequence").index(),
			scrollPos = 0;

		scrollPos = screenResolution.resolution.h * (slideIndex + 1);
		!target.hasClass("to-top") ? $("html, body").animate({ scrollTop: scrollPos + "px" }, 500) : $("html, body").animate({ scrollTop: 0 }, 800);
	}

	app.ArrowAutoScroll = ArrowAutoScroll;

})(app, jQuery, window);