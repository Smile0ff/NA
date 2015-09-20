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

		var percentage = e.pageX / this.resolution.x * 100;

		$.each(this.el, function(index, val){
			
			$(this).css({
				"background-image": "linear-gradient("+ (120 + (percentage / 3)) * -1 +"deg, #fdfdfd 0px, #ebebeb "+ percentage +"%, #fdfdfd 100%), linear-gradient("+ 45 + percentage +"deg, #fdfdfd 0px, #ebebeb "+ percentage +"%, #fdfdfd 100%)"
			});
		});
	}

	app.GradientFlow = GradientFlow;

})(app, jQuery, window);