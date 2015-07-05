requirejs.config({
  paths: {
    jquery: '../vendor/jquery/dist/jquery',
    marionette: '../vendor/marionette/lib/backbone.marionette.min',
    backbone: '../vendor/backbone/backbone-min',
    underscore: '../vendor/underscore/underscore-min',
    text: '../vendor/text/text'
  }
});

requirejs(['jquery', 'marionette', 'backbone', 'router', 'models/subs'], function($, Mn, Backbone, AppRouter, Subs) {

  MyApp = new Mn.Application();

  // In renderer process (web page).
  var ipc = require('ipc');
  ipc.on('autosub-subs', function(results) {
    Subs.reset(results);
  });

  MyApp.addInitializer(function(options){
    MyApp.addRegions({
      mainRegion: '#main'
    });
  });

  MyApp.on('start', function(){
    new AppRouter();
    Backbone.history.start();
    ipc.send('autosub', 'ready');
  });

  MyApp.start();
});
