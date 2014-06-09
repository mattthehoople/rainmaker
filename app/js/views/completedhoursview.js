window.CompletedHoursView = Backbone.View.extend({

	line: null,

    render:function () {

    	var startDate = sprint.startDate();

		var days = [0,0,0,0,0,0,0,0,0,0],
		total = 0;

		this.collection.each(function(card){
			if (card.get("actionDate") >= startDate && card.get("sprintDay") > 0){
				days[card.get("sprintDay")] = days[card.get("sprintDay")] + card.get("hours");
				total = total + card.get("hours");
			}
		});

		console.log(days);

		//TODO: possibly build a days collection from the days array. Should be reusable.
		var daysCollection = new Backbone.Collection();

		for(var i=0; i<days.length;i++){
			daysCollection.add([
				{x: (i+1), y: (total - days[i])}
			]);
		}

		console.log(daysCollection);

		this.line = new Backbone.D3.Line({
			collection: daysCollection
		});

		$(this.el).html(this.template());

		this.$("#line").append(this.line.el);

        return this;
    },

    draw: function(){
    	this.line.render();
    }

});
