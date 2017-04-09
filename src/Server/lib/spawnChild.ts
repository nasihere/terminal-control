import * as cp from 'child_process';
import { stringifyHtml, HMTimeNow } from '../utils';
import { splitVars } from "../utils/splitVars";

export interface IUsage extends NodeJS.MemoryUsage{
	timeRunning?:number;
}
function spawnChild(){

	let userColor=process.argv[2];
	let message=JSON.parse(process.argv[3]);
	let env = Object.create( process.env );
	let envVars=splitVars(message.cmd.env);

	let child = cp.spawn(message.cmd.cmd,[],{
		shell:true,
		env:Object.assign(env, envVars),
		cwd:message.cmd.pwd
	});
	let timeUp=0;
	setInterval(()=>{++timeUp},1000)
	process.on('message',(msg)=>{
		switch(msg){
			case "get_usage":
				let usage:IUsage=process.memoryUsage();
				usage.timeRunning=timeUp;
				process.send({type:'memory_usage',payload:usage});
				break;
			default:
				return;
		}
	})
	child.stdout.on('data', (data) => {
		// console.log('stdout: ' + data);
		let obj = {
			time:   HMTimeNow(),
			text:   stringifyHtml(data),
			author: message.name,
			color:  userColor,
			pid: child.pid

		};
		process.send({type:'data',payload:obj})
		//self.writeToHistory(obj, connection);
		//connection.sendUTF(JSON.stringify({type: 'message', data: obj}));
	});
	child.stderr.on('data', (data)=> {
		// console.log('stderr: ' + data);
		let obj = {
			time:   HMTimeNow(),
			text:   stringifyHtml(data),
			author: message.name,
			color:  userColor,
			pid: child.pid

		};
		process.send({type:'data',payload:obj})
		//self.writeToHistory(obj, connection);
	});
	child.on('close', (code, signal) => {
		// console.log(`stdclose: ${signal} -> ${code}`);

		let obj = {
			time:   HMTimeNow(),
			text:   stringifyHtml(`Child closed ${signal} -> code:${code}`),
			author: message.name,
			color:  userColor,
			pid: child.pid

		};
		process.send({type:'close',payload:obj})
		//self.writeToHistory(obj, connection);
	});
}

spawnChild()

