var app = app || {};

(function(app, $, root){

	"use strict";

	var screenResolution = new app.ScreenResolution(),
		transform = app.getVendor("transform"),
		transition = app.getVendor("transition");

	function Parallax(){
		this.el = $(".parallax-holder");
		this.initialize.apply(this, arguments);
	}
	Parallax.prototype = {
		holders: [],
		initialize: initialize,
		_events: _events,
		handleMove: handleMove
	}

	function initialize(){
		this.holders = $(".sequence");
		this._events();
	}
	function _events(){
		this.holders.on("mousemove", $.proxy(this.handleMove, this));
	}
	function handleMove(e){
		var item, shift, distance;

		distance = e.pageX / screenResolution.resolution.w;

		$.each(this.el, function(){
			item = $(this);
			shift = item.data("shift");

			item.css({transform: "translateX("+ distance * shift +"px)"});
		});
	}

	app.Parallax = Parallax;

})(app, jQuery, window);