import * as cp from 'child_process';
import { stringifyHtml, HMTimeNow } from '../utils';
import { splitVars } from "../Utils/splitVars";

export interface IUsage extends NodeJS.MemoryUsage{
	timeRunning?:number;
}
function spawnChild(){
	console.log('spawnChild',process)
	let userColor=process.argv[2],
		message=JSON.parse(process.argv[3]),
		env = Object.create( process.env ),
		envVars=splitVars(message.cmd.env),
		timeUp=0,
		child = cp.spawn(message.cmd.cmd,[],{
			shell:true,
			env:Object.assign(env, envVars),
			cwd:message.cmd.pwd
		});

	setInterval(()=>{++timeUp},1000);
	let returnObj=(text)=>{
		return {
			time:   HMTimeNow(),
			text:   text,
			author: message.name,
			color:  userColor,
			pid: child.pid

		};
	}
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
		let obj = returnObj(stringifyHtml(data))

		process.send({type:'data',payload:obj})
	});
	child.stderr.on('data', (data)=> {
		let obj = returnObj( stringifyHtml(data))
		process.send({type:'data',payload:obj})
	});
	child.on('close', (code, signal) => {
		let obj = returnObj(stringifyHtml(`Child closed ${signal} -> code:${code}`))
		process.send({type:'close',payload:obj})

	});
}

spawnChild()

