 // open connection
var connection = new WebSocket('ws://127.0.0.1:1337');
$(function () {
    "use strict";

    // for better performance - to avoid searching in DOM
    var content = $('#content');
 
    // my color assigned by the server
    var myColor = false;
    // my name sent to the server
    var myName = false;

    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        content.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
                                    + 'support WebSockets.'} ));
        input.hide();
        $('span').hide();
        return;
    }

    connection.onopen = function () {
        // first we want users to enter their names
        console.log("ws opened")
        vm.readConfig();
    };

    connection.onerror = function (error) {
        // just in there were some problems with conenction...

        content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
                                    + 'connection or the server is down.' } ));
    };

    // most important part - incoming messages
    connection.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }

        // NOTE: if you're not sure about the JSON structure
        // check the server source code above
        if (json.type === 'history') { // entire message history
            // insert every single message to the chat window
            for (var i=0; i < json.data.length; i++) {
                addMessage(json.data[i].author, json.data[i].text,
                           json.data[i].color, new Date(json.data[i].time));
            }
            if (json.data.length) {
                setTimeout(function() {
                    vm.pingPort();
                },1000);
            }
        } else if (json.type === 'message') { // it's a single message
            addMessage(json.data.author, json.data.text,
                       json.data.color, new Date(json.data.time));

        } else if (json.type === 'ping') { // it's a single 
            if (json.data.ping === true){
                $("[port="+json.data.port+"]").attr('class', 'fa fa-lg fa-stop-circle');
            }
        } else if (json.type === 'saveConfig') { // it's a single
            if (json.data.success === true){
                NODECONFIG = json.data.config;
                location.reload();
            }
        } else if (json.type === 'readConfig') { // it's a single
            if (json.data.success === true){
                vm.setService(json.data.config.configService);
            }
        } else {
            console.log('Hmm..., I\'ve never seen JSON like this: ', json);
        }
    };

    

    function addMessage(author, message, color, dt) {
        if (message !== '' && (message.indexOf('://') !== -1 || message.indexOf('*#*') !== -1)) return;
        vm.appendLog({
            author: author,
            message: message,
            color: color,
            dt: (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
                + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
        });
        vm.searchLogs($("#searchText").val());
    }

});