var app = app || {};

(function(app, $, root){

	"use strcit";

	function ScreenResolution(){
		this.initialize();
	}
	ScreenResolution.prototype = {
		resolution: {},
		initialize: initialize,
		_events: _events,
		setResolution: setResolution,
		getResolution: getResolution
	}

	function initialize(){
		this._events();
		this.setResolution();
	}
	function _events(){
		$(root).on("resize", $.proxy(this.setResolution, this));
	}
	function setResolution(e){
		this.resolution.w = root.innerWidth;
		this.resolution.h = root.innerHeight;
	}
	function getResolution(){
		return this.resolution;
	}

	app.ScreenResolution = ScreenResolution;

})(app, jQuery, window);