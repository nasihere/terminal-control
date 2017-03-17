# NodeServicesAgent 
Version 0.0.1

NodeServices Agent is a terminal on browser to start/stop all the node application by one click. It has feature to view NODE Application console.logs directly on webview. Ability to search logs and append new node service application. It easy to manage all running instance in one single interface.”

It easy and fast for development purpose.

#### Install
---------
You can install this package with npm.
    


    ```
    $ cd ~/
    $ vim .dev-micro-dashboardrc

    pathConfig = "<Path to json config file>"

    hit Esc
    type :wq
    hit Enter

    $ cd <your microservice controller path>
    $ run 'npm run start:local`
    ```


Then navigate to  `localhost:8125/` and start or stop the services in single page.


EXAMPLE1
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
