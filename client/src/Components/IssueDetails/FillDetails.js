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
      i: 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ i: this.state.i + 1 });
      this.setState({ carousel: images[this.state.i % 10].ref });
    }, 2000);
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
              <Form.Control type="text" placeholder="Complaint Name" />
            </Form.Group>
          </Form.Row>
          <label>
            <input id="hi" type="radio" name="test" value="household" />
            <img src="https://thumbs.dreamstime.com/b/construction-worker-drilling-hole-wall-new-house-47018944.jpg" />
            <p>Household Issue</p>
          </label>
          <label>
            <input id="ci" type="radio" name="test" value="community" />
            <img src="https://i.cbc.ca/1.4649312.1525464898!/fileImage/httpImage/image.jpg_gen/derivatives/original_780/tree-down.jpg" />
            <p>Community Issue</p>
          </label>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="email@example.com" />
            </Form.Group>

            <Form.Group controlId="estimated pay">
              <Form.Label>Estimated pay</Form.Label>
              <Form.Control placeholder="Rs.1000" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="depttype">
              <Form.Label>department type</Form.Label>
              <Form.Control as="select">
                <option>Choose...</option>
                <option>carpentry</option>
                <option>electric</option>
                <option>civil</option>
                <option>plumbing</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="others">
              <Form.Label>others</Form.Label>
              <Form.Control placeholder="If others please specify" />
            </Form.Group>
          </Form.Row>
          <textarea id="textbox" name="myTextBox" cols="50" rows="5">
            Please enter a brief description of your problem.
          </textarea>
          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="I Agree to the terms and conditions"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default FillDetails;
