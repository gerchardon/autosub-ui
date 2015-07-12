var ChildProcess = require('child_process');
var path = require('path');
var appFolder = path.resolve(process.execPath, '..');
var rootAtomFolder = path.resolve(appFolder, '..');
var updateDotExe = path.join(rootAtomFolder, 'Update.exe');
var binFolder = path.join(rootAtomFolder, 'bin')
var exeName = path.basename(process.execPath);
var Q = require('q');

var fileKeyPath = 'HKCU\\Software\\Classes\\*\\shell\\AutoSub';

var regPath, setxPath;
if(process.env.SystemRoot){
  var system32Path = path.join(process.env.SystemRoot, 'System32');
  regPath = path.join(system32Path, 'reg.exe');
  setxPath = path.join(system32Path, 'setx.exe');
}else{
  regPath = 'reg.exe';
  setxPath = 'setx.exe';
}

function spawn(command, args) {
  var deferred = Q.defer();
  var stdout = '';
  var spawnedProcess;
  try {
    spawnedProcess = ChildProcess.spawn(command, args);
  } catch (e) {}
  spawnedProcess.stdout.on('data', function(data){ stdout += data; });
  // on error
  spawnedProcess.on('error', function(e){ deferred.reject(e); });
  spawnedProcess.on('close', function(code, signal){ deferred.resolve(stdout); });
  return deferred.promise;
}

function spawnUpdate(args) {
  return spawn(updateDotExe, args);
}

function createShortcuts() {
  return spawnUpdate(['--createShortcut', exeName]);
}

function spawnReg(args) {
  return spawn(regPath, args);
}

function addToRegistry(args){
  args.unshift('add');
  args.push('/f');
  return spawnReg(args);
}
function installMenu(keyPath, arg) {
  var arg0 = [keyPath, '/ve', '/d', 'Search sub with AutoSub'];
  var arg1 = [keyPath, '/v', 'Icon', '/d', process.execPath];
  var arg2 = [keyPath+"\\command", '/ve', '/d', process.execPath + " \""+arg+"\""];
  return addToRegistry(arg0).then(addToRegistry(arg1))
    .then(addToRegistry(arg2));
}

function installContextMenu() {
  return installMenu(fileKeyPath, "%1");
}

exports.handleStartupEvent = function(app, squirrelCommand) {
  if(process.platform !== 'win32') return false;
  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      createShortcuts().then(installContextMenu()).done(function(){app.quit();});
      return true;
    case '--squirrel-uninstall':
      spawnUpdate(['--removeShortcut', exeName]).done(function(){app.quit();});
      return true;
    case '--squirrel-obsolete':
      app.quit();
      return true;
  }
  return false;
};
