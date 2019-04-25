import React,{Component} from 'react';
import './EditProfile.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class EditProfile extends Component{
    constructor(props){
        super(props);

        this.state={
            fname: this.props.user.fname,
            lname: this.props.user.lname,
            email: this.props.user.email,
            password: this.props.user.password,
            address: this.props.user.address,
            community: this.props.user.community,
            city: this.props.user.city,
            state: this.props.user.state,
            pincode: this.props.user.pincode,
            mobile: this.props.user.mobile,
            aadhaar: this.props.user.aadhaar
        }
    }
    render()
    {
        return (
            <div className="profileSetUp">
                <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridFName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={this.state.fname} onChange={(input) => this.setState({fname : input.target.value})} required/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={this.state.lname} onChange={(input) => this.setState({lname : input.target.value})} />
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridAddress1">
                <Form.Label>Address 1</Form.Label>
                <Form.Control value={this.state.address} onChange={(input) => this.setState({address : input.target.value})} />
            </Form.Group>
            <Form.Group controlId="formGridAddress2">
                <Form.Label>Community</Form.Label>
                <Form.Control value={this.state.community} onChange={(input) => this.setState({community : input.target.value})} />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control value={this.state.city} onChange={(input) => this.setState({city : input.target.value})}/>
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
                    <Form.Control value={this.state.pincode} onChange={(input) => this.setState({pincode : input.target.value})}/>
                </Form.Group>
            </Form.Row>
        <Button variant="primary" type="submit">Submit</Button>
        </Form>
            </div>
        );
    }
}

export default EditProfile;
