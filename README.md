# NodeServicesAgent 
Version 0.1.6

NodeServices Agent is a terminal on browser to start/stop all the node application by one click. It has feature to view NODE Application console.logs directly on webview. Ability to search logs and append new node service application. It easy to manage all running instance in one single interface.”

It easy and fast for development purpose. To get all information of your apps in one place. 

#### Install
---------
You can install this package with npm.
    
`npm install -g nodeserviceagent`
Then go to the terminal and type `nsa` to run the application.

Cmd Line options

    port   -> sets the port of the web application default=8125
    config -> sets the path of the json file that will contain your settings. Defaults to internal json file
    wsport -> sets the port of the the websocket listener if there is a conflict

    e.g 1: `nsa --port=8125`
    e.g 2: `nsa --port=8125 --config=/user/document/project/projectconfig.json`


#### RC Config (Optional)
---------
If you have any RC config available in the system. `nsa` will hook up to that config by automatically. That generally will be helpful for big organizations.

Options
    pathConfig
    port
    wsport

##### EXAMPLE: RC Config parameters
---------
Bash
```
    $ cd ~/
    $ vim .nodeagentsrc

    configPath = "/Users/myusername/myfile.json"
    port = 3080 // optional
    wsport = 1234 // optional

    hit Esc
    type :wq
    hit Enter


```

Windows

```
    C:\> cd C:\Users\myusername
    C:\> copy null > .nodeagentsrc
    C:\> open .nodeagentsrc //otherwise open in notepad


    configPath = "C:\Users\myusername\myfile.json"
    port = 3080 // optional
    wsport = 1234 // optional

    Save File


```

run the `nsa` command

EXAMPLE: JSON intial object parameter
-------------------------------------

To start all the as required in the json file is this.

```javascript
{
    "configService":[]
}
```

the application will add entries as you click on the new start button.

If you so choose, add your objects yourself.

```javascript
{
    "configService":[
        {
            "name": <nameOfService:string>,
            "Port": <portnumber:string>,
            "env":<environmentVariables>, // export NODE_ENV=LOCAL; export NODE_ENC=ABC;
            "command":<npm command string:string>, // "npm run start"
            "cd":<pathofexternalproject:string> // "/user/project/pacakge.json"
        }
    ]
}    
```

Bash Example

```javascript
{
    "configService":[
        {
            "name": My Service,
            "Port": 3080,
            "env":NODE_ENV=LOCAL;NODE_ENC=ABC;
            "command":"npm run start",
            "cd": "/MyProjects/MyServiceProject"
        }
    ]
}
```

Windows

```javascript
{
    "configService":[
        {
            "name": My Service,
            "Port": 3080,
            "env":NODE_ENV=LOCAL;NODE_ENC=ABC;
            "command":"npm run start",
            "cd": "C:\\MyProjects\\MyServiceProject"
        }
    ]
}
```