var app = app || {};

(function(app, $, root){

	"use strict";

	var toggleScroll = new app.ToggleScroll();

	function MenuController(){
		this.el = $("#toggle-menu");
		this.initialize.apply(this, arguments);
	}
	MenuController.prototype = {
		page: [],
		initialize: initialize,
		_events: _events,
		toggleMenu: toggleMenu
	}

	function initialize(){
		this._events();
		this.page = $("#page");
	}
	function _events(){
		this.el.on("click", $.proxy(this.toggleMenu, this));
	}
	function toggleMenu(e){
		e.preventDefault();
		this.page.hasClass("menu-opened") ? toggleScroll.disable() : toggleScroll.enable();
		this.page.toggleClass("menu-opened");
	}

	app.MenuController = MenuController;

})(app, jQuery, window);