import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './FormLogin.css';

class FormLogin extends Component {

  onClickRegister = (e) => {
    this.props.setView("Register");
  }

  render() {
    return (
        <div className="formlogin">
           <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control id="tvEmail" type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id="tvPassword" type="password" placeholder="Password" />
                </Form.Group>
                <Button id="btnLogin" variant="primary" type="submit">Login</Button><br /><br />
                <Button id="btnRegister" variant="secondary" type="submit" onClick={this.onClickRegister} >Not a user? Register here</Button>
            </Form> 
        </div>
    );
  }
}

export default FormLogin;
