"use strict";
var sys = require('sys');
var exec = require('child_process').exec;
var child;
child = exec("pwd", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});
var sys = require('sys');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout); }
const appCmd = function (cmd) {
    exec(cmd, puts);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = appCmd;
//# sourceMappingURL=app-settings.js.map