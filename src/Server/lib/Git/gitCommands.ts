import * as cp from 'child_process';
import { stringifyHtml, HMTimeNow } from '../../Utils';

class GitRequest {
	message;
	connection;
	spawnChild = (cmd, args) => {
		let child = cp.spawn(cmd, args, {
			shell: true,
			cwd:   this.message.cmd.pwd
		});
		child.on('error', (err) => {
			console.log(err);
		});
		child.on('close', (code, signal) => {
			//console.log(code,signal)
		});
		child.stderr.on('data', (e) => {
			console.log(e);
		});
		return child;
	};
	handler = (message, connection) => {
		this.message = message;
		this.connection = connection;
		if ( !message.gitreq ) {
			connection.sendUTF(JSON.stringify({type: 'error', data: 'gitreq is required to manage Git Requests'}));
		}
		else {
			let req = this.message.gitreq;
			req === 'getIsWorkingTree' ? this.getIsWorkingTree() :
				req === 'getBranches' ? this.getBranches() :
					req === 'getWorkingBranch' ? this.getWorkingBranch() :
						req === 'getRemoteBranches' ? this.getRemoteBranches() :
							req === 'getStatus' ? this.getStatus() :
								req === 'getPull' ? this.getPull() : null;

		}
	};
	getIsWorkingTree = () => {
		if ( !this.message.gitreq ) {
			this.connection.sendUTF(JSON.stringify({type: 'error', data: 'gitreq is required to manage Git Requests'}));
		}
		else {
			let cmd = 'git rev-parse';
			let args = [ '--is-inside-work-tree' ];
			let child = this.spawnChild(cmd, args);
			child.stdout.on('data', (m) => {
				this.connection.sendUTF(JSON.stringify({
					type:    'git',
					payload: {[this.message.id]: {isWorkingTree: true}}
				}));
			});

		}
	};
	getBranches = () => {
		let cmd = 'git branch';
		let args = [ '--color', '-v' ];
		let child = this.spawnChild(cmd, args);
		child.stdout.on('data', (m) => {
			let str = m.toString().replace(/\r?\n/g, '|').split('|');
			this.connection.sendUTF(JSON.stringify({type: 'git', payload: {[this.message.id]: {branches: str}}}));
		});
	};
	getWorkingBranch = () => {
		let cmd = 'git rev-parse ';
		let args = [ '--abbrev-ref HEAD' ];
		let child = this.spawnChild(cmd, args);
		child.stdout.on('data', (m) => {
			this.connection.sendUTF(JSON.stringify({
				type:    'git',
				payload: {[this.message.id]: {workingBranch: m.toString()}}
			}));
		});
	};
	getRemoteBranches = () => {
		let cmd = 'git branch';
		let args = [ '-r', '-v', '--color' ];
		let child = this.spawnChild(cmd, args);
		child.stdout.on('data', (m) => {
			let str = m.toString().replace(/\r?\n/g, '|').split('|');
			this.connection.sendUTF(JSON.stringify({type: 'git', payload: {[this.message.id]: {remoteBranches: str}}}));
		});
	};
	getStatus = () => {
		let cmd = 'git status';
		let args = ['--porcelain', '-s'];
		let child = this.spawnChild(cmd, args);
		child.stdout.on('data', (m) => {
			// TODO: if no data "clean directory", this line is never sent resulting in old data on the front end... fix
			let str = m.toString().replace(/\r?\n/g, '|').split('|');
			this.connection.sendUTF(JSON.stringify({type: 'git', payload: {[this.message.id]: {status: str}}}));
		});
	};
	getPull = () => {
		let cmd = 'git pull origin master';
		let args = [];
		let child = this.spawnChild(cmd, args);
		child.stdout.on('data', (m) => {

			let str = m.toString().replace(/\r?\n/g, '|').split('|');
			this.connection.sendUTF(JSON.stringify({type: 'git', payload: {[this.message.id]: {status: str}}}));
		});
	};
}

export const Git = new GitRequest();