var Action = Backbone.Model.extend({

	defaults: {
		id:	null,
    	actionDate: null,
		sprintDay: 0,
		hours: 0
    },

    parse: function(response){
    	var actionDateSplit = response.date.slice(0,10).split("-")
		var actionDate = new Date(parseInt(actionDateSplit[0]), parseInt(actionDateSplit[1])-1, parseInt(actionDateSplit[2]));
		var startDate = sprint.startDate();
		var diffDays = Math.round(Math.abs((startDate.getTime() - actionDate.getTime())/(24*60*60*1000)));

		var setHash = {};

		var regExp = /\(([^)]+)\)/;
		var matches = regExp.exec(response.data.checkItem.name);
		if ((typeof(matches) !== 'undefined') && (matches !== null) && (matches.length > 0)){
			setHash.hours = parseInt(matches[1]) || 0;
		}else{
			setHash.hours = 0;
		}

		//start date is a thursday, so day differences of 3,4,10 and 11 should be ignored
		if(diffDays > 0){
			if(diffDays < 2){
				setHash.sprintDay = diffDays;
			}else{
				if (diffDays > 4){
					if(diffDays < 10){
						setHash.sprintDay = diffDays-2;
					}else if( (diffDays >11) && (diffDays < 14)){
						setHash.sprintDay = diffDays-4;
					}
				}
			}
		}else{
			//This task was completed before the sprint began
			setHash.sprintDay = -1;
		}

	    setHash.actionDate = actionDate;
	    return setHash;
	}
});

var ActionCollection = Backbone.Collection.extend({
    model: Action,
    url : "https://api.trello.com/1/boards/"+settings.board+"/actions?limit=1000&filter=updateCheckItemStateOnCard&fields=data,date&key="+settings.trelloUser.key+"&token="+settings.trelloUser.token
});
