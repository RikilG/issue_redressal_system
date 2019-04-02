import React, { Component } from 'react';
import './Feed.css';
import Issue from '../../Classes/Issue';
import CardXFeed from '../../Classes/CardX/CardXFeed';
import ComCard from '../../Classes/CardX/ComCard';
import { Row,Col } from 'react-bootstrap';

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

    render() {
        let { issues,comIssues } = this.state;

        return (
            <div id="feedRoot">
                <Row>
                    <h1 id="myFeed"> My Feed </h1>
                    <br/> 
                    {issues.map((issue, index) => <CardXFeed header={issue.complaintName} content={issue} parent={this} key={index} myIssues={true} /> )}
                    <br/> 
                </Row>
                <Row>
                    <h1 id="myFeed"> Community Feed</h1>
                    <br/>
                    <div className="panel panel-default" id="panelMain">
                    <div className="panel panel-default" id="panel">
                    <div className="panel-heading">
                    <h1 className="panel-title">Daily Feed</h1>
                    </div>
                    <div className="panel-body">
                    {comIssues.map((issue, index) => <ComCard header={issue.complaintName} content={issue} parent={this} key={index} /> )}
                    
                    </div>
                    </div>
                    <div className="panel panel-default" id="panel">
                        <div className="panel-heading">
                        <h1 className="panel-title">Important Noted Feed</h1>
                        </div>
                        <div className="panel-body">Panel content…</div>
                    </div>
                    
                    </div>
                </Row>
            </div>
        );
    }
}

export default Feed;