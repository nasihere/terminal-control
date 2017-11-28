import * as React from 'react';
import {Row, Col, Jumbotron, Panel, ListGroup,ListGroupItem, Button, Glyphicon,MenuItem,SplitButton, DropdownButton} from 'react-bootstrap';
import {connect} from 'react-redux';
import {MemoryTile} from '../../Components/MemoryTile';
import {Tabs,ReadMe} from './../../Components/Service';
import {submitNewService, startService, deleteService} from '../../Actions/service_actions.js';
import {Project} from './../../Components/Dashboard';
import { TerminalLogs,FileDragDrop,ImportProject } from './';
import Dropzone from 'react-dropzone'

import Convert from 'ansi-to-html';
let convert=new Convert({newline:true});

class _HomeBody extends React.Component{
    state = {
        showTerminal: false,
        showProject: false,
        showConfigModal: false,
        files: [],
        modalItem:       {},
        accepted: [],
        rejected: []
    }

    closeConfigModal = () => {
        this.setState({modalItem: {}, showConfigModal: false})
    }
    openConfigModal = (item, type) => {

        switch (type) {
            case 'delete':
                this.setState({modalItem: item, submit: this.remove});
                break;
            case 'edit':
                this.setState({modalItem: item, submit: this.edit});
                break;
        }
        this.setState({showConfigModal: true, type: type})

    }
    edit = (newItem) => {
        this.props.editService(newItem);
        this.closeConfigModal()
    }
    readDirectory = (dirEntry, callback) => {
        var dirReader = dirEntry.createReader();
        var entries = [];
        // Call the reader.readEntries() until no more results are returned.
        var readEntries = function() {
            dirReader.readEntries (function(results) {
                if (!results.length) {
                    callback(entries);
                } else {
                    entries = entries.concat(toArray(results));
                    readEntries();
                }
            }, onError);
        };
        readEntries(); // Start reading dirs.
    }

    getRandomClassHeader() {
        let rnd = Math.round(Math.random() * (3) + 0);
        switch (rnd) {
            case 1:
                return 'text-muted';
            case 2:
                return 'text-primary';
            case 3:
                return 'text-success';
            default:
                return 'text-info'
        }
    }

    closeTerminalModal() {
        this.setState({
            showTerminal:false
        })
    }
    closeProjectModal() {
        this.setState({
            showProject:false
        })
    }
    showTerminalModal(data) {
        this.setState({
            showTerminal:true,
            modalTerminalData: data
        })
    }
    showProjectModal(data) {
        this.setState({
            showProject:true,
            modalProjectData: data
        })
    }
    remove(item) {
        this.props.deleteService(item)

    }
    createEnv(environment){
        if (!environment) return null;
        const env = environment.replace(/export/g,'').replace(/SET/g,'').split(';');
        return env.map((item, index) => {
            if (item)
                return <small className="label label-warning">{item}</small>
        })
    }
    createLogRow(logs){
        if (!logs) return null;
        let prevTime = '';

        return logs.map((item,idx)=>{
            let printTime = false;
            if (prevTime !== item.time) {
                prevTime = item.time;
                printTime = true;
            }
            return <div className="show-grid" key={"logs_inline#" + (idx + 1) + "_" + idx}>
                    {(printTime) ? <code>{item.time}</code> : ''}
                    <div dangerouslySetInnerHTML={{__html:(item) ? convert.toHtml(item.text) : ''}}/>

            </div>

        });
    }
    onDrop(files) {
        console.log(files, 'files');
        files.filter((item)=> {
            this.props.submitNewService(
                {
                    "name": item.name,
                    "group": this.props.group,
                    "env": "",
                    "command": "npm run start",
                    // "cd": item.path || "~/projects/ceh/" + item.name
                    "cd": "/Users/sayedn/projects/ceh/" + item.name
                }
            )
        })
        // this.showProjectModal(files)
    }
    render(){
        console.log(this.props, 'this.props')
        if (!this.props.cardData) return null;
        const  { cardData } = this.props;
        console.log(cardData,'cardData')
        const headerClass = this.getRandomClassHeader();

        return(

            <Row className="rowDrop">
                <Dropzone onClick="javascript:void" onDrop={this.onDrop.bind(this)}>

                <div className="terminal">
                    <div className="title">
                        <h5 className={headerClass}>{this.props.group}

                            <div className="pull-right">
                                <DropdownButton

                                    title={<Glyphicon glyph="option-vertical"/>}
                                    bsSize="xsmall"
                                    className="btn-link">
                                    <MenuItem>
                                        <small><Glyphicon glyph="cog"/> settings</small>
                                    </MenuItem>
                                    <MenuItem>
                                        <small><Glyphicon glyph="refresh"/> restart</small>
                                    </MenuItem>
                                    <MenuItem>
                                        <small><Glyphicon glyph="remove" /> delete</small>
                                    </MenuItem>
                                </DropdownButton>
                            </div>
                        </h5>
                    </div>

                    <div className="style-flex ">
                        {

                            cardData.map(item => {
                                console.log(item, 'item');
                                if (item.data && item.data.length === 0) return null;
                                let npmArray = [];
                                for(let npmItem in item.npm) {
                                    npmArray.push(npmItem);
                                }
                                if (item.length === 0) return null;
                                return (
                                <div>
                                    <div style={{'text-align':'center', 'color':"#1d8aa3"}}>|</div>
                                    <div className="well-sm terminal-card">

                                            <small className="terminal-header text-muted">

                                                <span>{item.name}</span>
                                                <div className="pull-right">
                                                    <DropdownButton

                                                    title={<Glyphicon glyph="option-vertical"/>}
                                                    bsSize="xsmall"
                                                    key={item.name+"dropOption"}
                                                    className="btn-link">

                                                    <MenuItem onSelect={()=>this.openConfigModal.bind(this)}>
                                                        <small><Glyphicon glyph="cog"/> settings</small>
                                                    </MenuItem>
                                                        {
                                                            npmArray.map(npmItem => {
                                                                return (

                                                                    <MenuItem key={`npm-run-${item.name}-${npmItem}`} onSelect={(k,e) => {this.props.startService({id: item.id, cd: item.cd, env: item.env, command: 'npm run ' + npmItem, name: item.name})}}>{npmItem}</MenuItem>
                                                                )
                                                            })


                                                        }
                                                    <MenuItem>
                                                        <small><Glyphicon glyph="refresh"/> restart</small>
                                                    </MenuItem>
                                                    <MenuItem onSelect={(k,e) => {this.remove(item)}}>
                                                        <small><Glyphicon glyph="remove" /> delete</small>
                                                    </MenuItem>

                                                </DropdownButton>
                                                </div>
                                            </small>
                                            <div className="terminal-prebody">
                                                {this.createEnv(item.env)}
                                            </div>
                                            <div className="prompt terminal-body" onClick={this.showTerminalModal.bind(this,this.props.logs[item.id])}>
                                                {this.createLogRow(this.props.logs[item.id])}

                                            </div>

                                            <div className="terminal-footer">

                                            </div>
                                        </div>
                                    <TerminalLogs show={this.state.showTerminal} bsSize="large" close={this.closeTerminalModal.bind(this)}
                                                  modalData={this.state.modalTerminalData}/>
                                </div>
                                )
                            })

                        }


                    </div>
                </div>
                </Dropzone>
                <ImportProject show={this.state.showProject} bsSize="large" close={this.closeProjectModal.bind(this)}
                               modalData={this.state.modalProjectData} />

                <ServiceFormModal type={"edit"}
                                  item={this.state.modalItem}
                                  show={this.state.showConfigModal}
                                  close={this.closeConfigModal} submit={this.edit}/>
            </Row>



        )
    }
}


let mapStateToProp = (state) => {
    return{
        services:state.websocket.services.items,
        memory:state.memoryUsage,
        logs:     state.websocket.logsHistory
    }
}

export let HomeBody = connect(mapStateToProp,{submitNewService,startService, deleteService})(_HomeBody);


