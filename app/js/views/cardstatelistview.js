window.CardStateListView = ListView.extend({

	target_div: '#cards',

	getItemView: function(model) {
		return new CardStateListItemView({model: model});
	}		
	
});

window.CardStateListItemView = ListItemView.extend({
	
});