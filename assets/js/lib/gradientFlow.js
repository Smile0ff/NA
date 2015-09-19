var app = app || {};

(function(app, $, root){

	"use strcit";

	function GradientFlow(){
		this.el = $(".sequence");
		this.initialize.apply(this, arguments);
	}
	GradientFlow.prototype = {
		resolution: {},
		initialize: initialize,
		_events: _events,
		setResolution: setResolution,
		handleMove: handleMove
	}

	function initialize(){
		this._events();
		this.setResolution();
	}
	function _events(){
		$(root).on("resize", $.proxy(this.setResolution, this));
		this.el.on("mousemove", $.proxy(this.handleMove, this));
	}
	function setResolution(e){
		this.resolution.x = root.innerWidth;
		this.resolution.y = root.innerHeight;

		this.resolution.cx = this.resolution.x / 2;
		this.resolution.cy = this.resolution.y / 2;
	}
	function handleMove(e){
		e.preventDefault();

		var dx, dy, angle, xPerc, yPerc;

		dx = e.pageX - this.resolution.cx;
		dy = e.pageY - this.resolution.cy;
		angle = Math.atan2(dx, dy) * 180 / Math.PI;

		xPerc = e.pageX / this.resolution.x * 100;
		yPerc = e.pageY / this.resolution.y * 100;

		$.each(this.el, function(index, val){
			
			$(this).css({
				"background-image": "linear-gradient("+ (angle / 2) * -1 +"deg, rgba(145, 147, 150, .1) 0%, #919396 "+ xPerc +"%), linear-gradient("+ angle / 3 +"deg, rgba(145, 147, 150, .1) 0%, #fdfdfd "+ xPerc +"%)"
			});

		});
	}

	app.GradientFlow = GradientFlow;

})(app, jQuery, window);