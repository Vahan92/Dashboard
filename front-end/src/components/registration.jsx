import React, { Component } from 'react';
import { Form, ButtonGroup, Button, Modal } from 'react-bootstrap';
import axios from "axios";

export default class Registration extends Component {

    state = {
        email: "",
        password: "",
        role: "",
        name: ""
    }

    submit = e => {
        e.preventDefault();
        console.log(this.state);
        axios
            .post('http://localhost:4000/api/users', {
                email: this.state.email,
                password: this.state.password,
                role: this.state.role,
                name: this.state.name
            }).then(res => {
                console.log(res);
            }).catch((error) => {
                if (error.response.status === 409) {
                    this.setState({
                        show: true
                    })
                }
            })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state)
    }

    setRole = (el) => {
        this.setState({
            role: el.target.value
        })
        console.log(this.state)

    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error while registering</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>This email is already in use</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Form onSubmit={this.submit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control onChange={this.onChange} type="text" name="name" placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={this.onChange} type="email" name="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.onChange} type="password" name="password" placeholder="Password" />
                    </Form.Group>
                    <div>
                        <p>register as:</p>
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="primary" onClick={this.setRole} value="pm">Pm</Button>
                            <Button variant="primary" onClick={this.setRole} value="admin">Admin</Button>
                            <Button variant="primary" onClick={this.setRole} value="developer">Developer</Button>
                        </ButtonGroup>
                    </div>
                    <Button variant="primary" type="submit">
                        Submit
            </Button>
                </Form>
            </div>
        )
    }
}
