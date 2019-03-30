import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './OmbudsmanHome.css';
import Issue from '../../Classes/Issue';
import CardX from '../../Classes/CardX/CardX';

class OmbudsmanHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comIssues: [],
            govtIssues: [],
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
                comIssues: data.community.map((issue, index) => { return new Issue(issue); }),
                govtIssues: data.government.map((issue, index) => { return new Issue(issue); }),
            });
        });
    }
    
    render() {
        let { comIssues,govtIssues } = this.state;
        return(
            <Container id="ombudsmanRoot" fluid="true">
                <Row>
                    <Col>
                        <div id="headerPanel">
                            Community Issues
                        </div>
                        <div>
                            {comIssues.map((issue, index) => <CardX header={issue.complaintName} content={issue} parent={this} key={index} />)}
                        </div>
                    </Col>
                    <Col>
                        <div id="headerPanel">
                            Government Issues
                        </div>
                        <div>
                            {govtIssues.map((issue, index) => <CardX header={issue.complaintName} content={issue} parent={this} key={index} />)}
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default OmbudsmanHome;