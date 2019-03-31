import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './OmbudsmanHome.css';
import Issue from '../../Classes/Issue';
import CardX from '../../Classes/CardX/CardX';

class OmbudsmanHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracked: [],
            untracked: [],
            completed: []
        }
    }

    componentDidMount() {
        fetch('/Ombudsman', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.props.email
            })
        }).then(res => res.json())
        .then(data => {
            this.setState({
                tracked: data.trakedIssues.map((issue, index) => { return new Issue(issue); }),
                untracked: data.untrackedIssues.map((issue, index) => { return new Issue(issue); }),
                completed: data.completedIssues.map((issue, index) => { return new Issue(issue); }),
            });
        });
    }
    
    render() {
        let { tracked,untracked,completed } = this.state;
        return(
            <Container id="ombudsmanRoot" fluid="true">
                <Row>
                    {!this.props.completedIssues && (
                    <React.Fragment>
                    <Col>
                        <div id="headerPanel">
                            Tracked Issues
                        </div>
                        <div>
                            {tracked.map((issue, index) => <CardX header={issue.complaintName} content={issue} parent={this} key={index} controls="Control" isOmbudsman={true} />)}
                        </div>
                    </Col>
                    <Col>
                        <div id="headerPanel">
                            New Government Issues
                        </div>
                        <div>
                            {untracked.map((issue, index) => <CardX header={issue.complaintName} content={issue} parent={this} controls="Track" key={index} isOmbudsman={true} />)}
                        </div>
                    </Col>
                    </React.Fragment>
                    )}
                    {this.props.completedIssues && (
                    <Col>
                        <div id="headerPanel">
                            Completed Issues
                        </div>
                        <div>
                            {completed.map((issue, index) => <CardX header={issue.complaintName} content={issue} parent={this} controls="Restart" key={index} isOmbudsman={true} />)}
                        </div>
                    </Col>
                    )}
                </Row>
            </Container>
        );
    }
}

export default OmbudsmanHome;