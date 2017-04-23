import React from 'react';
import {Link} from 'react-router-dom';
import { Panel, ListGroup,ListGroupItem} from 'react-bootstrap';



export class ConfigDashboard extends React.Component {


	render() {
		let {readMe} = this.props;
		let readMeLink = !readMe || readMe==="No Package" ? "ReadMe" : <Link to={`/Services/readme/${this.props.config.id}`}>ReadMe</Link>;
		return (
			<Panel  key="graph-panel" header="Configuration Dashboard" bsStyle="primary">
				<ListGroup>
					<ListGroupItem>
						{readMeLink}
					</ListGroupItem>
				</ListGroup>

			</Panel>
		)
	}

}
