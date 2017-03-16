// http://nodejs.org/api.html#_child_processes
import * as fs from 'fs';
import * as os from "os";
import * as childprocess from 'child_process';
import * as rc from "rc";
import { stringifyHtml } from '../utils';
let platform=os.platform();



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
	colors: Array<string> = [ '#ffb2b2', 'DeepSkyBlue', 'gold', 'magenta', '#ADFF2F', 'plum', 'orange','aqua','BlanchedAlmond','#00BFFF' ].sort();
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
	appCmd = (cmd, connection, logCallback) => {
		let self = this;
		let userColor = this.colors.shift();
		let oscmd= platform === "win32"? cmd[0].replace(/;/g," & ") : cmd[0]

		let child = exec(oscmd, this.puts);
		child.stdout.on('data',  (data) => {
			console.log('stdout: ' + data);
			let obj = {
				time:   (new Date()).getTime(),
				text:   stringifyHtml(data),
				author: cmd[1],
				color:  userColor
			};
			logCallback(obj);
			connection.sendUTF(JSON.stringify({type: 'message', data: obj}));
		});
		child.stderr.on('data', function (data) {
			console.log('stderr: ' + data);
			let obj = {
				time:   (new Date()).getTime(),
				text:   stringifyHtml(data),
				author: cmd[1],
				color:  userColor
			};
			logCallback(obj);
			connection.sendUTF(JSON.stringify({type: 'message', data: obj}));
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
				if ( pushJson.index === undefined ) {
					obj.configService.push(pushJson); //add some data
				}
				else {
					obj.configService = obj.configService.map((x,index) => {
						if ( index === pushJson.index ) {
							delete pushJson.index; 
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
	deleteConfig = (index, connection):void=> {
		if ( index === undefined ) {
			console.log(index , 'index')
			return;
		}
		index = parseInt(index); // convert to string to number;
		let obj = {
			configService: []
		};
		fs.readFile(this.configSrc, 'utf8', (err, data) => {
			if ( err ) {
				console.log(err);
			} else {
				let i = 0;
				JSON.parse(data).configService.filter(x => {
					if ( i !== index ) {
						obj.configService.push(x);
					}
					i++;
					
					
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

