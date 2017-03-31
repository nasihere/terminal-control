import React from 'react';
import {Col, Row, Grid} from 'react-bootstrap/lib';
import {NavBar} from './Sections/NavBar.jsx';
import {Tabs} from './Sections/Tabs.jsx';
import {ReadMe} from './Sections/Readme.jsx';

const gridInstance = (
    <Grid>
        <Row className="show-grid menubar">
            <Col xs={12} md={12}><NavBar /></Col>
        </Row>

        <Row className="show-grid">
            <Col xs={12} md={12}><Tabs /></Col>
        </Row>

        <Row className="show-grid">
            <Col md={12}><ReadMe /></Col>
        </Row>
    </Grid>
);


export class LayoutClass extends React.Component {


    render() {
        return (
            <div>
                {gridInstance}
            </div>
        )
    }

}

export const Layout = LayoutClass;