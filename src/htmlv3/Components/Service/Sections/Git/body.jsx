import React from 'react';
import {connect} from 'react-redux';
import {Col, Panel, PanelGroup} from 'react-bootstrap';
import { Get_Branches} from '../../../../Actions/git_actions';
import Convert from 'ansi-to-html';
let convert=new Convert({newline:true});


export class GitBodyClass extends React.Component{
	state={
		serviceId:this.props.match.params.service,
		activeKey:1
	}
	componentWillMount(){
		let service=this.props.services.filter((item)=>item.id === this.state.serviceId);
		if(!service[0]){
			console.error(`This uri:${this.props.location.pathname} cannot be directly referenced`);
			this.props.history.push("/Home");
		}
		else {
			this.props.Get_Branches(service[0])
		}

	}

	handleSelect=(activeKey)=>{
		this.setState({ activeKey });
	};
	render(){
		let git=this.props.git && this.props.git[this.state.serviceId] ? this.props.git[this.state.serviceId] : "";

		return (
			<div>
				<Col md={8}>

				</Col>
				<Col md={4}>
					<PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
						<Panel header="Branches" eventKey="1">
							{git.branches && <div dangerouslySetInnerHTML={{__html:(git) ? convert.toHtml(git.branches) : ''}}/>}

						</Panel>
						<Panel header="" eventKey="2">Panel 2 content</Panel>
					</PanelGroup>
				</Col>
			</div>
		)
	}
}
let MapStateToProps = (state) =>{
	return {
		services:state.websocket.services.items,
		git:state.git
	}
}

export const GitBody = connect(MapStateToProps,{Get_Branches})(GitBodyClass);