// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";
import {appCmd, pingPort, saveConfig, readConfig } from './lib/app-command';
import * as os from 'os';
import * as http from 'http';
import * as websocket from 'websocket';
let webSocketServer = websocket.server;
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';

// Port where we'll run the websocket server
let webSocketsServerPort = 1337;


/**
 * Global variables
 */
// latest 100 messages
let history = [ ];
// list of currently connected clients (users)
let clients = [ ];

/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function execCmd(str, connection) {
    if (str.indexOf('readConfig://') !== -1 ) {
        readConfig(connection);
    }
    else if (str.indexOf('saveConfig://') !== -1 ) {
        const msg = str.substring(str.indexOf('://')+3);
        saveConfig(msg, connection);
    }
    else if (str.indexOf('pingport://') !== -1) {
        const msg = str.substring(str.indexOf('://')+3);
        pingPort(msg.split('*#*')[0], connection);
    }
    else {
        appCmd(str.split('*#*')[0], connection);
    }
    
}
// Array with some colors
var colors = [ 'red', 'green', 'white', 'magenta', 'purple', 'plum', 'orange' ];
// ... in random order
colors.sort(function(a,b){ return Math.random() + 0.5; } );

/**
 * HTTP server
 */
export const server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
});


/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    // accept connection - you should check 'request.origin' to make sure that
    // client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(null, request.origin); 
    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;
    var userName = os.hostname();
    var userColor = "red"; //temp

    console.log((new Date()) + ' Connection accepted.');

    // send back chat history
    if (history.length > 0) {
        connection.sendUTF(JSON.stringify( { type: 'history', data: history} ));
    }

    // user sent some message
    connection.on('message', function(message) {

                var copyMsg = htmlEntities(message.utf8Data);
                userName = copyMsg.split('*#*')[1] || os.hostname();
                
                // console.log((new Date()) + ' Received Message from '
                            // + userName + ': ' + message.utf8Data);

                execCmd(message.utf8Data, connection);
                // we want to keep history of all sent messages
                var obj = {
                    time: (new Date()).getTime(),
                    text: htmlEntities(message.utf8Data),
                    author: userName,
                    color: userColor
                };
                history.push(obj);
                history = history.slice(-100);

                // broadcast message to all connected clients
                var json = JSON.stringify({ type:'message', data: obj });
                for (var i=0; i < clients.length; i++) {
                    clients[i].sendUTF(json);
                }
          
    });
    // user disconnected
    connection.on('close', function(connection) {
        if (userName && userColor ) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            // remove user from the list of connected clients
            clients.splice(index, 1);
            // push back user's color to be reused by another user
            colors.push(userColor);
        }
    });

});