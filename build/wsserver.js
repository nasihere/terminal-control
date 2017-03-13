"use strict";
const app_command_1 = require("./lib/app-command");
const os = require("os");
const http = require("http");
const websocket = require("websocket");
let webSocketServer = websocket.server;
process.title = 'node-chat';
let webSocketsServerPort = 1337;
let history = [];
let clients = [];
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function execCmd(str, connection) {
    if (str.indexOf('readConfig://') !== -1) {
        app_command_1.readConfig(connection);
    }
    else if (str.indexOf('saveConfig://') !== -1) {
        const msg = str.substring(str.indexOf('://') + 3);
        app_command_1.saveConfig(msg, connection);
    }
    else if (str.indexOf('pingport://') !== -1) {
        const msg = str.substring(str.indexOf('://') + 3);
        app_command_1.pingPort(msg.split('*#*')[0], connection);
    }
    else {
        app_command_1.appCmd(str.split('*#*')[0], connection);
    }
}
var colors = ['red', 'green', 'white', 'magenta', 'purple', 'plum', 'orange'];
colors.sort(function (a, b) { return Math.random() + 0.5; });
exports.server = http.createServer(function (request, response) {
});
var wsServer = new webSocketServer({
    httpServer: exports.server
});
wsServer.on('request', function (request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    var connection = request.accept(null, request.origin);
    var index = clients.push(connection) - 1;
    var userName = os.hostname();
    var userColor = "red";
    console.log((new Date()) + ' Connection accepted.');
    if (history.length > 0) {
        connection.sendUTF(JSON.stringify({ type: 'history', data: history }));
    }
    connection.on('message', function (message) {
        var copyMsg = htmlEntities(message.utf8Data);
        userName = copyMsg.split('*#*')[1] || os.hostname();
        execCmd(message.utf8Data, connection);
        var obj = {
            time: (new Date()).getTime(),
            text: htmlEntities(message.utf8Data),
            author: userName,
            color: userColor
        };
        history.push(obj);
        history = history.slice(-100);
        var json = JSON.stringify({ type: 'message', data: obj });
        for (var i = 0; i < clients.length; i++) {
            clients[i].sendUTF(json);
        }
    });
    connection.on('close', function (connection) {
        if (userName && userColor) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            clients.splice(index, 1);
            colors.push(userColor);
        }
    });
});
//# sourceMappingURL=wsserver.js.map