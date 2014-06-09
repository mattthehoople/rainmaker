describe("Router", function() {
  var testSubject;

  beforeEach(function() {
    testSubject = new Router();
  });

  it("should redirect to login if token cookie is not set", function() {
    spyOn(redirect, 'toUrl');
    spyOn(cookiewrapper, 'get').and.returnValue(false);

    testSubject.initialize();

    expect(cookiewrapper.get).toHaveBeenCalledWith('token');
    expect(cookiewrapper.get).not.toHaveBeenCalledWith('key');
    expect(cookiewrapper.get).not.toHaveBeenCalledWith('board');

    expect(redirect.toUrl).toHaveBeenCalledWith(settings.host+'login.html');

  });

  it("should redirect to login if token cookie is a blank string", function() {
    spyOn(redirect, 'toUrl');
    spyOn(cookiewrapper, 'get').and.callFake(function(key){
      if(key=="token") return "";
      if(key=="key") return "";
      if(key=="board") return "";    
    });
    testSubject.initialize();

    expect(cookiewrapper.get).toHaveBeenCalledWith('token');
    expect(cookiewrapper.get).not.toHaveBeenCalledWith('key');
    expect(cookiewrapper.get).not.toHaveBeenCalledWith('board');

    expect(redirect.toUrl).toHaveBeenCalledWith(settings.host+'login.html');

  });


  it("should redirect to login if key cookie is not set", function() {
    spyOn(redirect, 'toUrl');
    spyOn(cookiewrapper, 'get').and.callFake(function(key){
      if(key=="token") return "token";
      if(key=="key") return false;
      if(key=="board") return "";    
    });
    testSubject.initialize();

    expect(cookiewrapper.get).toHaveBeenCalledWith('token');
    expect(cookiewrapper.get).toHaveBeenCalledWith('key');
    expect(cookiewrapper.get).not.toHaveBeenCalledWith('board');

    expect(redirect.toUrl).toHaveBeenCalledWith(settings.host+'login.html');

  });

  it("should redirect to login if key cookie is a blank string", function() {
    spyOn(redirect, 'toUrl');
    spyOn(cookiewrapper, 'get').and.callFake(function(key){
      if(key=="token") return "token";
      if(key=="key") return "";
      if(key=="board") return "";    
    });
    testSubject.initialize();

    expect(cookiewrapper.get).toHaveBeenCalledWith('token');
    expect(cookiewrapper.get).toHaveBeenCalledWith('key');
    expect(cookiewrapper.get).not.toHaveBeenCalledWith('board');

    expect(redirect.toUrl).toHaveBeenCalledWith(settings.host+'login.html');

  });

  it("should redirect to login if board cookie is not set", function() {
    spyOn(redirect, 'toUrl');
    spyOn(cookiewrapper, 'get').and.callFake(function(key){
      if(key=="token") return "token";
      if(key=="key") return "key";
      if(key=="board") return false;    
    });
    testSubject.initialize();

    expect(cookiewrapper.get).toHaveBeenCalledWith('token');
    expect(cookiewrapper.get).toHaveBeenCalledWith('key');
    expect(cookiewrapper.get).toHaveBeenCalledWith('board');

    expect(redirect.toUrl).toHaveBeenCalledWith(settings.host+'login.html');

  });
  

  it("should redirect to login if board cookie is a blank string", function() {
    spyOn(redirect, 'toUrl');
    spyOn(cookiewrapper, 'get').and.callFake(function(key){
      if(key=="token") return "token";
      if(key=="key") return "key";
      if(key=="board") return "";    
    });
    testSubject.initialize();

    expect(cookiewrapper.get).toHaveBeenCalledWith('token');
    expect(cookiewrapper.get).toHaveBeenCalledWith('key');
    expect(cookiewrapper.get).toHaveBeenCalledWith('board');

    expect(redirect.toUrl).toHaveBeenCalledWith(settings.host+'login.html');

  });
  

  it("should not redirect if all cookies are set", function() {
    spyOn(redirect, 'toUrl');
    spyOn(cookiewrapper, 'get').and.callFake(function(key){
      if(key=="token") return "token";
      if(key=="key") return "key";
      if(key=="board") return "board";    
    });
    testSubject.initialize();

    expect(cookiewrapper.get).toHaveBeenCalledWith('token');
    expect(cookiewrapper.get).toHaveBeenCalledWith('key');
    expect(cookiewrapper.get).toHaveBeenCalledWith('board');

    expect(redirect.toUrl).not.toHaveBeenCalledWith(settings.host+'login.html');

  });      
});
