# NodeServicesAgent 
Version 0.0.7

NodeServices Agent is a terminal on browser to start/stop all the node application by one click. It has feature to view NODE Application console.logs directly on webview. Ability to search logs and append new node service application. It easy to manage all running instance in one single interface.”

It easy and fast for development purpose. To get all information of your apps in one place. 

#### Install
---------
You can install this package with npm.
    
`npm install -g nodeserviceagent`
Then go to the terminal and type `nsa` to run the application. 

Default port 8125. If you wish to choose own port 
e.g 1: `nsa --port=8125`

You can also set RC config path
e.g 2: `nsa --port=8125 --config=/user/document/project/projectconfig.json`


#### RC Config (Optional)
---------
If you have any RC config available in the system. `nsa` will hook up to that config by automatically. That generally will be helpful for big organizations.


    ```
    $ cd ~/
    $ vim .dev-micro-dashboardrc

    pathConfig = "<Path to json config file>"

    hit Esc
    type :wq
    hit Enter

    $ cd <your package.json path>
    $ run 'npm run start`
    ```

run the `nsa`

EXAMPLE: RC Config parameter 
---------

```
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
