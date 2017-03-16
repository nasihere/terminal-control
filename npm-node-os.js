let npm = require("child_process"),
    os = require("os"),
    platform = os.platform(),
    flags = {};

let winCmds = {
    prestart:"tsc & robocopy src\\htmlv2 build\\htmlv2 /e"
};
let linCmds = {
    prestart:"rm -rf ./build; tsc; cp -R ./src/htmlv2  ./build;"
};

let cmds = platform === "win32" ? winCmds : linCmds;

process.argv.forEach(function(val, index, array){
    if(cmds.hasOwnProperty(val)) {
        npm.exec(cmds[val])
    }
})
