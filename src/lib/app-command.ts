// http://nodejs.org/api.html#_child_processes
var sys = require('sys')
var os = require('os');
var userName = os.hostname();
var exec = require('child_process').exec;
var child;
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
// executes `pwd`


child = exec(os.platform() === "win32"? "cd": "pwd", function (error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
// or more concisely
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { 
  //console.log(stdout) 
}

// Array with some colors
var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
// ... in random order
colors.sort();

//exec("ls -la", puts);
const appCmd = function(cmd, connection) {
  var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
  colors.sort();
  var userColor = colors.shift();
  var child = exec(cmd, puts);
  child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
    var obj = {
          time: (new Date()).getTime(),
          text: htmlEntities(data),
          author: userName,
          color: userColor
      };
    connection.sendUTF(JSON.stringify({  type:'message', data: obj }));
  });
  child.stderr.on('data', function(data) {
      console.log('stdout: ' + data);
  });
  //child.on('close', function(code) {
      //console.log('closing code: ' + code); 
  //});
}
const pingPort = function(nodeport, connection) {
  var child = exec('lsof -t -i :' + nodeport, puts);
  child.stdout.on('data', function(data) {
    // console.log('stdout: ' + data);
    var obj = {
        port: nodeport,
        ping: true
      }
      connection.sendUTF(JSON.stringify({  type:'ping', data: obj }));
      
  });
  child.stderr.on('close', function(data) {
      // console.log('close: ' + data);
  });
}
export default {
  appCmd,
  pingPort
}