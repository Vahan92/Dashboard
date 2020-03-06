import React, { useState, useReducer } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import setAuthToken from './utils/setAuthorizationToken';
import jwt from 'jwt-decode';

function Login() {
    const [error, setError] = useState(false);
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            email: '',
            password: ''
        }
    );
    const onChange = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setUserInput({ [name]: newValue });
    }

    const submit = e => {
        e.preventDefault();
        console.log(userInput);
        axios
            .post('http://localhost:4000/api/auth', {
                email: userInput.email,
                password: userInput.password
            }).then(res => {
                setError(false);
                console.log('res', res);
                console.log('jwt decoded', jwt(res.data));
                localStorage.setItem("jwt", res.data)
                setAuthToken(res.data);
                window.location.pathname = '/panel';
            }).catch((error) => {
                if (error.response.status >= 400) {
                    setError(true);
                }
            })
    }

    return (
        <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    {error && <p style={{ color: "red" }}>Invalid Password or Email</p>}
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={onChange} type="email" name="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={onChange} type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submit}>
                    Submit
        </Button>
            </Form>
        </div>
    )
}

export default Login;
