/*window.trelloUser = {
	token : "d6be2fc615ad63bcd9050cbfbf9b8792f8ce1905f92389f8c70393ed2d5097ce",
	key : "b8eda3c68030f4399f5fb49231051646",
	board : "51a7310f77b391ff2300077a"
};
window.sprintZero = 1344470400000;
window.sprintStartDays = [];
sprintStartDays.push(sprintZero);*/

window.settings = {
	host : "http://localhost/rainmaker/",

	//TODO: Get these from the cookie instead
	
	trelloUser : {
		token : "b9c914238359cf75151c12d038e0d29e4381bf810ebdd6b24bee9d77e3d88fd8",
		key : "b8eda3c68030f4399f5fb49231051646"
	},
	
	sprintZero : 1344470400000,
	
	missedSprints : 7,
	
	//Your main sprint board
	board : "51a7310f77b391ff2300077a",
	
	//Get the first list on the board
	list: function(){
		return "52779901cc107e0d7c0008d7";
	},
	
	sprintStartDays : function(){
		var days = [];
		days.push(this.sprintZero);
		for (var i=1;i<500;i++){
			days.push(this.sprintZero + (i * 12096e5 ));
		}
		return days;
	}
}

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
			
			var startDate = date;
			if(now > date){
				sprintStartDate = date;
				sprint++;
			}
		});
		
		var date = new Date(sprintStartDate);
		
		$("#center").append("<h2>Sprint "+sprint+": "+date+"</h2>");

        var list = new ListModel();

        list.fetch({
            success: function (data){
                var startDateArray = list.get('name').split(" ")[2].split("/")
                var startDate = new Date(parseInt(startDateArray[2]), parseInt(startDateArray[1])-1, parseInt(startDateArray[0]));

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

        })

         
    }
});

templateLoader.load(["Header", "Footer", "CardStateListView", "CardStateListItemView", "BurnDownListView", "BurnDownListItemView"],
	function () {
    	app = new Router();
    	Backbone.history.start();
	}
);