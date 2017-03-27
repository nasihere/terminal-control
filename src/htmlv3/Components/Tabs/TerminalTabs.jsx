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
            if(item.connected) {
                return <Tab key={('logs_tab#' + (i + 1)).toString()} eventKey={i + 1} title={item.name}>

                        <DisplayServiceInfo {...item} />
                        {logsHistory.map((itemLog, idx) => {
                            return <DisplayLog {...itemLog} key={"logs_inline#" + (i + 1) + "_" + idx}/>
                        })}


                </Tab>
            }
        })
    }
    render() {
        return (
            <Tabs defaultActiveKey="0" id="logs-tab">
                <Tab eventKey="0" key="0" title="Show Logs">

                        {
                            this.getLogHistory().map((itemLog, idx)=> {
                                return  <DisplayLog {...itemLog} key={"logs_inline#"+idx.toString()} />})
                        }

                </Tab>
                {this.createTabs()}
            </Tabs>
        );
    }
};

