import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./EditIssue.css";
// import Customer from "../../Classes/Customer";
// import Issue from "../../Classes/Issue";
// import Freelancer from "../../Classes/Freelancer";
// import Organization from "../../Classes/Organization";
// import CardX from "../../Classes/CardX/CardX";

class EditIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
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
    //console.log("huii");
  }
  /* componentDidMount() {

    fetch("/getIssue", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.props.email
      })
    })
      .then(res => res.json())
      .then(data => {
        let allIssues = data.allIss.map((issue, index) => {
          return new Issue(issue);
        });
       
        this.setState({
          issues: allIssues,
        });
      });
  }*/
  onOthersChange = input => {
    this.setState({ other: input.target.value });
  };
  onDescriptionChange = input => {
    this.setState({ description: input.target.value });
  };
  onCmpNameChange = input => {
    this.setState({ complaintName: input.target.value });
  };
  onDeptChange = input => {
    this.setState({ department: input.target.value });
  };
  onPayChange = input => {
    this.setState({ pay: input.target.value });
  };
  onIssueTypeChange = input => {
    if (
      input.target.value === "Community" ||
      input.target.value === "Government"
    )
      this.setState({ householdChk: false });
    else this.setState({ householdChk: true });
    console.log(input.target.value);
    this.setState({ type: input.target.value });
  };

  handleSubmit = id => {
    if (this.state.department === "Choose...")
      this.setState({ department: this.state.other });
    fetch("/editIssue", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
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
        alert("Issue Edited!!!");
        this.props.setView("Feed");
      });
  };

  render() {
    return (
      <div className="editIssue">
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="ComplaintName">
              <Form.Label>Complaint Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Complaint Name"
                onChange={this.onCmpNameChange}
              />
            </Form.Group>
          </Form.Row>
          <label>
            <input
              id="hi"
              type="radio"
              name="test"
              value="Household"
              onChange={this.onIssueTypeChange}
              checked={this.state.householdChk}
            />
            <img
              alt="Household"
              src="https://thumbs.dreamstime.com/b/construction-worker-drilling-hole-wall-new-house-47018944.jpg"
            />
            <p>Household Issue</p>
          </label>
          <label>
            <input
              id="ci"
              type="radio"
              name="test"
              value="Community"
              onChange={this.onIssueTypeChange}
            />
            <img
              alt="Community Issue"
              src="https://i.cbc.ca/1.4649312.1525464898!/fileImage/httpImage/image.jpg_gen/derivatives/original_780/tree-down.jpg"
            />
            <p>Community Issue</p>
          </label>
          <label>
            <input
              id="di"
              type="radio"
              name="test"
              value="Government"
              onChange={this.onIssueTypeChange}
            />
            <img
              alt="Government issue"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/220px-Emblem_of_India.svg.png"
            />
            <p>Government Issue</p>
          </label>
          <Form.Row>
            <Form.Group controlId="estimated pay">
              <Form.Label>Estimated pay</Form.Label>
              <Form.Control placeholder="Rs.1000" onChange={this.onPayChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="depttype">
              <Form.Label>Type of work</Form.Label>
              <Form.Control as="select" onChange={this.onDeptChange}>
                <option>Choose...</option>
                <option>Carpentry</option>
                <option>Electric</option>
                <option>Civil</option>
                <option>Plumbing</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="others">
              <Form.Label>others</Form.Label>
              <Form.Control
                placeholder="If others please specify"
                onChange={this.onOthersChange}
              />
            </Form.Group>
          </Form.Row>
          <textarea
            id="textbox"
            name="myTextBox"
            cols="50"
            rows="5"
            placeholder="Please enter a brief description of your problem"
            onChange={this.onDescriptionChange}
          />
          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="I Agree to the terms and conditions"
            />
          </Form.Group>
          <Button variant="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default EditIssue;
