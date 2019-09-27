import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import jwt from 'jwt-decode';

import Users from './panel_components/users';

function panel() {
    const userRole = jwt(localStorage.getItem("jwt"))["role"];
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            {userRole === "admin" && <Nav.Link eventKey="users">Users</Nav.Link>}
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Tab 2</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="users">
                            <Users />
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
