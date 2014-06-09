var CheckList = Backbone.Model.extend({
  defaults: {
    id:	null,
    cardId: null,
    hours: 0,
  },

  parse: function(response){

      var setHash = {},
        totalHours = 0;

      setHash.id = response.id;

      response.checkItems.forEach(function(checkItem) {

        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(checkItem.name);
        if ((typeof(matches) !== 'undefined') && (matches !== null) && (matches.length > 0)){
          if(parseInt(matches[1]) < 50 ){
            //In case someone adds defect numbers in (brackets)
            totalHours = totalHours + parseInt(matches[1]) || 0;
          }
        }
      });
      setHash.cardId = response.idCard;
      setHash.hours = totalHours;
      return setHash;
  }
});

var CheckListCollection = Backbone.Collection.extend({
    model: CheckList,

    getHours: function(){
      return this.reduce(function(total, item) { return total + item.get("hours"); }, 0);

    },

    url : "https://api.trello.com/1/boards/"+settings.board+"/checklists?key="+settings.trelloUser.key+"&token="+settings.trelloUser.token
});
