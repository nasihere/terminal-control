// http://nodejs.org/api.html#_child_processes
import * as fs from 'fs';
import * as websocket from '@types/websocket';
import * as path from 'path';
import * as childprocess from 'child_process';

import * as psTree from 'ps-tree';
import { configHandler } from './configHandler';

import { ServerConfig } from "./serverConfig";
import {Git} from './Git';
import {createFork} from './Process/createFork'

let exec     = childprocess.exec,
	fork     = childprocess.fork;

declare module "child_process"{
	interface ChildProcess{
		spawnargs:Array<any>
	}
}




export class appCommand extends ServerConfig {
	colors: Array<string> = [ '#ffb2b2', 'DeepSkyBlue', 'gold', 'magenta', '#ADFF2F', 'plum', 'orange', 'aqua', 'BlanchedAlmond', '#00BFFF' ].sort();
	history = [];
	clients: Array<websocket.connection> = [];
	skipLog = [ 'getConfigFile', 'deleteService', 'saveConfig' ];
	configHandler: configHandler;

	constructor () {
		super();
		this.configHandler = new configHandler(this.config);
	}
	public writeToHistory = (log) => {

			if ( this.skipLog.indexOf(log.text) === -1 ) {
				this.history.push(log);
				this.history = this.history.slice(-100);
				return log;
			}
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

	broadcastMsg = (message, connection) => {


		return (type: string, obj: any) => {
			let sendObj = {
				type: '',
				data: {
					port: message.port,
					id:   message.id
				}
			};
			sendObj.type = type;
			sendObj.data = Object.assign({}, sendObj.data,  obj);

			for ( let i = 0; i < this.clients.length; i++ ) {
				this.clients[ i ].sendUTF(JSON.stringify(sendObj));
			}
			return sendObj;
		}

	}
	serviceAction = (message, connection) => {
		let Broadcast = this.broadcastMsg(message, connection);
		let self = this;
		let userColor = this.colors.shift();
		//const msg = message.cmd.split('*#*');
		//let oscmd = platform === "win32" ? msg[ 0 ].replace(/;/g, "&") : msg[ 0 ];
		let f=createFork(
			__dirname,
			[ userColor, JSON.stringify(message) ],
			Broadcast,
			self.configHandler, message);

				f.on('message',(msg)=>{
					//neseccary for log history
					msg.payload.id = message.id;
					switch ( msg.type ) {
						case 'data':
							let log=self.writeToHistory(msg.payload);
							log ? Broadcast('message', log):null;
							break;
						case 'close':
							f.kill();
							break;
						case 'memory_usage':
							Broadcast('memory_usage', msg.payload);
							break;
					}
				});

				f.emit('startUsage');
				f.emit('connected',self.configHandler)


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

