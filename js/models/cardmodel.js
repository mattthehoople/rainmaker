var CardState = Backbone.Model.extend({
	defaults: {
		id:	null,
		name: "",
        desc: "",
        idBoard: "",
        idList: "",
        idMembers: [],
        labels: [],
        url: "",
        checkItems: 0,
        checkItemsChecked: 0,
        storyPoints: 0
    },

	parse: function(response){

	    var setHash = {};

	    setHash.id = response.id;
	    setHash.name = response.name;
	    setHash.desc = response.desc;
	    setHash.idBoard = response.idBoard;
	    setHash.idList = response.idList;
	    setHash.idMembers = response.idMembers;
	    setHash.labels = response.labels;
	   	setHash.url = response.url;
	   	if ((typeof(response.badges) !== 'undefined') && (response.badges !== null)){
		    setHash.checkItems = response.badges.checkItems;
		    setHash.checkItemsChecked = response.badges.checkItemsChecked;
		}
	    var regExp = /\(([^)]+)\)/;
		var matches = regExp.exec(response.name);
		if ((typeof(matches) !== 'undefined') && (matches !== null) && (matches.length > 0)){
			setHash.storyPoints = matches[1];
		}
	    return setHash;
	}
});

var CardStateCollection = Backbone.Collection.extend({
    model: CardState,
    url : "https://api.trello.com/1/boards/"+settings.board+"/cards?key="+settings.trelloUser.key+"&token="+settings.trelloUser.token
});
