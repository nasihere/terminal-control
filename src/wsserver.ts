// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";
import { appCommand } from './lib/app-command';
import * as os from 'os';
import * as http from 'http';
import * as websocket from 'websocket';
import { stringifyHtml } from './utils';
let webSocketServer = websocket.server;
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';

const skipLog = ['readConfig://', 'deleteConfig://', 'saveConfig://', 'pingport://'];
export class wsServerClass extends appCommand {
	history = [];
	clients = [];
	httpserver = http.createServer(function (request, response) {
		// Not important for us. We're writing WebSocket server, not HTTP server
	});
	wsServer = new webSocketServer({
		// WebSocket server is tied to a HTTP server. WebSocket request is just
		// an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
		httpServer: this.httpserver
	});
	public historyWrite = (log,conn) => {
		if (skipLog.indexOf(log.text) === -1) {
			this.history.push(log);
			this.history = this.history.slice(-100);
			this.broadCastMsg(log,conn);
		}
		
	};
	private broadCastMsg = (obj,conn) => {
			
		// broadcast message to all connected clients
		let json = JSON.stringify({type: 'message', data: obj});
		for ( let i = 0; i < this.clients.length; i++ ) {
			this.clients[ i ].sendUTF(json);
		}	

	};
	private setWsServer = () => {
		let self = this;
		const historyCallback = this.historyWrite;
		this.wsServer.on('request', function (request) {
			request.on('requestResolved', (req) => {
				console.log((new Date()) + ' Connection from origin ' + req.origin + '.');
			});
			request.on('requestAccepted', (conn) => {
				// accept connection - you should check 'request.origin' to make sure that
				// client is connecting from your website
				// (http://en.wikipedia.org/wiki/Same_origin_policy)
				// we need to know client index to remove them on 'close' event
				let index = self.clients.length;
				console.log((new Date()) + ' Connection accepted.',index);
				let userName = 'NODEUSER'+index;
				let userColor = self.colors[ index ];
				// send back logs history
				if ( self.history.length > 0 ) {
					conn.sendUTF(JSON.stringify({type: 'history', data: self.history}))
				}
				conn.on('message', (message) => {
					let copyMsg = stringifyHtml(message.utf8Data);
					const appName = copyMsg.split('*#*')[ 1 ] || os.hostname();
				
					self.execCmd(message.utf8Data, conn, historyCallback);
					// we want to keep history of all sent messages
					let obj = {
						time:   (new Date()).getTime(),
						text:   stringifyHtml(message.utf8Data),
						author: appName,
						color:  userColor
					};
				})
				// user disconnected
				conn.on('close', (connection) => {
					if ( userName && userColor ) {	
						
						// remove user from the list of connected clients
						self.clients.splice(index, 1);
					}
				});

			});
			const connection = request.accept(null,request.origin)
			self.clients.push(connection);
		});
	};

	constructor () {
		super();
		this.setWsServer()
	}

	execCmd = (str:string, connection, logCallback):void => {
		if ( str.indexOf('readConfig://') !== -1 ) {
			this.readConfig(connection);
		}
		else if ( str.indexOf('deleteConfig://') !== -1 ) {
			const msg = str.substring(str.indexOf('://') + 3);
			this.deleteConfig(msg, connection);
		}
		else if ( str.indexOf('saveConfig://') !== -1 ) {
			const msg = str.substring(str.indexOf('://') + 3);
			this.saveConfig(msg, connection);
		}
		else if ( str.indexOf('pingport://') !== -1 ) {
			const msg = str.substring(str.indexOf('://') + 3);
			this.pingPort(msg.split('*#*')[ 0 ], connection);
		}
		else {
			const msg = str.split('*#*');
		    this.appCmd(msg, connection, logCallback);

		}
	}

}
export const tempwsServer = new wsServerClass();
