var NODECONFIG = [];
var portTimer = [];
var vm = new Vue({
  el: '#app',
  data: {
    message: 'Welcome to NodePorts Monitors',
    paginatedItems: NODECONFIG,
    currentItem: null,
    editConfig: function(item){
        this.currentItem = item;
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
        var pwd = 'cd ' + config.cd + ";" ;
        var env = config.env;
        if (!msg) {
            return;
        }
        // send the message as an ordinary text
        connection.send(pwd + env + msg + "*#*" + config.name);
        checkPortSignal(config, 'start');
    },
    setService: function(config){
        this.paginatedItems = config;
    },
    stopService: function(config){
        var msg = config.stop.replace('#PORT#',config.Port);
        connection.send(msg + "*#*" + config.name);
        checkPortSignal(config, 'stop');
    },
    saveConfig: function(config) {
        connection.send('saveConfig://'+JSON.stringify(config));
        this.currentItem = null;
    },
    readConfig: function() {
        connection.send('readConfig://');

    }
  }
})
function checkPortSignal(config, type){
    if (type === 'start') {   
        const execPing = function() {
            $("[port="+config.Port+"]").attr('class', 'fa fa-pause-circle');
            var msg = "pingport://"+config.Port;
            setTimeout(function(){connection.send(msg + "*#*" + config.name)},2000);
            
        }();
        var interval = setInterval(execPing, 30000);
        portTimer.push(config.Port);
        portTimer[config.Port] = {"interval":interval};
    }
    else {
        $("[port="+config.Port+"]").attr('class', 'fa fa-stop-circle');
        clearInterval(portTimer[config.Port].interval);
        delete portTimer[config.Port];
    }
    
    
};
