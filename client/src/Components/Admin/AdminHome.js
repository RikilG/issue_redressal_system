import React, { Component } from 'react';
import { Button,Tab,Row,Col,Nav } from 'react-bootstrap';
import './AdminHome.css';
import Customer from '../../Classes/Customer';
import Issue from '../../Classes/Issue';
import Freelancer from '../../Classes/Freelancer';
import Organization from '../../Classes/Organization';
import CardX from '../../Classes/CardX/CardX';

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            users: [],
            freelancers: [],
            organizations: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch('/admin', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.props.email
            })
        }).then(res => res.json())
        .then(data => {
            let allIssues       = data.allIss.map((issue, index) => { return new Issue(issue); });
            let allCustomers    = data.allCus.map((customer, index) => { return new Customer(customer); });
            let allFreelancers  = data.allFreelan.map((freelancer, index) => { return new Freelancer(freelancer); });
            let allOrganizations= data.allOrgs.map((organization, index) => { return new Organization(organization); });
            this.setState({
                issues: allIssues,
                users: allCustomers,
                freelancers: allFreelancers,
                organizations: allOrganizations,
            });
        });
    }

    fetchLog = () => {
        // window.open('http://localhost:5000/logs',"_blank");
        fetch('/logs').then(res => res.text())
        .then(text => {
            //   THIS IS TO GET LOG IN NEW TAB PAGE. 
            var logWindow = window.open("", "_blank");
            logWindow.document.write("<pre>"+text+"</pre>");
        });
    }

    render() {
        let { issues, users, freelancers, organizations } = this.state;
        return (
            // <div id="adminHomeRoot">
            //     <div id="issuesContainer">
            //         <p id="containerTitle">Current Issues</p>
            //         {issues.map((issue, index) => <p id="issues" key={index}>{issue.complaintName}</p> )}
            //     </div>
            //     <div id="usersContainer">
            //         <p id="containerTitle">Users</p>
            //         {users.map((user, index) => <p id="users" key={index}>{user.fname}</p> )}
            //     </div>
            //     <div>
            //         <Button variant="outline-info" size="lg" onClick={this.fetchLog}>Get Log</Button>
            //     </div>
            // </div>
            <div id="adminHomeRoot">
                <div id="adminTabs">
                <Tab.Container defaultActiveKey="issueTab">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="issueTab">Issues</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="customerTab">Customers</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="freelancerTab">Freelancers</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="organizationTab">Organizations</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="issueTab" id="issuesContainer">
                                    {/* {issues.map((issue, index) => <p id="element" key={index}>{issue.complaintName}</p> )} */}
                                    {issues.map((issue, index) => <CardX header={issue.complaintName} content={issue} parent={this} key={index} /> )}
                                </Tab.Pane>
                                <Tab.Pane eventKey="customerTab" id="usersContainer">
                                    {/* {users.map((user, index) => <p id="element" key={index}>{user.fname}</p> )} */}
                                    {users.map((user, index) => <CardX header={user.fname} content={user} parent={this} key={index} /> )}
                                </Tab.Pane>
                                <Tab.Pane eventKey="freelancerTab" id="freelanContainer">
                                    {/* {freelancers.map((freelancer, index) => <p id="element" key={index}>{freelancer.fname}</p> )} */}
                                    {freelancers.map((freelancer, index) => <CardX header={freelancer.fname} content={freelancer} parent={this} key={index} /> )}
                                </Tab.Pane>
                                <Tab.Pane eventKey="organizationTab" id="orgContainer">
                                    {/* {organizations.map((organization, index) => <p id="element" key={index}>{organization.name}</p> )} */}
                                    {organizations.map((organization, index) => <CardX header={organization.name} content={organization} parent={this} key={index} /> )}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                </div>
                <div>
                    <Button id="btnLog" variant="outline-info" size="lg" onClick={this.fetchLog}>Generate Log</Button>
                </div>
            </div>
        );
    }
}

export default AdminHome;