// http://nodejs.org/api.html#_child_processes

import * as os from "os";
import * as childprocess from 'child_process';
let exec = childprocess.exec,
	userName = os.hostname();

function htmlEntities (str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
		.replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
// executes `pwd` or 'cm' from terminal
// child = exec(os.platform() === "win32"? "cd": "pwd", function (error, stdout, stderr) {
//   console.log('stdout: ' + stdout);
//   console.log('stderr: ' + stderr);
//   if (error !== null) {
//     console.log('exec error: ' + error);
//   }
// });

function puts (error, stdout, stderr) {
	//console.log(stdout)
}

// Array with some colors
var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
// ... in random order
colors.sort();

//exec("ls -la", puts);
export const appCmd = function (cmd, connection) {
	let userColor = colors.shift();
	let child = exec(cmd, puts);
	child.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
		let obj = {
			time: (new Date()).getTime(),
			text: htmlEntities(data),
			author: userName,
			color: userColor
		};
		connection.sendUTF(JSON.stringify({type: 'message', data: obj}));
	});
	child.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
	});
	//child.on('close', function(code) {
	//console.log('closing code: ' + code);
	//});
}
export const pingPort = function (nodeport, connection) {
	let child = exec('lsof -t -i :' + nodeport, puts);
	child.stdout.on('data', function (data) {
		// console.log('stdout: ' + data);
		var obj = {
			port: nodeport,
			ping: true
		}
		connection.sendUTF(JSON.stringify({type: 'ping', data: obj}));

	});
	child.stderr.on('close', function (data) {
		// console.log('close: ' + data);
	});
}
