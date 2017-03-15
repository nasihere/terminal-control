var NODECONFIG = [];
var portTimer = [];
var vm = new Vue({
  el: '#app',
  data: {
    message: 'Welcome to NodePorts Monitors',
    inlinelogs: true,
    settings: NODECONFIG,
    logs: [],
    printLogs: [],
    currentItem: null,
    editConfig: function(item, index){
        this.currentItem = item;
        this.currentItem.index = index;
    },
    searchLogs: function(search){
        const msg = search.toLowerCase();
        this.printLogs = this.logs.filter(function(x) {
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
              "cd":""
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
        var msg = "lsof -t -i tcp:#PORT# | xargs kill;".replace('#PORT#',config.Port);
        connection.send(msg + "*#*" + config.name);
        checkPortSignal(config, 'stop');
    },
    saveConfig: function(config) {
        if (config.name === ''  ) {
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
        if (config.name === '') {
            this.currentItem = null;
            return;
        };
        var r = confirm("Do you want to remove "+config.name+" service?");
        if (r == true) {
            connection.send('deleteConfig://'+config.index);
            location.reload();
        }
    },
    appendLog: function(log) {
        var tmp = this.logs;
        var tmpNew = [log];
        this.logs = tmpNew.concat(tmp);
    },
    parseLogToJson: function (log) {
        if (this.inlinelogs === false) return log;
        var logArr = log.replace(/&amp;/g, '&').replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>').replace(/&quot;/g, '').split(/(,(?![^\(]*\)))/g);

        if (logArr.length > 1) {
            var obj = {};
            var unreferencedKey = 0;
            logArr.map(function (item) {
                var m = item.match(/=/);
                if (m) {
                    var key = item.substring(0, m.index).trim();
                    var val = item.substring(m.index + 1).trim();
                    obj[key] = val
                }
                else if (item && item !== ","){
                    obj[unreferencedKey] = item;
                    unreferencedKey++;
                }

            });
            return obj;
        }
        else {
            return logArr[0]
        }
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