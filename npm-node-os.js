let npm = require("child_process"),
    os = require("os"),
    platform = os.platform(),
    flags = {};

let winCmds = {
    //copy: "robocopy src\\htmlv2 build\\htmlv2 /e",
    build: "robocopy src/assets build/ /e && copy package.json build && copy npm-node-os.js build",
    postinstall: "robocopy src/assets/electron node_modules/ /e && robocopy src/assets/electron/electron node_modules/.bin /e",
    clean:"rmdir build /s/q"
};
let linCmds = {
    build: "cp -r src/assets build/ && cp package.json build && cp npm-node-os.js build",
    postinstall: "cp -r src/assets/electron node_modules/ && cp src/assets/electron/electron node_modules/.bin",
    clean:"rm -rf ./build; "
};

let cmds = platform === "win32" ? winCmds : linCmds;

process.argv.forEach(function(val, index, array){
    if(cmds.hasOwnProperty(val)) {
        npm.exec(cmds[val])
    }
})
