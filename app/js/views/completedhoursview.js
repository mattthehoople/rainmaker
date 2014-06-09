window.CompletedHoursView = Backbone.View.extend({

	line: null,
	checklists: null,

    render:function () {

    	var startDate = sprint.startDate(),
				days = [0,0,0,0,0,0,0,0,0,0],
				total = 0,
				checklists = this.checklists;
				target = this.checklists.getHours();

		this.collection.each(function(card){
			if (card.get("actionDate") >= startDate && card.get("sprintDay") > 0){
				//this action was completed during this sprint
				//so add it to its days total
				days[card.get("sprintDay")] = days[card.get("sprintDay")] + card.get("hours");
			}else{

				//this task was completed before this sprint so we take its
				//value off the target, but only if the card is still on the board
				var isOnBoard = false;

				checklists.each(function(checklist){
					if( checklist.get("cardId") == card.get("cardId")){
						isOnBoard = true;
					}
				});

				if(isOnBoard){
					target = target - card.get("hours");
				}
			}
		});

		var values = [],
			i = 1;
		days.reduce(function(total, item) {
			target = target - item;
			values.push({x: i, y: target});
			i++;
		}, target);


		var daysCollection = new Backbone.Collection({
      "values": values,
      "color": "#BD362F"
    });

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
