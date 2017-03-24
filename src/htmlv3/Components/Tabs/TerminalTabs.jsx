import React from 'react';
import {Tabs, Tab} from 'react-bootstrap/lib';

import {DisplayLog,DisplayServiceInfo} from '../LogsView';

export class TerminalTabs extends React.Component {
    getLogHistory() {
        return this.props.logsHistory.reverse();
    }
    createTabs() {
        return this.props.services.items.map((item, i) => {

            const logsHistory = this.getLogHistory().filter((x)=> {return (x.status.author === item.name)});
            return <Tab key={i+1} eventKey={i+1} title={item.name}>
                <div>
                    <DisplayServiceInfo {...item} />
                    {logsHistory.map((itemLog)=> {return  <DisplayLog {...itemLog} />})}

                </div>
            </Tab>
        })
    }
    render() {
        return (
            <Tabs defaultActiveKey="0" id="logs-tab">
                <Tab eventKey="0" key={0} title="Show Logs">
                    <div>
                        {
                            this.getLogHistory().map((itemLog)=> {
                                return  <DisplayLog {...itemLog} />})
                        }

                    </div>
                </Tab>
                {this.createTabs()}
            </Tabs>
        );
    }
};

