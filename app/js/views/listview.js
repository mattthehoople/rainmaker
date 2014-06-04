var ListView = Backbone.View.extend({

	target_div: null,
	
    initialize : function() {
        _.bindAll(this,'render','addOne');
    },
	
	render: function(eventName) {
		this.$el.html(this.template());

		this.collection.each(this.addOne);
		return this;
	},
	
	addOne: function(model) {
		view = this.getItemView(model);
		var element = view.render().$el;

		this.$(this.target_div).append(element);
	},

	getItemView: function(model) {
		return null;
	}	
	
});

var ListItemView = Backbone.View.extend({

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function (eventName) {
		this.setElement( $(this.template(this.model.toJSON())) );
        return this;
    },

    close:function () {
        $(this.el).unbind();
        $(this.el).remove();
    }
});