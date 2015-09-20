var app = app || {};


(function(app, $, root){

	"use strict";

	function SlideScrollController(){
		this.el = $(".sequence");
		this.initialize.apply(this, arguments);
	}
	SlideScrollController.prototype = {
		initialize: initialize,
		_events: _events,
		handleScroll: handleScroll
	}

	function initialize(){
		this._events();
	}
	function _events(){
		$(root).on("scroll", $.proxy(this.handleScroll, this));
	}
	function handleScroll(e){
		var section, scrollY, i;

		scrollY = $(root).scrollTop();

		for(i = 0; i < this.el.length; i++){
			section = $(this.el[i]);

			if(scrollY >= section.offset().top){
				section.addClass("active").siblings(".sequence").removeClass("active");
			} 
		}
	}

	app.SlideScrollController = SlideScrollController;

})(app, jQuery, window);