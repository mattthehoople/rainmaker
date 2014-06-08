var FormView = Backbone.View.extend({
	
	initialize: function(options){
		this.model.on( "error", this.showError, this );
	},      
	  
	change: function (event) {
		var target = event.target;

		$('#contact_'+target.name).removeClass('error');
		$('#contact_'+target.name+' .help-inline').text("");

        var change = {};
        change[target.name] = target.value;
        this.model.set(change, {silent:true});
    },	  

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},

	showError: function(model, error){
		$('.help-inline').text('');
		$.each(error, function(index, value) {
			$('#contact_'+value[0]).addClass('error');
			$('#contact_'+value[0]).removeClass('success');
			$('#contact_'+value[0]+' .help-inline').text($('#contact_'+value[0]+' .help-inline').text() + value[1] + ' ');	
		});
	}	
	
});