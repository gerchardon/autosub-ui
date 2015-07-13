var os = require('os');
var path = require('path');

module.exports = function(grunt) {
  "use strict";
  require('load-grunt-tasks')(grunt);

  //var tmpDir = os.tmpdir();
  var tmpDir = 'tmp';
  var buildDir = path.join(tmpDir, 'atom-build');
  var shellAppDir = path.join(buildDir, 'AutoSub');
  grunt.file.mkdir(shellAppDir);
  var asarFile = path.join(shellAppDir, 'resources', 'app.asar');

  grunt.initConfig({
    asar: {
      app: {
        cwd: '../',
        src: ['**/*', '!build/**/*'],
        expand: true,
        dest: asarFile
      }
    },
    'download-electron': {
      version: '0.29.2',
      outputDir: shellAppDir,
      appDir: '../',
      rebuild: true
    },
    'create-windows-installer': {
      appDirectory: shellAppDir,
      outputDirectory: path.join(buildDir, 'installer'),
      authors: 'AutoSub',
      exe: 'electron.exe',
      // loadingGif: path.resolve(__dirname, '..', 'resources', 'win', 'loading.gif'),
      // iconUrl: 'https://raw.githubusercontent.com/atom/atom/master/resources/win/atom.ico',
      setupIcon: path.resolve(__dirname, '..', 'assets', 'win', 'autosub.ico'),
      // remoteReleases: 'https://atom.io/api/updates'
    }
  });

  grunt.registerTask('default', ['dist']);
  grunt.registerTask('dist', ['download-electron', 'asar', 'create-windows-installer']);
};
