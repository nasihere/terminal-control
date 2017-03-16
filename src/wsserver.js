// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app_command_1 = require("./lib/app-command");
var os = require("os");
var http = require("http");
var websocket = require("websocket");
var utils_1 = require("./utils");
var webSocketServer = websocket.server;
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';
var wsServerClass = (function (_super) {
    __extends(wsServerClass, _super);
    function wsServerClass() {
        var _this = _super.call(this) || this;
        _this.history = [];
        _this.clients = [];
        _this.httpserver = http.createServer(function (request, response) {
            // Not important for us. We're writing WebSocket server, not HTTP server
        });
        _this.wsServer = new webSocketServer({
            // WebSocket server is tied to a HTTP server. WebSocket request is just
            // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
            httpServer: _this.httpserver
        });
        _this.setWsServer = function () {
            var self = _this;
            _this.wsServer.on('request', function (request) {
                request.on('requestResolved', function (req) {
                    console.log((new Date()) + ' Connection from origin ' + req.origin + '.');
                });
                request.on('requestAccepted', function (conn) {
                    // accept connection - you should check 'request.origin' to make sure that
                    // client is connecting from your website
                    // (http://en.wikipedia.org/wiki/Same_origin_policy)
                    // we need to know client index to remove them on 'close' event
                    console.log((new Date()) + ' Connection accepted.');
                    var index = self.clients.push(conn) - 1;
                    var userName;
                    var userColor = self.colors[index];
                    // send back chat history
                    console.log(self.history, 'self.history');
                    if (self.history.length > 0) {
                        conn.sendUTF(JSON.stringify({ type: 'history', data: self.history }));
                    }
                    conn.on('message', function (message) {
                        var copyMsg = utils_1.stringifyHtml(message.utf8Data);
                        userName = copyMsg.split('*#*')[1] || os.hostname();
                        // console.log((new Date()) + ' Received Message from '
                        // + userName + ': ' + message.utf8Data);
                        self.execCmd(message.utf8Data, conn);
                        // we want to keep history of all sent messages
                        var obj = {
                            time: (new Date()).getTime(),
                            text: utils_1.stringifyHtml(message.utf8Data),
                            author: userName,
                            color: userColor
                        };
                        self.history.push(obj);
                        self.history = self.history.slice(-100);
                        // broadcast message to all connected clients
                        var json = JSON.stringify({ type: 'message', data: obj });
                        for (var i = 0; i < self.clients.length; i++) {
                            self.clients[i].sendUTF(json);
                        }
                    });
                    // user disconnected
                    conn.on('close', function (connection) {
                        if (userName && userColor) {
                            console.log((new Date()) + " Peer "
                                + connection.remoteAddress + " disconnected.");
                            // remove user from the list of connected clients
                            self.clients.splice(index, 1);
                            // push back user's color to be reused by another user
                            self.colors.push(userColor);
                        }
                    });
                });
                request.accept(null, request.origin);
            });
        };
        _this.execCmd = function (str, connection) {
            if (str.indexOf('readConfig://') !== -1) {
                _this.readConfig(connection);
            }
            else if (str.indexOf('deleteConfig://') !== -1) {
                var msg = str.substring(str.indexOf('://') + 3);
                _this.deleteConfig(msg, connection);
            }
            else if (str.indexOf('saveConfig://') !== -1) {
                var msg = str.substring(str.indexOf('://') + 3);
                _this.saveConfig(msg, connection);
            }
            else if (str.indexOf('pingport://') !== -1) {
                var msg = str.substring(str.indexOf('://') + 3);
                _this.pingPort(msg.split('*#*')[0], connection);
            }
            else {
                var msg = str.split('*#*');
                _this.appCmd(msg, connection);
            }
        };
        _this.setWsServer();
        return _this;
    }
    return wsServerClass;
}(app_command_1.appCommand));
exports.wsServerClass = wsServerClass;
exports.tempwsServer = new wsServerClass();
