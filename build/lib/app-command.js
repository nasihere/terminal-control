"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const childprocess = require("child_process");
let exec = childprocess.exec, userName = os.hostname();
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function puts(error, stdout, stderr) {
}
var colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];
colors.sort();
exports.appCmd = function (cmd, connection) {
    let userColor = colors.shift();
    let child = exec(cmd, puts);
    child.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
        let obj = {
            time: (new Date()).getTime(),
            text: htmlEntities(data),
            author: userName,
            color: userColor
        };
        connection.sendUTF(JSON.stringify({ type: 'message', data: obj }));
    });
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
};
exports.pingPort = function (nodeport, connection) {
    let child = exec('lsof -t -i :' + nodeport, puts);
    child.stdout.on('data', function (data) {
        var obj = {
            port: nodeport,
            ping: true
        };
        connection.sendUTF(JSON.stringify({ type: 'ping', data: obj }));
    });
    child.stderr.on('close', function (data) {
    });
};
//# sourceMappingURL=app-command.js.map