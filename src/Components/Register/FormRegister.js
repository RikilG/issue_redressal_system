import React, { Component } from 'react';
import './FormRegister.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class FormRegister extends Component {
    render() {
      return (
          <div className="formregister">
            <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridFName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email@example.com" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridAddress1">
                <Form.Label>Address 1</Form.Label>
                <Form.Control placeholder="1234 Main St" />
            </Form.Group>
            <Form.Group controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select">
                        <option>Choose...</option>
                        <option>Rajasthan</option>
                        <option>...</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Pin Code</Form.Label>
                    <Form.Control />
                </Form.Group>
            </Form.Row>
            <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="I Agree to the terms and conditions" />
            </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
        </Form>
        </div>
      );
    }
  }

export default FormRegister;