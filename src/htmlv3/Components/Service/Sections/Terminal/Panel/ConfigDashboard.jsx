import React from 'react';
import {Link} from 'react-router-dom';
import { Panel, ListGroup,ListGroupItem} from 'react-bootstrap';




export class ConfigDashboard extends React.Component {
	componentWillMount(){
		this.props.Get_IsWorkingTree(this.props.config)
	}

	render() {

		let {readMe,git,config} = this.props;

		let readMeLink = !readMe || readMe==="No Package" ? "ReadMe" : <Link to={`/Services/readme/${this.props.config.id}`}>ReadMe</Link>;
		let GitWorkingTree = !git[config.id] ? "Github" : <Link to={`/Services/github/${config.id}`}>Github</Link>;
		return (
			<Panel  key="graph-panel" header="Support" bsStyle="primary">
				<ListGroup>
					<ListGroupItem>
						{readMeLink}
					</ListGroupItem>
					<ListGroupItem>
						{GitWorkingTree}
					</ListGroupItem>
				</ListGroup>

			</Panel>
		)
	}

}
