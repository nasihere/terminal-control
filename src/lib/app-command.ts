// http://nodejs.org/api.html#_child_processes
import * as fs from 'fs';
import * as os from "os";
import * as childprocess from 'child_process';
import * as rc from "rc";
import { stringifyHtml } from '../utils';



let exec     = childprocess.exec,
	userName = os.hostname();


// executes `pwd` or 'cm' from terminal
// child = exec(os.platform() === "win32"? "cd": "pwd", function (error, stdout, stderr) {
//   console.log('stdout: ' + stdout);
//   console.log('stderr: ' + stderr);
//   if (error !== null) {
//     console.log('exec error: ' + error);
//   }
// });

export class appCommand {
	colors: Array<string> = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ].sort();
	configSrc:string;
	constructor(){
		let rcConfig={
			configPath:"build/htmlv2/app/app-config.json"
		}
		const config = rc('dev-micro-dashboard',rcConfig);
		this.configSrc=config.configPath;
	}
	puts = (error, stdout, stderr): void => {
	};
	appCmd = (cmd, connection) => {
		let self = this;
		let userColor = this.colors.shift();
		let child = exec(cmd, this.puts);
		child.stdout.on('data',  (data) => {
			console.log('stdout: ' + data);
			let obj = {
				time:   (new Date()).getTime(),
				text:   stringifyHtml(data),
				author: userName,
				color:  userColor
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
	pingPort =  (nodeport, connection) => {
		let child = exec('lsof -t -i :' + nodeport, this.puts);
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
	};
	saveConfig = function (newConfig, connection) {
		let obj = {
			configService: []
		};

		fs.readFile(this.configSrc, 'utf8', (err, data) => {
			if ( err ) {
				console.log(err);
			} else {
				obj = JSON.parse(data); //now it an object
				var pushJson = JSON.parse(newConfig);
				if ( pushJson.identifier === undefined ) {
					pushJson.identifier = new Date();
					obj.configService.push(pushJson); //add some data
				}
				else {
					obj.configService = obj.configService.map(x => {
						if ( x.identifier === pushJson.identifier ) {
							return pushJson;
						}
						else {
							return x;
						}
					})
				}
				const writeJson = JSON.stringify(obj); //convert it back to json
				fs.writeFile(this.configSrc, writeJson, 'utf8', (data) => {
					if ( data === null ) {
						connection.sendUTF(JSON.stringify(
							{
								type: 'saveConfig',
								data: {
									success: true,
									config:  JSON.parse(writeJson)
								}
							}
						));
					}
				}); // write it back
			}
		});
	};
	readConfig = (connection): void => {
		fs.readFile(this.configSrc, 'utf8', (err, data): void => {
			if ( err ) {
				console.log(err);
			} else {
				connection.sendUTF(JSON.stringify(
					{
						type: 'readConfig',
						data: {
							success: true,
							config:  JSON.parse(data)
						}
					}
				));
			}
		});
	};
	deleteConfig = (identifier, connection):void=> {
		if ( identifier === undefined ) {
			return;
		}
		let obj = {
			configService: []
		};
		fs.readFile(this.configSrc, 'utf8', (err, data) => {
			if ( err ) {
				console.log(err);
			} else {
				JSON.parse(data).configService.filter(x => {
					if ( x.identifier !== identifier ) {
						obj.configService.push(x);
					}

				});
				const writeJson = JSON.stringify(obj); //convert it back to json
				fs.writeFile(this.configSrc, writeJson, 'utf8', (data) => {
					if ( data === null ) {
						connection.sendUTF(JSON.stringify(
							{
								type: 'deleteConfig',
								data: {
									success: true,
									config:  JSON.parse(writeJson)
								}
							}
						));
					}
				}); // write it back
			}
		});
	}
}

