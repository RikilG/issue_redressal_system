import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './FormLogin.css';

class FormLogin extends Component {
  render() {
    return (
        <div className="formlogin">
           <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button><br /><br />
                <Button variant="secondary" type="submit">Not a user? Register here</Button>
            </Form> 
        </div>
    );
  }
}

export default FormLogin;
