var app = app || {};

(function(app, $, root){

	"use strict";

	var transform = app.getVendor("transform");

	function Parallax(){
		this.el = $(".parallax-holder");
		this.initialize.apply(this, arguments);
	}
	Parallax.prototype = {
		holders: [],
		resolution: {},
		initialize: initialize,
		_events: _events,
		setResolution: setResolution,
		handleMove: handleMove
	}

	function initialize(){
		this.holders = $(".sequence");
		this._events();

		this.setResolution();
	}
	function _events(){
		$(root).on("resize", $.proxy(this.setResolution, this));
		this.holders.on("mousemove", $.proxy(this.handleMove, this));
	}
	function setResolution(e){
		this.resolution.x = root.innerWidth;
		this.resolution.y = root.innerHeight;
	}
	function handleMove(e){
		var item, shift, distance;

		distance = e.pageX / this.resolution.x;

		$.each(this.el, function(){
			item = $(this);
			shift = item.data("shift");

			distance *= shift;
			item.css({transform: "translateX("+ distance +"px)"});
		});
	}

	app.Parallax = Parallax;

})(app, jQuery, window);