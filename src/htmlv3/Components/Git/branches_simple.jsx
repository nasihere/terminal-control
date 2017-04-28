import React from 'react';
import {connect} from 'react-redux';
import {Col, Panel, PanelGroup, ListGroupItem, ListGroup, Table} from 'react-bootstrap';
import { Get_Branches, Get_WorkingBranch, Get_RemoteBranches, Get_Status} from '../../Actions/git_actions';
import Convert from 'ansi-to-html';
let convert=new Convert({newline:true,colors:{1:"#19A"}});


import './branches_simple.css'

export class BranchesSimpleClass extends React.Component{
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
			this.props.Get_Branches(service[0]);
			this.props.Get_WorkingBranch(service[0]);
			this.props.Get_RemoteBranches(service[0]);
			this.props.Get_Status(service[0]);
		}
	}
	getTableItems=(item) =>{
		let str="";
		let br=item.match(/(^\*?\s?.*\[\w?\s)/);
		let co=item.match(/(\s(([0-9,a-z]{7})|(->))\s)/);
		let di=item.substring(co.index+co[0].length);
		str += `<div class="cell">${convert.toHtml(br[0])}</div>`;
		str += `<div class="cell">${co[0].trim()}</div>`;
		str += `<div class="cell">${di}</div>`;
		return str;

}
	handleSelect=(activeKey)=>{
		this.setState({ activeKey });
	};
	render(){
		let git=this.props.git && this.props.git[this.state.serviceId] ? this.props.git[this.state.serviceId] : "";
		let branches=git.branches ? git.branches.filter((item)=>item!=="").map((item)=>{
			return this.getTableItems(item)
		}) :[];
		let remoteBranches=git.remoteBranches ? git.remoteBranches.filter((item)=>item!=="").map((item)=>{
			return this.getTableItems(item)
		}) :[];
		let status=git.status ? git.status.filter((item)=>item!=="").map((item)=>{
			let mtch=item.match(/^(A|M|D|R|C|U| )*/)
			return `<div class="cell">${mtch[0]}</div><div class="cell">${item.substring(mtch[0].length)}</div>`
		}) :['nothing to commit. working tree clean'];
		let branchList= branches.map((_,i)=><div className="row" key={i} dangerouslySetInnerHTML={{__html:_}}/>);
		let rbranchList= remoteBranches.map((_,i)=><div className="row" key={i} dangerouslySetInnerHTML={{__html:_}}/>);
		let statusList= status.map((_,i)=><div className="row" key={i} dangerouslySetInnerHTML={{__html:_}}/>);
		return (
			<div className="simpleBranch">
				<Col md={2}>
					<PanelGroup onSelect={this.handleSelect} defaultActiveKey="_0" accordion>
						<Panel header="Current State" eventKey="_0">
							<Table>
								<tbody>
									<tr>
										<td>Current Branch:</td>
										<td>{git.workingBranch}</td>
									</tr>
								</tbody>
							</Table>
						</Panel>

					</PanelGroup>
				</Col>

				<Col md={10}>
					<PanelGroup onSelect={this.handleSelect} defaultActiveKey="0" accordion>
						<Panel header="Status" eventKey="0">
							<div className="table">
								{statusList}
							</div>
						</Panel>
						<Panel header="Local Branches" eventKey="1">
							<div className="table">
								{branchList}
							</div>
						</Panel>
						<Panel header="Remote Branches" eventKey="2">
							<div className="table">
								{rbranchList}
							</div>
						</Panel>
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

export const BranchesSimple = connect(MapStateToProps,{Get_Branches, Get_WorkingBranch,Get_RemoteBranches, Get_Status})(BranchesSimpleClass);