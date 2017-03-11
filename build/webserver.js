"use strict";
var appCmd = require('./lib/app-command').default.appCmd;
var pingPort = require('./lib/app-command').default.pingPort;
process.title = 'node-chat';
var webSocketsServerPort = 1337;
var os = require('os');
var webSocketServer = require('websocket').server;
var http = require('http');
var history = [];
var clients = [];
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function execCmd(str, connection) {
    if (str.indexOf('pingport://') !== -1) {
        pingPort(str.substring(11).split('*#*')[0], connection);
    }
    else {
        appCmd(str.split('*#*')[0], connection);
    }
}
var colors = ['red', 'green', 'white', 'magenta', 'purple', 'plum', 'orange'];
colors.sort(function (a, b) { return Math.random() + 0.5; });
var server = http.createServer(function (request, response) {
});
server.listen(webSocketsServerPort, function () {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});
var wsServer = new webSocketServer({
    httpServer: server
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
        userName = copyMsg.split('*#*')[1];
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
//# sourceMappingURL=webserver.js.map