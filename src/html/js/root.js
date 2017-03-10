var NODECONFIG = [
        {
            "key": 1,
            "name":"User Microservice", 
            "Port": "3080", 
            "env":"export NODE_ENV=LOCAL; export NODE_PORT=3080; export debug=info;", 
            "command":"npm run start;", 
            "pwd":"/Users/sayedn/projects/ceh/id-ceh-microservice-user", 
            "stop":"lsof -t -i tcp:3080 | xargs kill;"
        },
        {
            "key": 2, 
            "name":"AutoPay Microservice", 
            "Port": "3090", 
            "env":"export NODE_ENV=LOCAL; export NODE_PORT=3090; export debug=info;", 
            "command":"npm run start;", 
            "pwd":"/Users/sayedn/projects/ceh/id-ceh-microservice-autopay", 
            "stop":"lsof -t -i tcp:3090 | xargs kill;"
        },
        {
            "key": 3, 
            "name":"TOPs Microservice", 
            "Port": "4000", 
            "env":"export NODE_ENV=LOCAL export NODE_PORT=4000; export debug=info;", 
            "command":"npm run start;", 
            "pwd":"/Users/sayedn/projects/ceh/id-ceh-microservice-tops", 
            "stop":"lsof -t -i tcp:4000 | xargs kill;"
        }
   
    ];
var portTimer = [];
new Vue({
  el: '#app',
  data: {
    message: 'Welcome to NodePorts Monitors',
    paginatedItems: NODECONFIG,
    startService: function(config){
        var msg = config.command;
        var pwd = 'cd ' + config.pwd + ";" ;
        var env = config.env;
        if (!msg) {
            return;
        }
        // send the message as an ordinary text
        connection.send(pwd + env + msg + "*#*" + config.name);
        checkPortSignal(config, 'start');
    },
    stopService: function(config){
        var msg = config.stop;
        connection.send(msg + "*#*" + config.name);
        checkPortSignal(config, 'stop');
    }
  }
})

function checkPortSignal(config, type){
    if (type === 'start') {   
        var interval = setInterval(function() {
                $("#"+config.Port).attr('class', 'w_circle');
                var msg = "pingport://"+config.Port;
                connection.send(msg + "*#*" + config.name);
                
            }, 2000);
        
        portTimer.push(config.Port);
        
        portTimer[config.Port] = {"interval":interval};
    }
    else {
        $("#"+config.Port).attr('class', 'r_circle');
        clearInterval(portTimer[config.Port].interval);
    }
    
    
};
