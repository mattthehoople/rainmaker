window.CompletedTasksView = Backbone.View.extend({

	bar: null,

    render:function () {

    	var sprintStartDate;

        var	now = new Date().getTime(),
        	sprint = 0;

        $.each(settings.sprintStartDays(), function (key, date){
        		if(now > date){
        			sprintStartDate = date;
        			sprint++;
        		}
        });

        sprint = sprint - settings.missedSprints;

        var startDate = new Date(sprintStartDate);

        $("#title").append("<h4>Sprint "+sprint+": "+startDate+"</h4>");

		var days = [0,0,0,0,0,0,0,0,0,0];

		this.collection.each(function(card){
			//TODO: The creation of the daays array can be either a helper method on the view or a new class (literal?)
			if (card.get("actionDate") >= startDate){
				var diffDays = Math.round(Math.abs((startDate.getTime() - card.get("actionDate").getTime())/(24*60*60*1000)));
				//start date is a thursday, so day differences of 3,4,10 and 11 should be ignored
				if(diffDays > 0){
					if(diffDays < 2){
						days[diffDays]++;
					}else{
						if (diffDays > 4){
							if(diffDays < 10){
								days[diffDays-2]++;
							}else if( (diffDays >11) && (diffDays < 14)){
								days[diffDays-4]++;
							}
						}
					}
				}
			}
		});

		//TODO: possibly build a days collection from the days array. Should be reusable.  
		var daysCollection = new Backbone.Collection();

		for(var i=0; i<days.length;i++){
			daysCollection.add([
				{x: "Day "+(i+1), y: days[i]}
			]);
		}

		this.bar = new Backbone.D3.Bar({
			collection: daysCollection
		});

		$(this.el).html(this.template());

		this.$("#graph").append(this.bar.el);

        return this;
    },

    draw: function(){
    	this.bar.render();
    }

});