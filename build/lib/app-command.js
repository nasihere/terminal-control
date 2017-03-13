"use strict";
const fs = require("fs");
const os = require("os");
const childprocess = require("child_process");
const configSrc = 'build/htmlv2/app/app-config.json';
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
exports.saveConfig = function (newConfig, connection) {
    let obj = {
        configService: []
    };
    fs.readFile(configSrc, 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            obj = JSON.parse(data);
            var pushJson = JSON.parse(newConfig);
            if (pushJson.identifier === undefined) {
                pushJson.identifier = new Date();
                obj.configService.push(pushJson);
            }
            else {
                obj.configService = obj.configService.map(x => {
                    if (x.identifier === pushJson.identifier) {
                        return pushJson;
                    }
                    else {
                        return x;
                    }
                });
            }
            const writeJson = JSON.stringify(obj);
            fs.writeFile(configSrc, writeJson, 'utf8', (data) => {
                if (data === null) {
                    connection.sendUTF(JSON.stringify({
                        type: 'saveConfig',
                        data: {
                            success: true,
                            config: JSON.parse(writeJson)
                        }
                    }));
                }
            });
        }
    });
};
exports.readConfig = function (connection) {
    fs.readFile(configSrc, 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            connection.sendUTF(JSON.stringify({
                type: 'readConfig',
                data: {
                    success: true,
                    config: JSON.parse(data)
                }
            }));
        }
    });
};
exports.deleteConfig = function (identifier, connection) {
    if (identifier === undefined) {
        return;
    }
    let obj = {
        configService: []
    };
    fs.readFile(configSrc, 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            JSON.parse(data).configService.filter(x => {
                if (x.identifier !== identifier) {
                    obj.configService.push(x);
                }
            });
            const writeJson = JSON.stringify(obj);
            fs.writeFile(configSrc, writeJson, 'utf8', (data) => {
                if (data === null) {
                    connection.sendUTF(JSON.stringify({
                        type: 'deleteConfig',
                        data: {
                            success: true,
                            config: JSON.parse(writeJson)
                        }
                    }));
                }
            });
        }
    });
};
//# sourceMappingURL=app-command.js.map