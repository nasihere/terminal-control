import * as cp from 'child_process';
import { stringifyHtml, HMTimeNow } from '../../utils';

class GitRequest {
	spawnChild=(message,connection,cmd, args)=>{
		let child= cp.spawn(cmd,args,{
			shell:true,
			cwd:message.cmd.pwd
		});
		child.on('error',(err)=>{console.log(err)});
		child.on('close',(code, signal)=>{});
		child.stderr.on('data',(e)=>{console.log(e)});
		return child;
	}

	getIsWorkingTree=(message,connection)=>{
		if(!message.gitreq){connection.sendUTF(JSON.stringify({ type: 'error', data: 'gitreq is required to manage Git Requests' }));}
		else{
			let cmd = "git rev-parse";
			let args= ['--is-inside-work-tree'];
			let child=this.spawnChild(message,connection, cmd, args)
			child.stdout.on('data',(m)=>{
				connection.sendUTF(JSON.stringify({type:'git',payload:{[message.id]:{isWorkingTree:true}}}))
			});


		}
	}
}

export const Git=new GitRequest();