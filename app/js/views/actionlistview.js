window.ActionListView = ListView.extend({

	target_div: '#actions',	
	
 //    events: {
	// 	"click .add"	: "album"
 //    },	

	// album: function() {
	// 	app.navigate("album",true);
	// },

	getItemView: function(model) {
		return new ActionListItemView({model: model});
	}		
	
});

window.ActionListItemView = ListItemView.extend({
	
	// events: {
	// 	"click .request"   	: "request"		
	// },

	// request: function() {
 //        return false;
	// }
});