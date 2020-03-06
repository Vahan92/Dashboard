import React from 'react';
import { Tab, Row, Col, Nav, Button } from 'react-bootstrap';
import jwt from 'jwt-decode';

import Users from './panel_components/users';
import AddReports from './panel_components/reports';

function panel() {
    const logout = () => {
        localStorage.clear();
        window.location.pathname = '/';
    }
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
                            <Nav.Link eventKey="reports">Reports</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="users">
                            <Users />
                        </Tab.Pane>
                        <Tab.Pane eventKey="reports">
                            <AddReports />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
            <div>
                <Button style={{textAlign: "right"}} onClick={logout}>Logout</Button>
            </div>
        </Tab.Container>
    )
}

export default panel
