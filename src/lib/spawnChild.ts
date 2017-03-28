import * as cp from 'child_process';
import { stringifyHtml, parseArgv } from '../utils';
function spawnChild(){
	let oscmd=process.argv[2];
	let userColor=process.argv[3];
	let msg=process.argv[4];
	let message=JSON.parse(process.argv[5]);
	let child = cp.spawn(oscmd,[],{shell:true});
	process.on('message',(msg)=>{
		switch(msg){
			case "get_usage":
				process.send({type:'memory_usage',payload:process.memoryUsage()});
				break;
			default:
				return;
		}
	})
	child.stdout.on('data', (data) => {
		console.log('stdout: ' + data);
		let obj = {
			time:   (new Date()).getTime(),
			text:   stringifyHtml(data),
			author: msg,
			color:  userColor,

		};
		process.send({type:'data',payload:obj})
		//self.writeToHistory(obj, connection);
		//connection.sendUTF(JSON.stringify({type: 'message', data: obj}));
	});
	child.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
		let obj = {
			time:   (new Date()).getTime(),
			text:   stringifyHtml(data),
			author: msg,
			color:  userColor,

		};
		process.send({type:'data',payload:obj})
		//self.writeToHistory(obj, connection);
	});
	child.on('close', function (code) {
		console.log('stdclose: ' + code);
		let obj = {
			time:   (new Date()).getTime(),
			text:   stringifyHtml(code),
			author: msg,
			color:  userColor,

		};
		process.send({type:'data',payload:obj})
		//self.writeToHistory(obj, connection);
	});
}

spawnChild()

