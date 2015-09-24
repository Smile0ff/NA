var app = app || {};

(function(app, $, root){

	"use strict";

	function TouchHover(){
		this.el = $(".touch");
		this.initialize.apply(this, arguments);
	}
	TouchHover.prototype = {
		initialize: initialize,
		_events: _events,
		touchStart: touchStart,
		touchEnd: touchEnd
	}

	function initialize(){
		this._events();
	}
	function _events(){
		this.el.on("touchstart", $.proxy(this.touchStart, this))
			    .on("touchend touchcancel", $.proxy(this.touchEnd, this));
	}
	function touchStart(e){
		$(e.target).closest(".touch").removeClass("touch-end").addClass("touch-start");
	}
	function touchEnd(e){
		$(e.target).closest(".touch").removeClass("touch-start").addClass("touch-end");
	}

	app.touchHover = new TouchHover();

})(app, jQuery, window);