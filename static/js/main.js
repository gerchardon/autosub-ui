requirejs.config({
  paths: {
    jquery: '../vendor/jquery/dist/jquery',
    marionette: '../vendor/marionette/lib/backbone.marionette.min',
    backbone: '../vendor/backbone/backbone-min',
    underscore: '../vendor/underscore/underscore-min'
  }
});

requirejs(['jquery', 'marionette', 'backbone', 'router'], function($, Mn, Backbone, MyAppRouter) {
  // FIXME: MyApp Global ?
  MyApp = new Mn.Application({
    someMethod: function(){
      console.log('MyApp.someMethod()');
    }
  });

  MyApp.addInitializer(function(options){
    MyApp.addRegions({
      mainRegion: '#main'
    });
  });

  MyApp.addInitializer(function(options){
    new MyAppRouter();
    Backbone.history.start();
  });

  MyApp.start();
  // Load some initial data, and then start our application
  // loadInitialData().then(app.start);
});
