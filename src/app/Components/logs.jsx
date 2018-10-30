import React from 'react';

class LogsComponent extends React.Component {
    state = {};
    constructor(props) {
        super();
        this.state = {events: []};
    }
    appendLogs = () => {
        
    }
    componentWillReceiveProps(nextProps) {
        const newEvents = {...nextProps.websocketEvents, ...nextProps.websocket};
        if (newEvents) {
            this.setState({
                events: this.state.events
                    .concat(<div className="event">{this.getNestedObject(newEvents)}</div>)
            })
            
        }
    }
    getNestedObject(obj) {
        const maskProps = ['local'];
        const result = [];
        for (const prop in obj) {
            const value = obj[prop];
            if (typeof value === 'object') {
                result.push(this.getNestedObject(value)); // <- recursive call
            }
            else {
                result.push(<span>{prop}: {value} {value} </span>);
            }
        }
        return result || null;
    }
    render() {
        const LogsEvents =  this.state.events;
               
    
        return (
            <div>
                <span>Message Received</span>
                <div className={"logs"}>
                    
                    {LogsEvents}
                    {/* {JSON.stringify(this.state.events, null, 4)} */}
                    {/* {JSON.stringify(this.state.websocketEvents, null, 4)} */}
                
                </div>
            </div>
        )
    }
}
export const Logs = LogsComponent;