import * as cp from 'child_process';
import { stringifyHtml, HMTimeNow } from '../utils';

export interface IUsage extends NodeJS.MemoryUsage{
	timeRunning?:number;
}
function spawnChild(){
	let oscmd=process.argv[2];
	let userColor=process.argv[3];
	let msg=process.argv[4];
	let message=JSON.parse(process.argv[5]);
	let child = cp.spawn(oscmd,[],{shell:true});
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
		console.log('stdout: ' + data);
		let obj = {
			time:   HMTimeNow(),
			text:   stringifyHtml(data),
			author: msg,
			color:  userColor,
			pid: child.pid

		};
		process.send({type:'data',payload:obj})
		//self.writeToHistory(obj, connection);
		//connection.sendUTF(JSON.stringify({type: 'message', data: obj}));
	});
	child.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
		let obj = {
			time:   HMTimeNow(),
			text:   stringifyHtml(data),
			author: msg,
			color:  userColor,
			pid: child.pid

		};
		process.send({type:'data',payload:obj})
		//self.writeToHistory(obj, connection);
	});
	child.on('close', function (code) {
		console.log('stdclose: ' + code);

		let obj = {
			time:   HMTimeNow(),
			text:   stringifyHtml(code),
			author: msg,
			color:  userColor,
			pid: child.pid

		};
		process.send({type:'close',payload:obj})
		//self.writeToHistory(obj, connection);
	});
}

spawnChild()

