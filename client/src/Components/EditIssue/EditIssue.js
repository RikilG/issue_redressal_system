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
      complaintName: this.props.storedData.complaintName,
      pay: this.props.storedData.pay,
      department: this.props.storedData.workNature,
      description: this.props.storedData.description,
      other: this.props.storedData.other,
      type: this.props.storedData.type,
      householdChk: true,
      communityChk: false,
      govtChk: false
    };
  }

  componentDidMount() {
    if (this.props.storedData.type === 'Community') {
      this.setState({ householdChk: false });
      this.setState({ communityChk: true });

    }
    else if (this.props.storedData.type === 'Government') {
      this.setState({ householdChk: false });
      this.setState({ govtChk: true });
    }
  }

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

  handleSubmit = () => {
    if (this.state.department === "Others")
      this.setState({ department: this.state.other });

    fetch("/editIssue", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.props.storedData.id,
        email: this.props.storedData.email,
        complaintName: this.state.complaintName,
        pay: this.state.pay,
        workNature: this.state.department,
        description: this.state.description,
        type: this.state.type
      })
    })
      .then(res => res.json())
      .then(data => {
        alert("Issue successfully Edited!!!");
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
                value={this.state.complaintName}
                onChange={this.onCmpNameChange}
                required
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
              checked={this.state.communityChk}
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
              checked={this.state.govtChk}
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
              <Form.Control value={this.state.pay} onChange={this.onPayChange} required />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="depttype">
              <Form.Label>Type of work</Form.Label>
              <Form.Control as="select" value={this.state.department} onChange={this.onDeptChange} required>
                <option>Others</option>
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
                disabled={
                  this.state.department === "Others" ? null : "disabled"
                }
                required
              />
            </Form.Group>
          </Form.Row>
          <textarea
            id="textbox"
            name="myTextBox"
            cols="50"
            rows="5"
            value={this.state.description}
            onChange={this.onDescriptionChange}
            required
          />
          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="I Agree to the terms and conditions"
              required
            />
          </Form.Group>
          <Button variant="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </div >
    );
  }
}

export default EditIssue;
