import React, { Component } from 'react';
import './Feed.css';
import Issue from '../../Classes/Issue';
import CardXFeed from '../../Classes/CardX/CardXFeed';
import ComCard from '../../Classes/CardX/ComCard';
import { Button, Tab, Row, Col, Nav } from "react-bootstrap";

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            comIssues: []
        }
    }

    componentDidMount() {
        //fetch issue details from backend
        fetch('/feed', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.props.email
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                issues: data.myIssues.map((issue, index) => { return new Issue(issue); }),
                comIssues: data.comIssues.map((issue, index) => { return new Issue(issue); })
            });
        });
    }

    onClickEdit = e => {
      this.props.setData();
      this.props.setView("EditIssue");
    };

    render() {
        let { issues,comIssues } = this.state;

        return (
            <div id="feedRoot">
                <h1 id="myFeed"> My Feed </h1> 
                    {issues.map((issue, index) => <CardXFeed header={issue.complaintName} content={issue} parent={this} key={index} myIssues={true} /> )}
                <h1 id="myFeed"> Community Feed</h1>
                <div className="panel panel-default" id="panelMain">
                    <Row>
                        <Col sm={12} lg>
                            <div className="panel panel-default" id="panel">
                                    <h1 className="panel-title">Daily Feed</h1>
                                <div className="panel-body">
                                    {comIssues.map((issue, index) => <ComCard header={issue.complaintName} content={issue} parent={this} key={index} /> )}
                                </div>
                            </div>
                        </Col>
                        <div classname="vr" xs></div>
                        <Col sm={3} lg>
                            <div className="panel panel-default" id="panel">
                                <h1 className="panel-title"> Trendy Issues</h1>
                                <div className="panel-body"></div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>        
    );
  }
}

export default Feed;
