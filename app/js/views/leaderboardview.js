var LeaderboardView = ListView.extend({


    render:function (eventName) {

      var startDate = sprint.startDate(),
        scores = [];

      this.collection.each(function(card){
        if (card.get("actionDate") >= startDate && card.get("sprintDay") > 0){

          var added = false,
            teamMember = card.get("teamMember");
          scores.forEach(function(score){
            if(score.teamMember == teamMember ){
              score.score = score.score + card.get("hours");
              added = true;
            }
          });

          if(!added){
            scores.push({teamMember: teamMember, name: card.get("memberName"), score: card.get("hours")});
          }
        }
      });

      scores.sort(function (a, b) {
          if (a.score > b.score)
            return 1;
          if (a.score < b.score)
            return -1;
          return 0;
      }).reverse();

      var topFive = scores.slice(0, 5);

      var collection = new Backbone.Collection();

      topFive.forEach(function(score){
        var model = new Backbone.Model(score);
        collection.add(model);
      });


      this.$el.html(this.template());

      collection.each(this.addOne);
      return this;
    },

    target_div: '#leaders',

    getItemView: function(model) {
      return new LeaderboardItemView({model: model});
    }

});

window.LeaderboardItemView = ListItemView.extend({

});
