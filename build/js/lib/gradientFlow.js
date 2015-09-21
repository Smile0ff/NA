var app = app || {};

(function(app, $, root){

	"use strcit";

	var screenResolution = new app.ScreenResolution();

	function GradientFlow(){
		this.el = $(".sequence");
		this.initialize.apply(this, arguments);
	}
	GradientFlow.prototype = {
		initialize: initialize,
		_events: _events,
		handleMove: handleMove
	}

	function initialize(){
		this._events();
	}
	function _events(){
		this.el.on("mousemove", $.proxy(this.handleMove, this));
	}
	function handleMove(e){
		e.preventDefault();

		var percentage = e.pageX / screenResolution.resolution.w * 100;

		$.each(this.el, function(index, val){
			
			$(this).css({
				"background-image": "linear-gradient("+ (120 + (percentage / 3)) * -1 +"deg, #fdfdfd 0px, #ebebeb "+ percentage +"%, #fdfdfd 100%), linear-gradient("+ 45 + percentage +"deg, #fdfdfd 0px, #ebebeb "+ percentage +"%, #fdfdfd 100%)"
			});
		});
	}

	app.GradientFlow = GradientFlow;

})(app, jQuery, window);