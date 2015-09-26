var app = app || {};

$(function(){

	new app.SlideScrollController();
	new app.MenuController();

	if(app.isMobile()) return;
	new app.Parallax();
	new app.GradientFlow();
	
});