import React from 'react';
import {Row, Grid} from 'react-bootstrap/lib';
import {Tabs} from './../../Components/Service';


export class ServiceClass extends React.Component {


    render() {
        return (
            <div>
                <Grid fluid>
                    <Row className="show-grid">
                        <Tabs />
                    </Row>
                </Grid>
            </div>
        )
    }
}

export const ServicesBody = ServiceClass;