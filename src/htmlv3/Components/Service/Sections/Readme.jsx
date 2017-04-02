import React from 'react';
import {Col, Row, Grid, Panel, PanelGroup} from 'react-bootstrap/lib';
import {Glyphicon, ButtonGroup,ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Well, Jumbotron, Button, Tab, Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap/lib';
import {Table} from 'react-bootstrap/lib';


var ReactMarkdown = require('react-markdown');
var input = `# NodeServicesAgent 
Version 0.0.7

NodeServices Agent is a terminal on browser to start/stop all the node application by one click. It has feature to view NODE Application console.logs directly on webview. Ability to search logs and append new node service application. It easy to manage all running instance in one single interface.&#x201D;

It easy and fast for development purpose. To get all information of your apps in one place. 

#### Install
---------
You can install this package with npm.
    
&#x60;npm install -g nodeserviceagent&#x60;
Then go to the terminal and type &#x60;nsa&#x60; to run the application. 

Default port 8125. If you wish to choose own port 
e.g 1: &#x60;nsa --port=8125&#x60;

You can also set RC config path
e.g 2: &#x60;nsa --port=8125 --config=/user/document/project/projectconfig.json&#x60;


#### RC Config (Optional)
---------
If you have any RC config available in the system. &#x60;nsa&#x60; will hook up to that config by automatically. That generally will be helpful for big organizations.


    &#x60;&#x60;&#x60;
    $ cd ~/
    $ vim .dev-micro-dashboardrc

    pathConfig = &#x22;&#x3C;Path to json config file&#x3E;&#x22;

    hit Esc
    type :wq
    hit Enter

    $ cd &#x3C;your package.json path&#x3E;
    $ run &#x27;npm run start&#x60;
    &#x60;&#x60;&#x60;

run the &#x60;nsa&#x60;

EXAMPLE: RC Config parameter 
---------

&#x60;&#x60;&#x60;
{
    &#x22;configService&#x22;:[
        {
            &#x22;name&#x22;: &#x3C;nameOfService:string&#x3E;,
            &#x22;Port&#x22;: &#x3C;portnumber:string&#x3E;,
            &#x22;env&#x22;:&#x3C;environmentVariables&#x3E;, // export NODE_ENV=LOCAL; export NODE_ENC=ABC;
            &#x22;command&#x22;:&#x3C;npm command string:string&#x3E;, // &#x22;npm run start&#x22;
            &#x22;cd&#x22;:&#x3C;pathofexternalproject:string&#x3E; // &#x22;/user/project/pacakge.json&#x22;
        }
    ]
}    
&#x60;&#x60;&#x60;
`;

export class ReadMeClass extends React.Component {


    render() {

        return (
            <Jumbotron>
                <h6>Readme</h6>
                <ReactMarkdown source={input} />

            </Jumbotron>
        )
    }

}

export const ReadMe = ReadMeClass;