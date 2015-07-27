requirejs.config({
  paths: {
    jquery: '../vendor/jquery/dist/jquery',
    marionette: '../vendor/marionette/lib/backbone.marionette.min',
    backbone: '../vendor/backbone/backbone-min',
    lodash: '../vendor/lodash/lodash.min',
    underscore: '../vendor/underscore/underscore-min',
    text: '../vendor/text/text',
    toastr: '../vendor/toastr/toastr.min'
  }
});

requirejs(['jquery', 'marionette', 'backbone', 'lodash', 'toastr', 'router', 'models/subs'], function($, Mn, Backbone, _, Toastr, AppRouter, Subs) {

  MyApp = new Mn.Application();

  // In renderer process (web page).
  var ipc = require('ipc');
  ipc.on('autosub-subs', function(results) {
    if(_.isEmpty(results)) {
      Toastr.info('No Subtitles found.');
    }
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
