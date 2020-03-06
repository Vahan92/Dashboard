import React, { useReducer } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../actions/PostActions';
import PropTypes from 'prop-types';

function Login() {
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            email: '',
            password: ''
        }
    );

    const dispatch = useDispatch();
    const result = useSelector(state => state);

    const onChange = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setUserInput({ [name]: newValue });
    }

    const submit = e => {
        e.preventDefault();
        console.log(userInput);
        dispatch(login(userInput));
        console.log(`this.result `, result.loginReducer);
    }

    return (
        <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    {result.loginReducer.loggedIn && <p style={{ color: "red" }}>Invalid Password or Email</p>}
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

Login.propTypes = {
    login: PropTypes.func
};

export default Login;
