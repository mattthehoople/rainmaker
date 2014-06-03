var Action = Backbone.Model.extend({

	defaults: {
		id:	null,
        actionDate: null
    },

    parse: function(response){
    	var actionDateSplit = response.date.slice(0,10).split("-")
		var actionDate = new Date(parseInt(actionDateSplit[0]), parseInt(actionDateSplit[1])-1, parseInt(actionDateSplit[2]));

	    var setHash = {};

	    setHash.actionDate = actionDate;
	    return setHash;
	}
});

var ActionCollection = Backbone.Collection.extend({
    model: Action,
    url : "https://api.trello.com/1/boards/"+settings.board+"/actions?limit=1000&filter=updateCheckItemStateOnCard&fields=data,date&key="+settings.trelloUser.key+"&token="+settings.trelloUser.token
});
