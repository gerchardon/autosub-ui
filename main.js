var path = require('path');

if(!('CONFIG_DIR' in process.env)){
  // process.env.NODE_CONFIG_DIR='/home/ubuntu/.config/autosub/';
  process.env.NODE_CONFIG_DIR=path.join(process.env.APPDATA, 'AutoSubUi');
}

var videoFile = process.argv[process.argv.length - 1];
var app = require('app');  // Module to control application life.

var BrowserWindow = require('browser-window');  // Module to create native browser window.
var debug = require("debug")('autosub-ui');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});


// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  debug('test log with debug');

  var path = require('path');
  var protocol = require('protocol');
  protocol.registerProtocol('atom', function(request) {
    var url = request.url.substr(7);
    return new protocol.RequestFileJob(path.normalize(__dirname + '/' + url));
  });

  var globalResults = [];


  // In main process.
  var ipc = require('ipc');
  ipc.on('autosub', function(event, arg) {
    var Autosub = require('autosub');
    new Autosub()
      .search(path.basename(videoFile))
      .then(function(results) {
        debug('Results find, send to client');
        var i = 0;
        results.forEach(function(r){
          r.id = i;
          i++;
        });
        globalResults = results;
        event.sender.send('autosub-subs', results);
      })
      .fail(function(e) {
        debug('Search failed', e);
        event.sender.send('autosub-subs', []);
      })
      .done();
  });

  ipc.on('autosub-download', function(event, args){
    var id = args;
    debug('ask for donwload', args);

    var result = null;
    globalResults.forEach(function(r) {
      if (r.id == id) result = r;
    });
    if(result) {
      var srtFile = videoFile.replace(path.extname(videoFile), ".srt");
      var fs = require('fs');
      result.download().pipe(fs.createWriteStream(srtFile));
      event.sender.send('autobub-downloaded', 'success');
    }
  });

  mainWindow = new BrowserWindow({width: 1024, height: 768});
  mainWindow.loadUrl('atom://static/index.html');
  // mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
