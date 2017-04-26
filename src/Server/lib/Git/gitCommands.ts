import * as cp from 'child_process';
import { stringifyHtml, HMTimeNow } from '../../Utils';

class GitRequest {
	message;
	connection;
	spawnChild = ( cmd, args) => {
		let child = cp.spawn(cmd, args, {
			shell: true,
			cwd:   this.message.cmd.pwd
		});
		child.on('error', (err) => {
			console.log(err);
		});
		child.on('close', (code, signal) => {
		});
		child.stderr.on('data', (e) => {
			console.log(e);
		});
		return child;
	};
	handler=(message,connection)=>{
		this.message=message;
		this.connection=connection;
		if ( !message.gitreq ) {
			connection.sendUTF(JSON.stringify({type: 'error', data: 'gitreq is required to manage Git Requests'}));
		}
		else{
			switch(this.message.gitreq){
				case 'getIsWorkingTree':
					this.getIsWorkingTree();
					break;
				case 'getBranches':
					this.getBranches();
					break;
			}
		}
	}
	getIsWorkingTree = () => {
		if ( !this.message.gitreq ) {
			this.connection.sendUTF(JSON.stringify({type: 'error', data: 'gitreq is required to manage Git Requests'}));
		}
		else {
			let cmd = 'git rev-parse';
			let args = [ '--is-inside-work-tree' ];
			let child = this.spawnChild(cmd, args);
			child.stdout.on('data', (m) => {
				this.connection.sendUTF(JSON.stringify({type: 'git', payload: {[this.message.id]: {isWorkingTree: true}}}));
			});

		}
	};
	getBranches = () => {
		let cmd = 'git branch';
		let args = [ '--color' ];
		let child = this.spawnChild(cmd, args);
		child.stdout.on('data', (m) => {
			this.connection.sendUTF(JSON.stringify({type: 'git', payload: {[this.message.id]: {branches: m.toString()}}}))
		});
	};
}

export const Git = new GitRequest();