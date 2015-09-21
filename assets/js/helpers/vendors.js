var app = app || {};

(function(app, doc, root){

	"use strcit";

	function getVendor(property){
		var style = doc.createElement("div").style,
			prefixes = ['ms','O','Moz','Webkit'],
			key;

		if(style[property] === "") return property;

		property = property[0].toUpperCase() + property.slice(1);

		for(key in prefixes){
			if(style[prefixes[key] + property] === ""){
				return prefixes[key] + property;
			}
		}	
	}

	app.getVendor = getVendor;

})(app, document, window);