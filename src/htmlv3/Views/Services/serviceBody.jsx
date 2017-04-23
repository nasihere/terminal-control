import React from 'react';
import {Col, Row, Grid} from 'react-bootstrap/lib';
import {Tabs,ReadMe} from './../../Components/Service';


export class ServiceClass extends React.Component {


    render() {
        return (
            <div>
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={12} md={12}><Tabs /></Col>
                    </Row>

                    <Row className="show-grid">
                        <Col md={12}></Col>
                    </Row>
                </Grid>
            </div>
        )
    }

}

export const ServicesBody = ServiceClass;