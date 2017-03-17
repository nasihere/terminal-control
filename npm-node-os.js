let npm = require("child_process"),
    os = require("os"),
    platform = os.platform(),
    flags = {};

let winCmds = {
    copy: "robocopy src\\htmlv2 build\\htmlv2 /e",
    clean:"rmdir build /s/q"
};
let linCmds = {
    copy:"cp -R ./src/htmlv2 ./build/htmlv2;",
    clean:"rm -rf ./build; tsc; "
};

let cmds = platform === "win32" ? winCmds : linCmds;

process.argv.forEach(function(val, index, array){
    if(cmds.hasOwnProperty(val)) {
        npm.exec(cmds[val])
    }
})
