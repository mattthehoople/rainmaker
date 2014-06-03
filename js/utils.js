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

window.sprint = {
    sprint: function(){

        var now = new Date().getTime(),
          sprint = 0;

        $.each(settings.sprintStartDays(), function (key, date){
            if(now > date){
              sprint++;
            }
        });

        sprint = sprint - settings.missedSprints;

        return sprint;

    },

    startDate: function(){

        var sprintStartDate;

        var	now = new Date().getTime();

        $.each(settings.sprintStartDays(), function (key, date){
            if(now > date){
              sprintStartDate = date;
            }
        });

        return new Date(sprintStartDate);

    }
}

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
