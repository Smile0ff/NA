var app = app || {};

(function(app, $, root){

	"use strict";

	function ScrollTop(){
		this.el = $("#to-top");
		this.initialize.apply(this, arguments);
	}
	ScrollTop.prototype = {
		initialize: initialize,
		_events: _events,
		handleTop: handleTop
	}

	function initialize(){
		this._events();
	}
	function _events(){
		this.el.on("click", $.proxy(this.handleTop, this));
	}
	function handleTop(e){
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, 1200);
	}

	app.ScrollTop = ScrollTop;

})(app, jQuery, window);