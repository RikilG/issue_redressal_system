import React, { Component } from "react";
import "./PostIssue.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import TimeWrapper from "../../Classes/TimeWrapper/TimeWrapper";
import ModalAlert from "../../Classes/Modals/ModalAlert";
import { images } from "./images";
import axios from 'axios';

class PostIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: "",
      i: 0,
      showModal: false,
      complaintName: "",
      pay: "",
      department: "Others",
      description: "",
      other: "",
      type: "Household",
      householdChk: true
    };
  }

  // componentDidMount() {
  //   setInterval(() => {
  //     this.setState({ i: this.state.i + 1 });
  //     this.setState({ carousel: images[this.state.i % 10].ref });
  //   }, 2000);
  // }

  handleModalHide = () => {
    setTimeout(() => this.setState({ showModal: false }), 500);
    this.props.setView("Feed");
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
    fetch("/postIssue", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.props.email,
        complaintName: this.state.complaintName,
        pay: this.state.pay,
        workNature: this.state.department,
        description: this.state.description,
        type: this.state.type,
        status: "Pending"
      })
    })
    .then(res => {console.log(res); return res})
      .then(res => {console.log(res); return res.json()})
      .then(data => {
        this.setState({ showModal: true });
      })
      .catch(error => alert(error));
    // console.log("Posting issue using axios");
    // axios.post("/postIssue", {
    //   email: this.props.email,
    //   complaintName: this.state.complaintName,
    //   pay: this.state.pay,
    //   workNature: this.state.department,
    //   description: this.state.description,
    //   type: this.state.type,
    //   status: "Pending"
    // }).then(res => {console.log(res); return res})
    //   .then(res => res.data)
    //   .then(data => {
    //     console.log(data);
    //     this.setState({ showModal: true });
    //   })
    //   .catch(error => alert(error));
  };

  render() {
    return (
      <div className="postIssue form">
        {/* <img id="carousel" alt="mypic" src={this.state.carousel} /> */}
        <h2>Post your issue here</h2>
        <br />
        {(this.state.showModal)?<ModalAlert show={this.state.showModal} onHide={this.handleModalHide} head="Issue successfully submitted!" body="Press close to continue." />:null}
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="ComplaintName">
              <Form.Label>Complaint Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Complaint Name"
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
            <Col>
              <Form.Group controlId="estimated pay">
                <Form.Label>Estimated pay</Form.Label>
                <Form.Control
                  placeholder="Rs.1000"
                  onChange={this.onPayChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Row><Col>
                <Form.Label>Specify available time</Form.Label>
              </Col></Form.Row>
              <Form.Row>
                <Col>
                  <TimeWrapper displayTime='09:00' />
                </Col>
                <Col>
                  <TimeWrapper displayTime='17:00' />
                </Col>
              </Form.Row>
            </Col>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="depttype">
              <Form.Label>Type of work</Form.Label>
              <Form.Control as="select" onChange={this.onDeptChange} required>
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
            placeholder="Please enter a brief description of your problem"
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
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default PostIssue;
