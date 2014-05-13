var BurnDown = Backbone.Model.extend({
	defaults: {
		id: null,
		name:	"",
		sprint: 0,
		storyPoints: 0,
        hours: 0,
        days: null
    }
});

var BurnDownCollection = Backbone.Collection.extend({
    model: BurnDown
});