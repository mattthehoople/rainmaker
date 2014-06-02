// The Template Loader. Used to asynchronously load templates located in separate .html files
window.templateLoader = {

    load: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

};

window.settings = {
  host : "http://localhost/rainmaker/",

  trelloUser : {
    token : Cookie.get('token'),
    key : Cookie.get('key')
  },

  sprintZero : 1344470400000,

  missedSprints : 7,

  //Your main sprint board
  board : "51a7310f77b391ff2300077a",

  sprintStartDays : function(){
    var days = [];
    days.push(this.sprintZero);
    for (var i=1;i<500;i++){
      days.push(this.sprintZero + (i * 12096e5 ));
    }
    return days;
  }
}
