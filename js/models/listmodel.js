var ListModel = Backbone.Model.extend({
	defaults: {
		id:	null,
		name: ""
    },

	//TODO: get keys and stuff from settings
    url : "https://api.trello.com/1/lists/"+window.settings.list()+"?key="+window.settings.trelloUser.key+"&token="+window.settings.trelloUser.token+""  
});