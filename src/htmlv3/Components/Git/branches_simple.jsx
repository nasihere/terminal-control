import React from 'react';
import {connect} from 'react-redux';
import {Col, Panel, PanelGroup, ListGroupItem, ListGroup, Table, Glyphicon} from 'react-bootstrap';
import { Get_Branches, Get_WorkingBranch, Get_RemoteBranches, Get_Status, Get_Pull} from '../../Actions/git_actions';
import Convert from 'ansi-to-html';
let convert=new Convert({newline:true,colors:{1:"#19A"}});

import './branches_simple.css'

export class BranchesSimpleClass extends React.Component{
	state={
		serviceId:this.props.match.params.service,
		activeKey:1
	}
	constructor(props){
		super(props);
		this.gitPullCmd = this.gitPullCmd.bind(this);
		this.service = null;
	}
    gitPullCmd = (branchName) => {
		const obj = {
			...this.service,
			branchName: branchName
		};
		this.props.Get_Pull(obj);
	};
	componentWillMount(){
		let service=this.props.services.filter((item)=>item.id === this.state.serviceId);
		this.service = service[0];
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
	getTableItems=(item, event) =>{
		let str="";
		let br=item.match(/(^\*?\s?.*\[\w?\s)/);
		let co=item.match(/(\s(([0-9,a-z]{7})|(->))\s)/);
		let di=item.substring(co.index+co[0].length);
		str += `<div class="cell">${convert.toHtml(br[0])}</div>`;
		str += `<div class="cell">${co[0].trim()}</div>`;
		str += `<div class="cell">${di}</div>`;
        return str;
	};
    getBranches=(item, event) => {
        let br=item.match(/(^\*?\s?.*\[\w?\s)/);
        let co=item.match(/(\s(([0-9,a-z]{7})|(->))\s)/);
        let di=item.substring(co.index+co[0].length);

        let branch_name = convert.toHtml(br[0].replace(/\s+/g,' ')).substr(1);
        const commit_id = co[0].trim()
        const description = di.trim()


        if (branch_name.indexOf('>master') !== -1) {
            branch_name = 'master';
        }
        return  {
            branch_name,
            commit_id,
            description
		}
    };

	handleSelect=(activeKey)=>{
		this.setState({ activeKey });
	};
	render(){
		let git=this.props.git && this.props.git[this.state.serviceId] ? this.props.git[this.state.serviceId] : "";
		let branches=git.branches ? git.branches.filter((item)=>item!=="").map((item)=>{
			return this.getTableItems(item, this)
		}) :[];
		let remoteBranches=git.remoteBranches ? git.remoteBranches.filter((item)=>item!=="").map((item)=>{
			return this.getTableItems(item, this)
		}) :[];

        let filterBranchList = git.branches ? git.branches.filter((item)=>item!=="").map((item)=>{
            return this.getBranches(item, this)
        }) :[];

		let status=git.status ? git.status.filter((item)=>item!=="").map((item)=>{
			return `<div class="cell">${item}</div>`
		}) :['nothing to commit. working tree clean'];

		let rbranchList= remoteBranches.map((_,i)=><div className="row" key={i} dangerouslySetInnerHTML={{__html:_}}/>);
		let statusList= status.map((_,i)=><div className="row" key={i} dangerouslySetInnerHTML={{__html:_}}/>);


		return (
			<div className="simpleBranch">
				<Col md={2}>
					<PanelGroup onSelect={this.handleSelect} activeKey='_0' accordion>
						<Panel  header="Current State" eventKey="_0">
							<Table>
								<tbody>
									<tr>
										<td>Current Branch:</td>
										<td>{git.workingBranch}</td>
									</tr>

								</tbody>
							</Table>

						</Panel>
						<Panel  header="Status" eventKey="_0">
							<div className="table">
                                {statusList}
							</div>
						</Panel>
					</PanelGroup>

				</Col>

				<Col md={10}>
					<PanelGroup onSelect={this.handleSelect} defaultActiveKey="1" accordion>

						<Panel header="Local Branches" eventKey="1">
							<div className="table">
								<Table>
									<tbody>
									<tr>
										<th>Branch Name</th>
										<th>Commit Id</th>
										<th>Description</th>
									</tr>
									{
                                        filterBranchList.map((item, i) => {
                                            return (<tr key={'pull-btn-'+i}>
												<td>{item.branch_name}</td>
												<td>{item.commit_id}</td>
												<td>{item.description}</td>
												<td><button  onClick={this.gitPullCmd.bind(this, item.branch_name)} className="btn-success">{'Pull ' + item.branch_name}</button></td>
											</tr>)

                                        })
									}
									</tbody>
								</Table>
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

export const BranchesSimple = connect(MapStateToProps,{Get_Branches, Get_WorkingBranch,Get_RemoteBranches, Get_Status, Get_Pull})(BranchesSimpleClass);