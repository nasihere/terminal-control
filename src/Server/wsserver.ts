// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";
import { appCommand } from './lib/app-command';
import * as os from 'os';
import * as http from 'http';
import * as websocket from 'websocket';
import { stringifyHtml } from './utils';
let platform = os.platform();
let webSocketServer = websocket.server;
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-service-agent';


export class wsServerClass extends appCommand {

	httpserver = http.createServer(function (request, response) {
		// Not important for us. We're writing WebSocket server, not HTTP server
	});
	wsServer = new webSocketServer({
		// WebSocket server is tied to a HTTP server. WebSocket request is just
		// an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
		httpServer: this.httpserver
	});
	constructor () {
		super();
		this.setWsServer()
	}
	private setWsServer = () => {
		let self = this;
		this.wsServer.on('request', function (request) {
			request.on('requestResolved', () => {
				console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
			});
			request.on('requestAccepted', (connection) => {
				let index = self.clients.length;
				console.log((new Date()) + ' Connection accepted.', index);
				let userName = 'NODEUSER' + index;
				let userColor = self.colors[ index ];
				// send back logs history
				if ( self.history.length > 0 ) {
					connection.sendUTF(
						JSON.stringify({
							type: 'history',
							data: self.history
						})
					)
				}
				connection.on('message', (msg) => {
					let message = JSON.parse(msg.utf8Data);
					self.handleMessage(message, connection);
				});
				// user disconnected
				connection.on('close', (connection) => {
					if ( userName && userColor ) {
						// remove user from the list of connected clients
						self.clients.splice(index, 1);
					}
				});

			});
			const connection = request.accept(null, request.origin);
			self.clients.push(connection);
		});
	};
}
export const tempwsServer = new wsServerClass();
