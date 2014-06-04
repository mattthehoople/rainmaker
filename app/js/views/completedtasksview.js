window.CompletedTasksView = Backbone.View.extend({

	bar: null,

    render:function () {


        var startDate = sprint.startDate();

        this.$("#title").append("<h4>Sprint "+sprint.sprint()+": Completed tasks</h4>");

		var days = [0,0,0,0,0,0,0,0,0,0];

		this.collection.each(function(card){
			if (card.get("actionDate") >= startDate && card.get("sprintDay") > 0){
				days[card.get("sprintDay")]++;
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
