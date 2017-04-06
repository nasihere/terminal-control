import React from 'react';
import {FormControl, FormGroup} from 'react-bootstrap/lib';


export class SearchLogPanelClass extends React.Component {

    constructor(props){
        super(props);

    }
    render() {
        return (
            <FormGroup>
                {/*<FormControl value={this.props.searchLog} onKeyUp={this.props.handleLog} type="text" placeholder="Search" />*/}
                <FormControl value={this.props.searchLog} onChange={this.props.handleLog} type="text" placeholder="Search" />
            </FormGroup>
        )
    }

}

export const SearchLogPanel = SearchLogPanelClass;