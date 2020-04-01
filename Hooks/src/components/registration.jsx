import React, { Component } from 'react';
import { Form, ButtonGroup, Button } from 'react-bootstrap';
import axios from "axios";
import { message } from 'antd';

export default class Registration extends Component {

  state = {
    email: "",
    password: "",
    role: "",
    name: "",
    validationFail: false
  }

  submit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/api/register', {
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        name: this.state.name
      }).then(res => {
        this.setState({
          validationFail: false
        })
        message.success('User successfully registered', 7);

      }).catch((error) => {
        if (error.response.status === 409) {
          this.setState({
            validationFail: false
          })
          message.error('This email is already in use', 7);
        }
        if (error.response.status === 418) {
          this.setState({
            validationFail: true
          })
        }
      })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  setRole = (el) => {
    this.setState({
      role: el.target.value
    })
  }

  handleClose = () => {
    this.setState({
      show: false
    })
  }

  render() {
    return (
      <div>
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
          <Button style={{ margin: "1rem" }} variant="primary" type="submit">
            Submit
                    </Button>
          {this.state.validationFail && <p style={{ color: "red", backgroundColor: "#ffe6e6" }}>Please fill in all fileds and select role as reqiured</p>}
        </Form>
      </div>
    )
  }
}
