var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

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

  var express = require("express");
  var app = express();
  app.use('/vendor', express.static('vendor/'));
  app.use(express.static('static/'));
  app.listen(3131);

  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('http://localhost:3131/index.html');
  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
