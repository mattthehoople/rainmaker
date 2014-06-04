window.Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "burndown": "burndown"
    },

    initialize: function () {
        if(!cookiewrapper.get('token')
        || !cookiewrapper.get('key')
        || !cookiewrapper.get('board')
        || cookiewrapper.get('token') == ""
        || cookiewrapper.get('key') == ""
        || cookiewrapper.get('board') == ""){
            redirect.toUrl(settings.host+"login.html");
            return false;
        }

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
