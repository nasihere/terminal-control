// http://nodejs.org/api.html#_child_processes
import * as fs from 'fs';
import * as os from "os";
import * as path from 'path';
import * as childprocess from 'child_process';
import * as rc from "rc";
import { stringifyHtml } from '../utils';
import * as psTree from 'ps-tree';
import { configHandler } from './configHandler';
import * as websocket from '@types/websocket';
import { ServerConfig } from "./serverConfig";
import {Git} from './Git'
import { stat } from "fs";

declare module "child_process"{
	interface ChildProcess{
		spawnargs:Array<any>
	}
}
let platform = os.platform();
let exec     = childprocess.exec,
	userName = os.hostname(),
	spawn    = childprocess.spawn,
	fork     = childprocess.fork;


export class appCommand extends ServerConfig {
	colors: Array<string> = [ '#ffb2b2', 'DeepSkyBlue', 'gold', 'magenta', '#ADFF2F', 'plum', 'orange', 'aqua', 'BlanchedAlmond', '#00BFFF' ].sort();
	history = [];
	clients: Array<websocket.connection> = [];
	skipLog = [ 'getConfigFile', 'deleteService', 'saveConfig', 'pingService' ];
	configHandler: configHandler;

	constructor () {
		super();
		this.configHandler = new configHandler(this.config);
	}
	public writeToHistory = (log, conn) => {
		if ( this.skipLog.indexOf(log.text) === -1 ) {
			this.history.push(log);
			this.history = this.history.slice	(-100);
			this.broadCastMsg(log, conn);
		}

	};
	private broadCastMsg = (obj, conn) => {

		// broadcast message to all connected clients
		let json = JSON.stringify({type: 'message', data: obj});
		for ( let i = 0; i < this.clients.length; i++ ) {
			this.clients[ i ].sendUTF(json);
		}

	};
	pingPort = (message, connection) => {
		let child = exec('lsof -t -i :' + message.port, this.puts);
		child.stdout.on('data', function (data) {
			// console.log('stdout: ' + data);
			var obj = {
				port: message.port,
				id:   message.id,
				pid:  child.pid,
				ping: true
			}
			connection.sendUTF(JSON.stringify({type: 'ping', data: obj}));

		});
		child.on('error', (e) => {
			console.error(e)
		});
		child.stderr.on('close', function (data) {
			// console.log('close: ' + data);
		});
	};
	readme = (message, connection) => {
		fs.readFile(message.readmePath, 'utf8', function (err,data) {
			if (err) {
				return console.log(err);
			}
			connection.sendUTF(JSON.stringify({type: 'readme', data: data}));
		});

	};
	puts = (error, stdout, stderr): void => {
		//TODO: Handle Errors More Elegantly
		if ( error ) {
			console.error("exec closed with error:",error)
		}
		else {
			console.info("exec closed without error")
		}
		//console.log('puts', stdout, stderr, error);
	};
	send = (message, connection) => {
		let sendObj = {
			type: '',
			data: {
				port: message.port,
				id:   message.id
			}
		}
		return (type: string, obj: any) => {
			sendObj.type = type;
			sendObj.data = Object.assign({}, sendObj.data, obj);
			connection.sendUTF(JSON.stringify(sendObj))
			for ( let i = 0; i < this.clients.length; i++ ) {
				this.clients[ i ].sendUTF(JSON.stringify(sendObj));
			}
		}

	}
	serviceAction = (message, connection) => {
		let send = this.send(message, connection)
		let self = this;
		let userColor = this.colors.shift();
		//const msg = message.cmd.split('*#*');
		//let oscmd = platform === "win32" ? msg[ 0 ].replace(/;/g, "&") : msg[ 0 ];
		let forkedProcess = fork(path.resolve(__dirname,"spawnChild"), [ userColor, JSON.stringify(message) ]);

		let statusObj = {
			connected: true,
			pid:       forkedProcess.pid,
			id: 		message.id

		};
		this.configHandler.extraConfig(statusObj);
		send('status', statusObj);
		forkedProcess.on('disconnect', () => {
			console.info(`DISCONNECT : ChildProcess, PID=${forkedProcess.pid}, SPAWNARGS=${JSON.stringify(forkedProcess.spawnargs)}`)
		});
		forkedProcess.on('error', (err) => {
			console.error(2, err)
		});
		forkedProcess.on('edit', (_) => {
			console.info(3, _)
		});
		forkedProcess.on('message', (msg) => {
			//msg.payload.pid=forkedProcess.pid;
			msg.payload.id = message.id;
			switch ( msg.type ) {
				case 'data':
					self.writeToHistory(msg.payload, connection);
					break;
				case 'close':
					forkedProcess.kill()
					break;
				case 'memory_usage':
					send('memory_usage', msg.payload);
					break;
			}
		});
		forkedProcess.on('close', (data) => {
			clearInterval(memInterval)
			let obj = {
				connected:   false,
				pid:         null,
				status_code: data,
				id:message.id
			};
			send('status', obj)
			this.configHandler.extraConfig(obj);
		});
		let memInterval = setInterval(() => {
			forkedProcess.send("get_usage")
		}, 2000)


	};
	handleMessage = (message: IMessageIn, connection): void => {
		switch ( message.req ) {
			case "getConfigFile":
				this.configHandler.readConfig(connection);
				break;
			case "deleteService":
				this.configHandler.deleteConfig(message, connection);
				break;
			case "editService":
				this.configHandler.editConfig(message, connection);
				break;
			case "saveConfig":
				this.configHandler.saveConfig(message, connection);
				break;
			case "pingService":
				this.pingPort(message, connection);
				break;
			case "readme":
				this.readme(message, connection);
				break;
			case "killService":
				//Stop the service
				psTree(message.pid, (err, children) => {
						childprocess
							.spawn('kill', [ '-9' ]
								.concat(
									children.map(p => p.PID)
								)
							);
					}
				);
				break;
			case "startService":
				this.serviceAction(message, connection);
				break;
			case "git":
				Git.handler(message, connection);
				break;
		}
	}
}

export type requestTypes =
	'getConfigFile'
	| 'deleteService'
	| 'saveConfig'
	| 'pingService'
	| 'killService'
	| 'startService'
	| 'editService'
	| 'readme'
	| 'git'
export type GitRequestTypes=
	'IsWorkingTree' |
	'getBranches'
export interface IMessageIn {
	cmd: string;
	req: requestTypes
	id: string;
	pid?: number
	gitreq: GitRequestTypes
}

