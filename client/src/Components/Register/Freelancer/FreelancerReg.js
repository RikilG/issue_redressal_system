import React, { Component } from 'react';
import './FreelancerReg.css'
import {Form, Col, Button} from 'react-bootstrap';

class FreelancerReg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
            pincode: "",
            mobile: "",
            iAgree: false,
            chkElectrician: false,
            chkPlumber: false,
            chkCarpenter: false,
            chkCivil: false,
            skills: [],
            otherWork: ""
        }
    }

    onFnameChange   = (input) => { this.setState({ fname: input.target.value }) }
    onLnameChange   = (input) => { this.setState({ lname: input.target.value }) }
    onEmailChange   = (input) => { this.setState({ email: input.target.value }) }
    onPasswordChange= (input) => { this.setState({ password: input.target.value }) }
    onPinChange     = (input) => { this.setState({ pincode: input.target.value }) }
    onMobileChange  = (input) => { this.setState({ mobile: input.target.value }) }
    onChkChange     = (input) => { this.setState({ iAgree:!this.state.iAgree }); }

    handleRegister = () => {
        if(this.state.chkElectrician)this.state.skills.push("Electrical");
        if(this.state.chkPlumber)   this.state.skills.push("Plumbing");
        if(this.state.chkCarpenter) this.state.skills.push("Carpentry");
        if(this.state.chkCivil)     this.state.skills.push("Civil");
        if(this.state.otherWork.length>0) {
            let others = this.state.otherWork.split(",")
            others = others.map((work,index) => {return work.trim()});
            this.setState({ skills:this.state.skills.concat(others) });
        }
        if(!this.state.iAgree) {
            alert("Please agree to T&C to continue.")
            return;
        }
        fetch("/regFreelancer", {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                password: this.state.password,
                pincode: this.state.pincode,
                mobile: this.state.mobile,
                skills: this.state.skills
            })
          })
          .then(res => res.json())
          .then(data => {
              if(data.accepted){
                alert("Successfully registered!!!, login to continue.");
                this.props.setView("Home");
              }
                else {
                    alert("Freelancer email already existing, login to continue.");
                    this.setState({ skills:[] });
                }
          })
    }

    render() {
        return (
            <div id="freelanRegRoot">
            <h1>Service Provider</h1>
            <Form onSubmit={(e) => { e.preventDefault(); setTimeout(800, this.handleRegister());} } >
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" onChange={this.onFnameChange} required />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" onChange={this.onLnameChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="email@example.com" onChange={this.onEmailChange} required />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.onPasswordChange} required />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridMobile">
                        <Form.Label>Mobile No.</Form.Label>
                        <Form.Control placeholder="Mobile No" onChange={this.onMobileChange} required />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Pin Code</Form.Label>
                        <Form.Control placeholder="Pincode" onChange={this.onPinChange} required />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Label className="skills" as={Col} >Skills : </Form.Label>
                    <Form.Check as={Col} className="skills" type="checkbox" label="Electrician" onChange={(input) => this.setState({ chkElectrician:!this.state.chkElectrician })} />
                    <Form.Check as={Col} className="skills" type="checkbox" label="Plumber" onChange={(input) => this.setState({ chkPlumber:!this.state.chkPlumber })} />
                    <Form.Check as={Col} className="skills" type="checkbox" label="Civil" onChange={(input) => this.setState({ chkCivil:!this.state.chkCivil })} />
                    <Form.Check as={Col} className="skills" type="checkbox" label="Carpenter" onChange={(input) => this.setState({ chkCarpenter:!this.state.chkCarpenter })} />
                    <Form.Group as={Col} controlId="otherWork"><Form.Control placeholder="Other Skills(seperate by ,)" onChange={(input) => this.setState({ otherWork:input.target.value })} /></Form.Group>
                </Form.Row>
                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="I Agree to the terms and conditions" checked={this.state.iAgree} onChange={this.onChkChange} required />
                </Form.Group>
                <Button type="Submit" variant="primary" >Submit</Button>
            </Form>
            </div>
        );
    }
}

export default FreelancerReg;