import * as React from 'react';
import {Row, Col, Jumbotron, Panel, ListGroup,ListGroupItem, Button, Glyphicon,MenuItem,SplitButton, DropdownButton} from 'react-bootstrap';
import {connect} from 'react-redux';
import {MemoryTile} from '../../Components/MemoryTile';
import {Tabs,ReadMe} from './../../Components/Service';
import {Project} from './../../Components/Dashboard';
import { ImportProject,FileDragDrop } from './';

import Convert from 'ansi-to-html';
let convert=new Convert({newline:true});


class _HomeBody extends React.Component{
    state = {
        show: false
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
    closeModal() {
        this.setState({
            show:false
        })
    }

    showModal(data) {
        this.setState({
            show:true,
            modalData: data
        })
    }
    createEnv(environment){
        const env = environment.replace(/export/g,'').replace(/SET/g,'').split(';');
        return env.map((item, index) => {
            if (item)
                return <small className="label label-warning">{item}</small>
        })
    }
    createLogRow(logs){

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
    render(){
        if (!this.props.cardData) return null;
        const  { cardData } = this.props;
        const headerClass = this.getRandomClassHeader();

        return(

            <Row>
                <FileDragDrop>
                    <div className="terminal">
                    <div className="title">
                        <h5 className={headerClass}>{this.props.group}

                            <div className="pull-right"><DropdownButton

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
                                    <small><Glyphicon glyph="remove"/> delete</small>
                                </MenuItem>
                            </DropdownButton></div>
                        </h5>
                    </div>

                    <div className="style-flex ">
                        {
                            cardData.map(item => {
                                return (
                                <div>
                                    <div style={{'text-align':'center', 'color':"#1d8aa3"}}>|</div>
                                    <div className="well-sm terminal-card">

                                            <small className="terminal-header text-muted">

                                                <span>{item.serviceName}</span>
                                                <div className="pull-right">
                                                    <DropdownButton

                                                        title={<Glyphicon glyph="option-vertical"/>}
                                                        bsSize="xsmall"
                                                        key={item+"dropOption"}
                                                        className="btn-link">

                                                        <MenuItem>
                                                            <small><Glyphicon glyph="cog"/> settings</small>
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <small><Glyphicon glyph="refresh"/> restart</small>
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <small><Glyphicon glyph="remove"/> delete</small>
                                                        </MenuItem>
                                                    </DropdownButton>
                                                </div>
                                            </small>
                                            <div className="terminal-prebody">
                                                {this.createEnv(item.env)}
                                            </div>
                                            <div className="prompt terminal-body" onClick={this.showModal.bind(this,item)}>
                                                {this.createLogRow(item.logs)}

                                            </div>

                                            <div className="terminal-footer">

                                            </div>
                                        </div>
                                </div>
                                )
                            })

                        }


                    </div>
                </div>
                </FileDragDrop>
                <ImportProject show={this.state.show} bsSize="large" close={this.closeModal.bind(this)}
                               modalData={this.state.modalData}/>
            </Row>


        )
    }
}

//
// class _HomeBody extends React.Component{
//
//     render(){
//         return(
//             <div>
//                 <Col sm={8}  lg={12}>
//                     <Row>
//                         <Jumbotron>
//                             <h1>Welcome!</h1>
//                             <p>Thank you for using the desktop webservice, <b>Node ServiceAgent</b></p>
//                             <p>To get Started visit the services tab and click on service!</p>
//                         </Jumbotron>
//                     </Row>
//                     <Row>
//                         <Col xs={12} md={4} lg={4}>
//                             <Panel header="Coming Soon">
//                                 <ListGroup>
//                                     <ListGroupItem>
//                                         Validation for Service Forms
//                                     </ListGroupItem>
//                                     <ListGroupItem>
//                                         Enable use of package.json script commands
//                                     </ListGroupItem>
//                                     <ListGroupItem>
//                                         Better Handling of the Start and Stop Services
//                                     </ListGroupItem>
//                                     <ListGroupItem>
//                                         DASHBOARD!
//                                     </ListGroupItem>
//                                 </ListGroup>
//                             </Panel>
//                         </Col>
//
//                         <Col xs={12} md={8} lg={8}>
//                             <Project />
//
//                         </Col>
//                         <Col xs={12} md={4}  lg={4}>
//                             <Panel header="Visit Github!">
//                             <p>Our Content is currently stored on github however it is in a private repository. When we release the code it will be referenced here</p>
//                             </Panel>
//                         </Col>
//                     </Row>
//                 </Col>
//             </div>
//         )
//     }
// }


let mapStateToProp = (state) => {
    return{
        services:state.websocket.services.items,
        memory:state.memoryUsage
    }
}

export let HomeBody = connect(mapStateToProp)(_HomeBody);


