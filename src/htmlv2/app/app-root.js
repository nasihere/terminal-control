var NODECONFIG = [];
var portTimer = [];
var vm = new Vue({
  el: '#app',
  data: {
    message: 'Welcome to NodePorts Monitors',
    settings: NODECONFIG,
    logs: [],
    printLogs: [],
    currentItem: null,
    editConfig: function(item){
        this.currentItem = item;
    },
    searchLogs: function(search){
        const msg = search.toLowerCase();
        this.printLogs = this.logs.filter(x => {
            return (x.message.toLowerCase().indexOf(msg) !== -1 ||
                    x.author.toLowerCase().indexOf(msg) !== -1 ||
                    x.dt.toLowerCase().indexOf(msg) !== -1 ||
                    msg === '')
        })
    },
    newConfig: function(){
          this.currentItem = {
              "name":"",
              "Port": "",
              "env":"",
              "command":"",
              "cd":"",
              "stop":"lsof -t -i tcp:#PORT# | xargs kill;"
          };
    },
    startService: function(config){
        var msg = config.command;
        var pwd = 'cd ' + config.cd.replace('package.json','') + ";" ;
        var env = config.env;
        if (!msg) {
            return;
        }
        // send the message as an ordinary text
        connection.send(pwd + env + msg + "*#*" + config.name);
        checkPortSignal(config, 'start');
    },
    startall: function(){
        $(".fa-play-circle").each(function(i, ele) {
            //this.settings.filter(x => this.startService(x));
            $(ele).click();
        });
    },
    setService: function(config){
        this.settings = config;
    },
    turnService: function(config){
        if ( $("[port="+config.Port+"]").hasClass('fa-play-circle') === true || 
             $("[port="+config.Port+"]").hasClass('fa-pause-circle') === true) {
            this.startService(config);
        }
        else {
            this.stopService(config);
        }
    },
    stopService: function(config){
        var msg = config.stop.replace('#PORT#',config.Port);
        connection.send(msg + "*#*" + config.name);
        checkPortSignal(config, 'stop');
    },
    saveConfig: function(config) {
        if (config.name === '' || config.Port === '' ) {
            this.currentItem = null;
            return;
        };
        connection.send('saveConfig://'+JSON.stringify(config));
        this.currentItem = null;
    },
    readConfig: function() {
        connection.send('readConfig://');

    },
    deleteConfig: function(config) {
        if (config.name === '' || config.Port === '' ) {
            this.currentItem = null;
            return;
        };
        var r = confirm("Do you want to remove "+config.name+" service?");
        if (r == true) {
            connection.send('deleteConfig://'+config.identifier);
            location.reload();
        }
    },
    appendLog: function(log) {
        var tmp = this.logs;
        var tmpNew = [log];
        this.logs = tmpNew.concat(tmp);
    }
  }
})
function checkPortSignal(config, type){
    if (type === 'start') {   
        const execPing = function() {
            $("[port="+config.Port+"]").attr('class', 'fa fa-lg fa-pause-circle');
            var msg = "pingport://"+config.Port;
            setTimeout(function(){connection.send(msg + "*#*" + config.name)},2000);
            
        }();
        var interval = setInterval(execPing, 30000);
        portTimer.push(config.Port);
        portTimer[config.Port] = {"interval":interval};
    }
    else {
        $("[port="+config.Port+"]").attr('class', 'fa fa-lg fa-play-circle');
        clearInterval(portTimer[config.Port].interval);
        delete portTimer[config.Port];
    }
    
    
};