import React, { Component } from 'react';
import './FormRegister.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class FormRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            pincode: "",
            iAgree: false
        }
    }

    onFnameChange = (input) => {
        this.setState({ fname: input.target.value })
    }
    onLnameChange = (input) => {
        this.setState({ lname: input.target.value })
    }
    onEmailChange = (input) => {
        this.setState({ email: input.target.value })
    }
    onPasswordChange = (input) => {
        this.setState({ password: input.target.value })
    }
    onAdd1Change = (input) => {
        this.setState({ address1: input.target.value })
    }
    onAdd2Change = (input) => {
        this.setState({ address2: input.target.value })
    }
    onCityChange = (input) => {
        this.setState({ city: input.target.value })
    }
    onStateChange = (input) => {
        this.setState({ state: input.target.value })
    }
    onPinChange = (input) => {
        this.setState({ pincode: input.target.value })
    }
    onChkChange = (input) => {
        this.setState({ iAgree:!this.state.iAgree });
    }

    handleRegister = () => {
        if(!this.state.iAgree) {
            alert("Please agree to T&C to continue.")
            return;
        }
        fetch("/register", {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                password: this.state.password,
                address1: this.state.address1,
                address2: this.state.address2,
                city: this.state.city,
                state: this.state.state,
                pincode: this.state.pincode
            })
          })
          .then(res => res.json())
          .then(data => {
              if(data.accepted){
                alert("Successfully registered!!!, login to continue.");
                this.props.setView("Home");
              }
                else
                alert("User already existing, login to continue.");

          })
    }

    render() {
      return (
          <div className="formregister">
            <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridFName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" onChange={this.onFnameChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" onChange={this.onLnameChange} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email@example.com" onChange={this.onEmailChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.onPasswordChange} />
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridAddress1">
                <Form.Label>Address 1</Form.Label>
                <Form.Control placeholder="1234 Main St" onChange={this.onAdd1Change} />
            </Form.Group>
            <Form.Group controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" onChange={this.onAdd2Change} />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control placeholder="City" onChange={this.onCityChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" onChange={this.onStateChange} >
                        <option>Choose...</option>
                        <option>Andhra Pradesh</option>
                        <option>Arunachal Pradesh</option>
                        <option>Assam</option>
                        <option>Bihar</option>
                        <option>Chattisgarh</option>
                        <option>Gujarat</option>
                        <option>Karnataka</option>
                        <option>Kerala</option>
                        <option>Rajasthan</option>
                        <option>TamilNadu</option>
                        <option>Telangana</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Pin Code</Form.Label>
                    <Form.Control placeholder="Pincode" onChange={this.onPinChange} />
                </Form.Group>
            </Form.Row>
            <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="I Agree to the terms and conditions" checked={this.state.iAgree} onChange={this.onChkChange} />
            </Form.Group>
            <Button variant="primary" onClick={this.handleRegister} >Submit</Button>
        </Form>
        </div>
      );
    }
  }

export default FormRegister;