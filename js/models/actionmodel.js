var Action = Backbone.Model.extend({

    urlRoot:"",

	url: function() {},

	defaults: {
		id:	null,
		data: "",
        date: ""
    }
});

var ActionCollection = Backbone.Collection.extend({
    model: Action,
	//TODO: get keys and stuff from settings
    url : "https://api.trello.com/1/boards/"+settings.board+"/actions?limit=1000&filter=updateCheckItemStateOnCard&fields=data,date&key="+settings.trelloUser.key+"&token="+settings.trelloUser.token
});
