var Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "burndown": "burndown"
    },

    initialize: function () {
        if(!cookiewrapper.get('token') || !cookiewrapper.get('key') || !cookiewrapper.get('board') || cookiewrapper.get('token') === "" || cookiewrapper.get('key') === "" || cookiewrapper.get('board') === ""){
            redirect.toUrl("/login.html");
            return false;
        }

    },

    home: function () {
        $("#center").empty();
        $("#secondary").empty();
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
        $("#secondary").empty();
        var actions = new ActionCollection();

        var completedTasks = new CompletedTasksView({collection:actions});
        var completedHours = new CompletedHoursView({collection:actions});
        var leaderboard = new LeaderboardView({collection:actions});

        var checklists = new CheckListCollection();

        checklists.fetch({
            success: function (data) {

              completedHours.checklists = checklists;

              actions.fetch({
                success: function (data) {
                  $('#center').append(completedTasks.render().el);
                  completedTasks.draw();

                  $('#center').append(completedHours.render().el);
                  completedHours.draw();

                  $('#secondary').append(leaderboard.render().el);
                },

            });
          }
        });
    }
});

templateLoader.load(["CardStateListView", "CardStateListItemView", "CompletedTasksView", "CompletedHoursView", "LeaderboardView", "LeaderboardItemView"],
	function () {
    	app = new Router();
    	Backbone.history.start();
	}
);
