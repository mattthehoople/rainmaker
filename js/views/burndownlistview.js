window.BurnDownListView = ListView.extend({

	target_div: '#charts',	
	
 //    events: {
	// 	"click .add"	: "album"
 //    },	

	// album: function() {
	// 	app.navigate("album",true);
	// },

	getItemView: function(model) {
		return new BurnDownListItemView({model: model});
	}		
	
});

window.BurnDownListItemView = ListItemView.extend({
	
    render:function (eventName) {

    	this.setElement( $(this.template(this.model.toJSON())) );
        return this;
    }
});