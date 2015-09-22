var app = app || {};


(function(app, $, root){

	"use strict";

	var screenResolution = new app.ScreenResolution(),
		_keyCodes = [
			{key: 38, direction: "up"},
			{key: 40, direction: "down"}
		];

	function SlideScrollController(){
		this.el = $(".sequence");
		this.initialize.apply(this, arguments);
	}
	SlideScrollController.prototype = {
		_body: [],
		arrows: [],
		current: 0,
		isScrolled: false,
		initialize: initialize,
		_events: _events,
		handleScroll: handleScroll,
		handleKey: handleKey,
		handleArrow: handleArrow,
		checkKey: checkKey,
		updateCurrent: updateCurrent,
		scrollPosition: scrollPosition,
		scrollToSlide: scrollToSlide
	}

	function initialize(){
		this._body = $("html, body");
		this.arrows = $(".arrow-down");

		this._events();
	}
	function _events(){
		$(root).on("DOMMouseScroll mousewheel", $.proxy(this.handleScroll, this))
				.on("keydown", $.proxy(this.handleKey, this));

		this.arrows.on("click", $.proxy(this.handleArrow, this));
	}
	function handleScroll(e){
		if(this.isScrolled) return;
		var direction = (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) ? "down" : "up";

		if(!direction) return;
		this.updateCurrent(direction);
		this.scrollToSlide(false, this.current);

		return false;
	}
	function handleKey(e){
		if(this.isScrolled) return;	
		var direction = this.checkKey(e.which);

		if(!direction) return;
		this.updateCurrent(direction);
		this.scrollToSlide(false, this.current);

		return false;
	}
	function handleArrow(e){
		if(this.isScrolled) return;
		var target = $(e.target).closest(".arrow-down"),
			slideIndex = target.closest(".sequence").index() + 1;

		this.scrollToSlide(target.hasClass("to-top"), slideIndex);
		return false;
	}
	function checkKey(code){
		var keyCode, i;

		for(i = 0; i < _keyCodes.length; i++){
			keyCode = _keyCodes[i];
			if(keyCode.key === code) return keyCode.direction;
		}
		return false;
	}
	function updateCurrent(direction){
		direction === "down" ? this.current++ : this.current--;

		if(this.current <= 0) this.current = 0;
		if(this.current >= this.el.length - 1) this.current = this.el.length - 1;
	}
	function scrollPosition(index){

	}
	function scrollToSlide(toTop, index){
		var self = this,
			currentSlide = self.el.eq(index),
			positionY = toTop ? 0 : currentSlide.offset().top;

		this.isScrolled = true;

		this._body.stop().animate({scrollTop: positionY + "px"}, 500, function(){
			self.isScrolled = false;
			currentSlide.addClass("active").siblings(".sequence").removeClass("active");
		});
	}

	app.SlideScrollController = SlideScrollController;

})(app, jQuery, window);