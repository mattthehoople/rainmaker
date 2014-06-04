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
            redirect.toUrl(settings.host+"/login.html");
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
            }
        });
    },

    burndown: function () {
        $("#center").empty();
        var cards = new ActionCollection();
        var completedTasks = new CompletedTasksView({collection:cards});

        cards.fetch({
        success: function (data) {
            $('#center').append(completedTasks.render().el);
                completedTasks.draw();
            },
        });
    }
});

templateLoader.load(["Header", "Footer", "CardStateListView", "CardStateListItemView", "BurnDownListView", "BurnDownListItemView","CompletedTasksView"],
	function () {
    	app = new Router();
    	Backbone.history.start();
	}
);
