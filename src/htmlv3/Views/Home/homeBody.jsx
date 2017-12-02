import * as React from 'react';
import ReactDOM from 'react-dom'
import {Row, Col, Jumbotron, Panel, ListGroup,ListGroupItem, Button, Glyphicon,OverlayTrigger,Tooltip,MenuItem,SplitButton, DropdownButton} from 'react-bootstrap';
import {connect} from 'react-redux';
import {MemoryTile} from '../../Components/MemoryTile';
import {Tabs,ReadMe} from './../../Components/Service';
import {StatusPanel} from './../../Components/Service/Sections/Terminal/Panel/Status.jsx';
import {submitNewService, startService,editService, killService, deleteService, clearLogs} from '../../Actions/service_actions.js';
import {Project} from './../../Components/Dashboard';
import { TerminalLogs,FileDragDrop,ImportProject } from './';
import Dropzone from 'react-dropzone'
import {ServiceFormModal} from './../../Components/Common/ServiceModal/ServiceModal.jsx';

import Convert from 'ansi-to-html';
let convert=new Convert({newline:true});

class _HomeBody extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showTerminal: false,
            showProject: false,
            showConfigModal: false,
            files: [],
            modalItem:       {},
            accepted: [],
            rejected: []
        }
        this.handleShow = this.handleShow.bind(this);
    }
    handleShow(item) {
        const self = this;
        setTimeout(
        function() {
            const historyList     = self.refs[`historyList_${item.id}`];
            const historyListData = self.refs[`historyListData_${item.id}`];
            if (historyList === undefined) return;
            const scrollTop                             = historyList.scrollTop;
            const scrollHeight                          = historyList.scrollHeight;
            const height                                = historyListData.clientHeight;
            const maxScrollTop                          = scrollHeight - height;
            ReactDOM.findDOMNode(historyList).scrollTop = height;//(scrollTop !== 0 && scrollTop > maxScrollTop) ? scrollTop : maxScrollTop;
        },2000);
    }
    restart (item) {
        this.kill(item);
        this.run(item);
    }
    kill = (item) => {
        this.clearLogs(item)
        this.props.killService(item)
    }
    run = (item) => {
        this.props.startService(item, item.command)
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
    createEnv(item){
        const environment = item.env;
        if (!environment) return <small><Button type="button" bsSize="xsmall" bsStyle="success" onClick={()=>this.openConfigModal(item, 'edit')}>Set Environment Variables</Button></small>;
        const env = environment.replace(/export/g,'').replace(/SET/g,'').split(';');
        return env.map((item, index) => {
            if (item)
                return <small className="label label-danger">{item}</small>
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
    clearLogs(item) {
        this.props.clearLogs(item);
    }
    onDrop(files) {
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
    startAllServices(cardData) {
        cardData.map(item => {
            this.restart(item);
        })
    }
    render(){
        if (!this.props.cardData) return null;
        const  { cardData } = this.props;
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
                                    <MenuItem onSelect={(k,e) => {this.startAllServices(cardData)}}>
                                        <small><Glyphicon glyph="refresh"/> start all group services</small>
                                    </MenuItem>
                                    <MenuItem divider />
                                    <MenuItem>
                                        <small><Glyphicon glyph="remove" /> delete all group services</small>
                                    </MenuItem>
                                </DropdownButton>
                            </div>
                        </h5>
                    </div>

                    <div className="style-flex ">
                        {

                            cardData.map(item => {
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

                                                <span>{item.name} </span>
                                                <div className="pull-right">

                                                    <DropdownButton

                                                    title={<Glyphicon glyph="option-vertical"/>}
                                                    bsSize="xsmall"
                                                    key={item.name+"dropOption"}
                                                    className="btn-link">

                                                    <MenuItem onSelect={()=>this.openConfigModal(item, 'edit')}>
                                                        <small><Glyphicon glyph="cog"/> settings</small>
                                                    </MenuItem>
                                                    <MenuItem  key={`npm-run-${item.name}-${item.command}`}
                                                               onSelect={(k, e) => {this.restart(item)}}>

                                                        <OverlayTrigger placement="top" overlay={
                                                            <Tooltip id="tooltip">{item.command}</Tooltip>}>
                                                            <small><Glyphicon glyph="refresh"/> <code>{item.command.substr(0,30)}</code></small>
                                                        </OverlayTrigger>
                                                    </MenuItem>
                                                    <MenuItem onSelect={(k,e) => {this.remove(item)}}>
                                                        <small><Glyphicon glyph="remove" /> delete</small>
                                                    </MenuItem>
                                                    <MenuItem divider />
                                                    <MenuItem onSelect={()=>this.clearLogs(item)}>
                                                        <small><Glyphicon glyph="ban-circle"/> Clear Logs</small>
                                                    </MenuItem>
                                                    <MenuItem onSelect={(k,e) => {this.kill(item)}}>
                                                        <small><Glyphicon glyph="stop" /> Kill Service</small>
                                                    </MenuItem>
                                                    <MenuItem divider />
                                                        {
                                                            npmArray.map(npmItem => {
                                                                return (

                                                                    <MenuItem key={`npm-run-${item.name}-${npmItem}`} onSelect={(k,e) => {this.props.startService({id: item.id, cd: item.cd, env: item.env, command: 'npm run ' + npmItem, name: item.name})}}>{npmItem}</MenuItem>
                                                                )
                                                            })


                                                        }


                                                </DropdownButton>
                                                    <StatusPanel config={item}  />
                                                </div>
                                            </small>
                                            <div className="terminal-prebody">
                                                {this.createEnv(item)}
                                            </div>
                                            <div ref={`historyList_${item.id}`} className="prompt terminal-body" onClick={this.showTerminalModal.bind(this,this.props.logs[item.id])}>
                                                <div ref={`historyListData_${item.id}`}   >
                                                    {this.createLogRow(this.props.logs[item.id])}
                                                    {this.handleShow(item)}
                                                </div>
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
                                  close={this.closeConfigModal}
                                  submit={this.edit}/>
            </Row>



        )
    }
}


let mapStateToProp = (state) => {
    return{
        services:state.websocket.services.items,
        // memory:state.memoryUsage,
        logs:     state.websocket.logsHistory
    }
}

export let HomeBody = connect(mapStateToProp,{submitNewService,startService,killService,editService, deleteService, clearLogs})(_HomeBody);


