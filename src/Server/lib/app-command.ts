
import * as websocket from 'websocket';
import * as childprocess from 'child_process';


import { ServerConfig } from "./serverConfig";

let exec     = childprocess.exec,
	fork     = childprocess.fork;

declare module "child_process"{
	interface ChildProcess{
		spawnargs:Array<any>
	}
}




export class appCommand extends ServerConfig {
	
	constructor () {
		super();
	}
	
	handleMessage = (payload: any, connection): void => {
		console.log(new Date().toJSON(), payload)
		switch ( payload.message ) {
			case "MESSAGING.SHELL.LAUNCH.APP":
			exec(payload.shellCommand, (err, stdout, stderr) => {
				if (err) {
					console.error(`exec error: ${err}`);
					return;
				}
				console.log(stdout);
				connection.sendUTF(JSON.stringify({type: 'exec', response: stdout}));
			});
			break;
			default:
				console.log(new Date().toJSON(), "Message not being matched.", payload)
				
		}
	}
}
