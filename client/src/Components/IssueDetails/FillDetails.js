import React, { Component } from "react";
import "./FillDetails.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { images } from "./images";

class FillDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: "",
      i: 0,
      complaintName: "",
      pay: "",
      department: "Choose...",
      description: "",
      other: "",
      type: "Household",
      householdChk: true
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ i: this.state.i + 1 });
      this.setState({ carousel: images[this.state.i % 10].ref });
    }, 2000);
  }

  onOthersChange = (input) => {
    this.setState({ other: input.target.value });
  }
  onDescriptionChange = (input) => {
    this.setState({ description: input.target.value });
  }
  onCmpNameChange = (input) => {
    this.setState({ complaintName: input.target.value });
  }
  onDeptChange = (input) => {
    this.setState({ department: input.target.value });
  }
  onPayChange = (input) => {
    this.setState({ pay: input.target.value });
  }
  onIssueTypeChange = (input) => {
    if(input.target.value === "Community")
      this.setState({ householdChk: false });
    else 
      this.setState({ householdChk: true });
    console.log(input.target.value);
    this.setState({ type: input.target.value });
  }

  handleSubmit = () => {
    if(this.state.department==="Choose...")
      this.setState({ department: this.state.other })
    fetch("/postIssue", {
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.props.email,
        complaintName: this.state.complaintName,
        pay: this.state.pay,
        workNature: this.state.department,
        description: this.state.description,
        type: this.state.type
      })
    })
    .then(res => res.json())
    .then(data => {
      alert("Issue successfully submitted!!!");
      this.props.setView("Feed");
    })
  }

  render() {
    return (
      <div className="fillDetails">
        <img id="carousel" alt="mypic" src={this.state.carousel} />
        <br />

        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="ComplaintName">
              <Form.Label>Complaint Name</Form.Label>
              <Form.Control type="text" placeholder="Complaint Name" onChange={this.onCmpNameChange} />
            </Form.Group>
          </Form.Row>
          <label>
            <input id="hi" type="radio" name="test" value="Household" onChange={this.onIssueTypeChange} checked={this.state.householdChk} />
            <img alt="Household" src="https://thumbs.dreamstime.com/b/construction-worker-drilling-hole-wall-new-house-47018944.jpg" />
            <p>Household Issue</p>
          </label>
          <label>
            <input id="ci" type="radio" name="test" value="Community" onChange={this.onIssueTypeChange} />
            <img alt="Community Issue" src="https://i.cbc.ca/1.4649312.1525464898!/fileImage/httpImage/image.jpg_gen/derivatives/original_780/tree-down.jpg" />
            <p>Community Issue</p>
          </label>
          <Form.Row>
            <Form.Group controlId="estimated pay" >
              <Form.Label>Estimated pay</Form.Label>
              <Form.Control placeholder="Rs.1000" onChange={this.onPayChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="depttype">
              <Form.Label>Type of work</Form.Label>
              <Form.Control as="select" onChange={this.onDeptChange} >
                <option>Choose...</option>
                <option>Carpentry</option>
                <option>Electric</option>
                <option>Civil</option>
                <option>Plumbing</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="others">
              <Form.Label>others</Form.Label>
              <Form.Control placeholder="If others please specify" onChange={this.onOthersChange} />
            </Form.Group>
          </Form.Row>
          <textarea id="textbox" name="myTextBox" cols="50" rows="5" placeholder="Please enter a brief description of your problem" onChange={this.onDescriptionChange} >
          </textarea>
          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="I Agree to the terms and conditions"
            />
          </Form.Group>
          <Button variant="primary" onClick={this.handleSubmit} >Submit</Button>
        </Form>
      </div>
    );
  }
}

export default FillDetails;
