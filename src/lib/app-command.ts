// http://nodejs.org/api.html#_child_processes
import * as fs from 'fs';
import * as os from "os";
import * as childprocess from 'child_process';
import * as rc from "rc";
import { stringifyHtml, parseArgv } from '../utils';
import * as psTree from 'ps-tree';
import { configHandler } from './configHandler';
let platform = os.platform();
let exec     = childprocess.exec,
	userName = os.hostname(),
	spawn    = childprocess.spawn;

interface ChildProcess{
	emit():void
}

export class appCommand {
	colors: Array<string> = [ '#ffb2b2', 'DeepSkyBlue', 'gold', 'magenta', '#ADFF2F', 'plum', 'orange', 'aqua', 'BlanchedAlmond', '#00BFFF' ].sort();
	configSrc: string;
	history = [];
	clients = [];
	skipLog = [ 'readConfig://', 'deleteConfig://', 'saveConfig://', 'pingport://' ];
	configHandler: configHandler;

	constructor () {
		const {configPath} = parseArgv();
		let rcConfig = {
			configPath: configPath
		};
		const config = rc('dev-micro-dashboard', rcConfig);
		this.configSrc = config.configPath;
		this.configHandler = new configHandler(this.configSrc);
	}

	public writeToHistory = (log, conn) => {
		if ( this.skipLog.indexOf(log.text) === -1 ) {
			this.history.push(log);
			this.history = this.history.slice(-100);
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
			console.log(1, e)
		});
		child.stderr.on('close', function (data) {
			// console.log('close: ' + data);
		});
	};
	puts = (error, stdout, stderr): void => {
		//TODO: Handle Errors More Elegantly
		if ( error ) {
			console.log("exec closed with error")
		}
		else {
			console.log("exec closed without error")
		}
		console.log('puts', stdout, stderr, error);
	};
	serviceAction = (message, connection) => {
		let self = this;
		let userColor = this.colors.shift();
		const msg = message.cmd.split('*#*');
		let oscmd = platform === "win32" ? msg[ 0 ].replace(/;/g, "&") : msg[ 0 ];

		let child = spawn(oscmd,[], {shell:true});
		console.log('childpid',child.pid)
		child.on('close',(data)=>{console.log(123,data)
			let obj = {
				port: message.port,
				id:   message.id,
				pid:  child.pid,
				ping: false
			}
			//connection.sendUTF(JSON.stringify({type: 'ping', data: obj}));
		});
		console.log(child.ref());
		child.on('disconnect',()=>{console.log(2)})
		child.on('error',()=>{console.log(3)})
		child.on('edit',()=>{console.log(4)})
		child.on('message',(m)=>{console.log(m)})
		var obj = {
			port: message.port,
			id:   message.id,
			pid:  child.pid,
			ping: true
		}
		connection.sendUTF(JSON.stringify({type: 'ping', data: obj}));
		child.stdout.on('data', (data) => {
			console.log('stdout: ' + data);
			let obj = {
				time:   (new Date()).getTime(),
				text:   stringifyHtml(data),
				author: msg[ 1 ],
				color:  userColor,
				pid:    child.pid,
				id:     message.id
			};

			self.writeToHistory(obj, connection);
			//connection.sendUTF(JSON.stringify({type: 'message', data: obj}));
		});
		child.stderr.on('data', function (data) {
			console.log('stderr: ' + data);
			let obj = {
				time:   (new Date()).getTime(),
				text:   stringifyHtml(data),
				author: msg[ 1 ],
				color:  userColor,
				pid:    child.pid,
				id:     msg.id
			};
			self.writeToHistory(obj, connection);
			//connection.sendUTF(JSON.stringify({type: 'message', data: obj}));
		});
		child.on('close', function (code) {
			console.log('stdclose: ' + code);
			let obj = {
				time:   (new Date()).getTime(),
				text:   stringifyHtml(code),
				author: msg[ 1 ],
				color:  userColor,
				pid:    child.pid,
				id:     msg.id
			};
			self.writeToHistory(obj, connection);
		});
	};
	handleMessage = (message: IMessageIn, connection): void => {

		let copyMsg = stringifyHtml(message.cmd);
		const appName = copyMsg.split('*#*')[ 1 ] || os.hostname();
		if ( message.req === "getConfigFile" ) {
			this.configHandler.readConfig(connection);
		}
		else if ( message.req == 'deleteService' ) {
			this.configHandler.deleteConfig(message, connection);
		}
		else if ( message.req == 'editService' ) {
			this.configHandler.editConfig(message, connection);
		}
		else if ( message.req === 'saveConfig' ) {

			this.configHandler.saveConfig(message, connection);
		}
		else if ( message.req === 'pingService' ) {
			this.pingPort(message, connection);
		}
		else if ( message.req === 'killService' ) {
			//Stop the service
			psTree(message.pid, function (err, children) {console.log(children)
				childprocess.spawn('kill', ['-9'].concat(children.map(function (p) { return p.PID })));
			});

			//let port = message.cmd.replace('lsof -t -i tcp:', '').replace(' | xargs kill;', '');
			//const msg = platform === "win32" ? 'FOR /F "tokens=5 delims= " %%P IN (\'netstat -a -n -o ^| findstr :' + port + '.*LISTENING\') DO TaskKill.exe /PID %%P' : message;
			//console.log(msg)
			// /this.serviceAction(message, connection);
		}
		else if ( message.req === 'startService' as string ) {
			this.serviceAction(message, connection);
		}
		else {


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
export interface IMessageIn {
	cmd: string;
	req: requestTypes
	id: string;
	pid?:number
}

