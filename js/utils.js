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
