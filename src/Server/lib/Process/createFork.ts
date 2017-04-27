import * as childprocess from 'child_process';
import * as path from "path";
let exec     = childprocess.exec,
	fork     = childprocess.fork;

export function createFork (refpath,args,Broadcast,configHandler, message){
	let _p = fork(path.resolve(refpath,"spawnChild"), args),
		memInterval;
	_p.on('disconnect', () => {
		console.info(`DISCONNECT : ChildProcess, PID=${_p.pid}, SPAWNARGS=${JSON.stringify(_p.spawnargs)}`)
	})
	.on('error', (err) => {
		console.error('Error on fork:', err)
	})
	.on('edit', (_) => {
		console.info('Edit on fork:',_)
	})
	.on('startUsage',()=>{
		memInterval=setInterval(() => {
			_p.send("get_usage")
		}, 2000)
	})
	.on('stopUsage',()=>{
		clearInterval(memInterval)
	})
	.on('close', (data,signal) => {
		_p.emit('stopUsage');
			let obj = {
				connected:   false,
				pid:         null,
				status_code: data,
				signal: signal,
				id: message.id
			};

			configHandler.extraConfig(obj);
			Broadcast('status', obj);

	}).on('connected',(configHandler)=>{
		let statusObj = {
			connected: true,
			pid:       _p.pid,
			id: message.id

		};
		configHandler.extraConfig(statusObj);
		Broadcast('status',statusObj)
	});



	return _p
}