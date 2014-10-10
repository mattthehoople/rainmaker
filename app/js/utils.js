var templateLoader = {

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

var sprint = {
    sprintNumber: function(){

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
};

var settings = {

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
};

var redirect = {
  
  toUrl: function(url){
    window.location = url;
  }
};

var cookiewrapper = {
  
  get: function(key){
    return Cookie.get(key);
  }
};
