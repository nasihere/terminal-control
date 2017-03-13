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
        } else if (json.type === 'message') { // it's a single message
            if (json.data.text.indexOf('pingport://') !== -1) return;
            if (json.data.text.indexOf('*#*') !== -1) return;
            addMessage(json.data.author, json.data.text,
                       json.data.color, new Date(json.data.time));

        } else if (json.type === 'ping') { // it's a single 
            if (json.data.ping === true){
                $("[port="+json.data.port+"]").attr('class', 'fa fa-stop-circle');
            }
        } else if (json.type === 'saveConfig') { // it's a single
            if (json.data.success === true){
                NODECONFIG = json.data.config;
            }
        } else if (json.type === 'readConfig') { // it's a single
            if (json.data.success === true){
                vm.setService(json.data.config.configService);
            }
        } else {
            console.log('Hmm..., I\'ve never seen JSON like this: ', json);
        }
    };

    /**
     * Add message to the chat window
     */
    function addMessage(author, message, color, dt) {
        content.prepend('<p><span style="color:' + 'white' + '">' + author + '</span> @ ' +
             + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
             + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
             + ': ' + message + '</p>');
    }
});