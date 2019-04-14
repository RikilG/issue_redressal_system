import React, { Component } from "react";
import "./PostIssue.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import ModalAlert from "../../Classes/Modals/ModalAlert";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { images } from "./images";
// import axios from 'axios';
import householdimg from '../../Assets/household.jpg';
import communityimg from '../../Assets/community.jpg';
import governmentimg from '../../Assets/government.png';
import carousal1 from '../../Assets/carousal1.jpg';
import carousal2 from '../../Assets/carousal2.jpg';
import carousal3 from '../../Assets/carousal3.png';
import carousal4 from '../../Assets/carousal4.png';

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
      householdChk: true,
      format: 'h:mm a',
      tstart: moment().hour(9).minute(0),
      tend: moment().hour(18).minute(0)
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ i: this.state.i + 1 });
      if (this.state.i === 1 || this.state.i === 5 || this.state.i === 9)
        this.setState({ carousal: carousal3 });
      if (this.state.i === 2 || this.state.i === 8)
        this.setState({ carousal: carousal2 });
      if (this.state.i === 3 || this.state.i === 6 || this.state.i === 0)
        this.setState({ carousal: carousal3 });
      if (this.state.i === 4 || this.state.i === 7)
        this.setState({ carousal: carousal4 });
    }, 2000);

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
  onTime1Change = (value) => {
    // console.log(value.utc().format());
    this.setState({ tstart: value });
  }
  onTime2Change = (value) => {
    this.setState({ tend: value });
  }

  handleSubmit = () => {
    if (this.state.department === "Others")
      this.setState({ department: this.state.other });
    fetch("http://localhost:5000/postIssue", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.props.email,
        complaintName: this.state.complaintName,
        pay: this.state.pay,
        workNature: this.state.department,
        description: this.state.description,
        type: this.state.type,
        tstart: this.state.tstart,
        tend: this.state.tend,
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

  disabledHours = () => { return [0, 1, 2, 3, 4, 5, 6, 7, 22, 23]; }

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
              src={householdimg}
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
              src={communityimg}
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
              src={governmentimg}
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
                <Form.Label>Specify available time(start and end)</Form.Label>
              </Col></Form.Row>
              <Form.Row>
                <Col>
                  <TimePicker
                    showSecond={false}
                    allowEmpty={false}
                    defaultValue={this.state.tstart}
                    className="xxx timeSelect"
                    onChange={this.onTime1Change}
                    format={this.state.format}
                    disabledHours={this.disabledHours}
                    use12Hours
                    inputReadOnly
                    />
                </Col>
                <Col>
                  <TimePicker
                    showSecond={false}
                    allowEmpty={false}
                    defaultValue={this.state.tend}
                    className="xxx timeSelect"
                    onChange={this.onTime2Change}
                    format={this.state.format}
                    disabledHours={this.disabledHours}
                    use12Hours
                    inputReadOnly
                    />
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
