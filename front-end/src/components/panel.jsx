import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

import Registration from './registration';

function panel() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Tab 1</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Tab 2</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <Registration/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <h3>Gago</h3>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default panel
