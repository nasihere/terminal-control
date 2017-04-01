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
	spawn    = childprocess.spawn,
	fork    = childprocess.fork;

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

			this.appendLogs(log,conn);
			this.broadCastMsg(log);
		}

	};
	private appendLogs = (log,conn) => {
		this.configHandler.appendLog(log);
		this.configHandler.sendSuccess(conn,"UPDATE_TERMINAL",this.configHandler.getData())
	};
	private broadCastMsg = (obj) => {

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
			console.log( e)
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
	send = (message,connection) =>{
		let sendObj={
			type:'',
			data: {
				port: message.port,
				id:   message.id
			}
		}
		return (type:string,obj:any)=>{
			sendObj.type=type;
			sendObj.data=Object.assign({},sendObj.data,obj);
			connection.sendUTF(JSON.stringify(sendObj))
		}
	}
	serviceAction = (message, connection) => {
		let send=this.send(message,connection)
		let self = this;
		let userColor = this.colors.shift();
		const msg = message.cmd.split('*#*');
		let oscmd = platform === "win32" ? msg[ 0 ].replace(/;/g, "&") : msg[ 0 ];
		let forkedProcess = fork("./build/Server/lib/spawnChild",[oscmd, userColor, msg[1], JSON.stringify(message)]);

		let statusObj = {
			connected: true,
			pid:  forkedProcess.pid,

		};
		console.log(statusObj)
		send('status', statusObj);
		forkedProcess.on('disconnect',(a)=>{console.log(1,a)});
		forkedProcess.on('error',(a)=>{console.log(2,a)});
		forkedProcess.on('edit',(a)=>{console.log(3,a)});
		forkedProcess.on('message',(msg)=>{
			//msg.payload.pid=forkedProcess.pid;
			msg.payload.pid=forkedProcess.pid;
			switch(msg.type){
				case 'data':
					self.writeToHistory(msg.payload,connection);
					break;
				case 'close':
					forkedProcess.kill();
					self.writeToHistory(msg.payload,connection);
					break;
				case 'memory_usage':
					send('memory_usage',msg.payload);
					break;
			}
		});
		forkedProcess.on('close',(data)=>{
			clearInterval(memInterval)
			let obj = {
				connected:false,
				pid:  null,
				status_code:data
			};
			send('status',obj)
		});
		let memInterval=setInterval(()=>{
			forkedProcess.send("get_usage")
		},2000)



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
			console.log(message.pid)
			psTree(message.pid, function (err, children) {
				childprocess.spawn('kill', ['-9'].concat(children.map(function (p) { return p.PID })));
				//When this will be successfull then push msg to client service stopped.....
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

