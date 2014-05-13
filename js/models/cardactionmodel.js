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
    url : "https://api.trello.com/1/boards/51a7310f77b391ff2300077a/actions?filter=updateCheckItemStateOnCard&fields=data,date&key=b8eda3c68030f4399f5fb49231051646&token=b9c914238359cf75151c12d038e0d29e4381bf810ebdd6b24bee9d77e3d88fd8"
});