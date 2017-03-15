# NodeServices - NASIR SAYED & NOAH WALLACE
# Version 0.0.1

This repository helps to all the developer to run the microservices from single web page. I'm using websocket to talk to system terminal. It create instance of each service to trace all the logs and report on the web page. All microservices or other NODE application are configuarable. It also support environment, port, location of the project directory and package.json command. 

I didn't used any heavy packages such as express, or static server. Everything's using local OS and native library of nodejs.


#### Getting Started

1. clone or download the repository from https://github.com/nasihere/microservicePortController.git
2. create a json file of your choosing. structure is below in Example1
2. in terminal issue these commands

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
```
