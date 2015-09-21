var app = app || {};


(function(app, $, root){

	"use strict";

	var screenResolution = new app.ScreenResolution();

	function SlideScrollController(){
		this.el = $(".sequence");
		this.initialize.apply(this, arguments);
	}
	SlideScrollController.prototype = {
		initialize: initialize,
		_events: _events,
		handleScroll: handleScroll,
		checkSlides: checkSlides
	}

	function initialize(){
		this._events();
	}
	function _events(){
		$(root).on("scroll", $.proxy(this.handleScroll, this));
	}
	function handleScroll(e){
		this.checkSlides($(root).scrollTop());
	}
	function checkSlides(scrollY){
		var slide, offset, topShift, bottomShift, i;

		for(i = 0; i < this.el.length; i++){
			slide = $(this.el[i]);
			offset = slide.offset();
			topShift = slide.data("top-shift");
			bottomShift = slide.data("bottom-shift");

			(scrollY >= offset.top - topShift && scrollY <= offset.top + bottomShift) ? slide.addClass("active") : slide.removeClass("active");
		}
	}

	app.SlideScrollController = SlideScrollController;

})(app, jQuery, window);