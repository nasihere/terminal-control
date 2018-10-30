"use strict";
import * as http from 'http';
import { appCommand } from './lib/app-command';
import * as websocket from 'websocket';
import { IMessage } from "websocket";

let webSocketServer = websocket.server;


export class wsServerClass extends appCommand {

	httpserver = http.createServer(function (request, response) {});
	wsServer :websocket.server;
	constructor () {
		super();
		this.init()
	}
	init=()=>{
		let server:websocket.server=new webSocketServer({
			httpServer: this.httpserver
		});
		server.on('request',this.setRequestListeners);
		this.wsServer=server;
	};

	private setRequestListeners = (request:websocket.request) =>{
		request.on('requestResolved', ():void => console.log((new Date()) + ' Connection from origin ' + request.origin + '.'));
		
		request.on('requestAccepted',this.setConnectionListeners);
		request.accept(null, request.origin);
	}
	private setConnectionListeners=(connection:websocket.connection)=>{
		
		connection.on('message', (msg:IMessage) => {
			let message = msg.utf8Data && JSON.parse(msg.utf8Data);
			this.handleMessage(message, connection);
		});
	}

}
export const tempwsServer = new wsServerClass();
