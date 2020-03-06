import React from 'react';
import { Button } from 'react-bootstrap';

function loginRegister() {
    return (
        <div>
            <Button style={{marginRight: "2rem"}} onClick={() => window.location.pathname = '/login'}>
                Login
            </Button>
            <Button onClick={() => window.location.pathname = '/register'}>
                Register
            </Button>
        </div>
    )
}

export default loginRegister
