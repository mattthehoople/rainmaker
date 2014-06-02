/*window.trelloUser = {
	token : "d6be2fc615ad63bcd9050cbfbf9b8792f8ce1905f92389f8c70393ed2d5097ce",
	key : "b8eda3c68030f4399f5fb49231051646",
	board : "51a7310f77b391ff2300077a"
};
window.sprintZero = 1344470400000;
window.sprintStartDays = [];
sprintStartDays.push(sprintZero);*/

window.Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "burndown": "burndown"
    },

    initialize: function () {
        if(!Cookie.get('token')
        || !Cookie.get('key')
        || !Cookie.get('board')
        || Cookie.get('token') == ""
        || Cookie.get('key') == ""
        || Cookie.get('board') == ""){
            window.location = settings.host+"/login.html";
            return false;
        }



    	this.header = new Header();
        $('#header').html(this.header.render().el);

        this.footer = new Footer();
        this.footer.render();
		$("#footer").append(this.footer.el);
    },

    home: function () {
        $("#center").empty();
        var cards = new CardStateCollection();
        var cardsView = new CardStateListView({collection:cards});
        cards.fetch({
            success: function (data) {
                $('#center').append(cardsView.render().el);
            },
            error: function (data) {
                alert(data);
            },
        });
    },

    burndown: function () {
        $("#center").empty();
        var cards = new ActionCollection();
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

				$("#center").append("<h4>Sprint "+sprint+": "+startDate+"</h4>");

	      cards.fetch({

	          success: function (data) {

	              var days = [0,0,0,0,0,0,0,0,0,0];

	              cards.forEach(function(card){
	                  var actionDateSplit = card.get('date').slice(0,10).split("-")
	                  var actionDate = new Date(parseInt(actionDateSplit[0]), parseInt(actionDateSplit[1])-1, parseInt(actionDateSplit[2]));

	                  if (actionDate >= startDate){
	                      var diffDays = Math.round(Math.abs((startDate.getTime() - actionDate.getTime())/(24*60*60*1000)));
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

	              var daysCollection = new Backbone.Collection();

	              for(var i=0; i<days.length;i++){
	                  daysCollection.add([
	                     {x: "Day "+(i+1), y: days[i]}
	                  ]);
	              }

	              var bar = new Backbone.D3.Bar({
	                  collection: daysCollection
	              });

	              $("#center").append(bar.el);
	              bar.render();

	          },
	      });

    }
});

templateLoader.load(["Header", "Footer", "CardStateListView", "CardStateListItemView", "BurnDownListView", "BurnDownListItemView"],
	function () {
    	app = new Router();
    	Backbone.history.start();
	}
);
