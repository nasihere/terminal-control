import React from 'react';
import {NavBarInstance} from './NavBar/index.jsx';
import {Body} from './Body/body.jsx'

export class App extends React.Component {
    state={services:[]};
    componentDidMount() {
        var connection = new WebSocket('ws://127.0.0.1:1337');
        connection.onopen = () => {
            console.log('opened');
            connection.send('readConfig://');
        };
        connection.onerror = (error) => {

            // just in there were some problems with conenction...
            this.setState({error: 'Sorry, but there\'s some problem with your connection or the server is down.'})
        };
        connection.onmessage = (message) => {
            try{
                let response= JSON.parse(message.data);
                console.log(response);
                console.log(message);
                console.log(response.data.config.configService)
                this.setState({services:response.data.config.configService})
            }
            catch(e){console.log(e)}

        }
    }

    render() {
        let state=this.state;
        console.log(this.state)
        return (
            <div>
                <NavBarInstance />
                <Body {...state}/>
            </div>
        );
    }
}