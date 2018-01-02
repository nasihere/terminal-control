// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";
import * as http from 'http';
import { appCommand } from './lib/app-command';
import * as websocket from 'websocket';
import { IMessage } from "websocket";

let webSocketServer = websocket.server;
// Optional. You will see this name in eg. 'ps' or 'top' command


export class wsServerClass extends appCommand {

	httpserver = http.createServer(function (request, response) {
		// Not important for us. We're writing WebSocket server, not HTTP server
	});
	wsServer :websocket.server;
	constructor () {
		super();
		this.init()
	}
	init=()=>{
		let server:websocket.server=new webSocketServer({
			// WebSocket server is tied to a HTTP server. WebSocket request is just
			// an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
			httpServer: this.httpserver
		});
		server.on('request',this.setRequestListeners);
		this.wsServer=server;
	};

	private setRequestListeners = (request:websocket.request) =>{
		request.on('requestResolved', ():void => {
			console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
		});
		request.on('requestRejected', ():void => {
			console.log((new Date()) + ' Rejected from origin ' + request.origin + '.');
		});
		request.on('requestAccepted',this.setConnectionListeners);
		request.accept(null, request.origin);
	}
	private setConnectionListeners=(connection:websocket.connection)=>{
		this.clients.push(connection);
		let index:number = this.clients.length;
		console.log((new Date()) + ' Connection accepted.', index);
		let userColor = this.colors[ index ];
		// send back logs history

		if ( this.history.length > 0 ) {
			for (let i=0; i<= this.history.length -1; i++ ) {
				connection.sendUTF(
					JSON.stringify({
						type: 'message',
						data: this.history[i]
					})
				)
			}
		}
		connection.on('message', (msg:IMessage) => {
			let message = JSON.parse(msg.utf8Data);
			this.handleMessage(message, connection);
		});
		// user disconnected
		connection.on('close', (code, desc) => {
			if ( userColor ) {
				// remove user from the list of connected clients
				this.clients.splice(index, 1);
			}
		});
	}

}
export const tempwsServer = new wsServerClass();
