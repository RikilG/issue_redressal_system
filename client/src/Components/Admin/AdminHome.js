import React, { Component } from "react";
import { Button, Tab, Row, Col, Nav } from "react-bootstrap";
import "./AdminHome.css";
import Customer from "../../Classes/Customer";
import Issue from "../../Classes/Issue";
import Freelancer from "../../Classes/Freelancer";
import Organization from "../../Classes/Organization";
import CardX from "../../Classes/CardX/CardX";
import loadingIcon from '../../Assets/loading.gif';
import restartIcon from '../../Assets/restart.png';

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      users: [],
      freelancers: [],
      organizations: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch("/admin", {
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
        let allCustomers = data.allCus.map((customer, index) => {
          return new Customer(customer);
        });
        let allFreelancers = data.allFreelan.map((freelancer, index) => {
          return new Freelancer(freelancer);
        });
        let allOrganizations = data.allOrgs.map((organization, index) => {
          return new Organization(organization);
        });
        this.setState({
          issuesDisplay: allIssues.map((issue, index) => <CardX header={issue.complaintName} content={issue} parent={this} isAdmin={true} key={index} />),
          usersDisplay: allCustomers.map((user, index) => <CardX header={user.fname} content={user} parent={this} isAdmin={true} key={index} />),
          freelancerDisplay: allFreelancers.map((freelancer, index) => <CardX header={freelancer.fname} content={freelancer} parent={this} isAdmin={true} key={index} />),
          organizationDisplay: allOrganizations.map((organization, index) => <CardX header={organization.name} content={organization} parent={this} isAdmin={true} key={index} />),
        });
      })
      .then( () => {
        this.setState({ loading: false });
      });
  }

  fetchLog = () => {
    // window.open('http://localhost:5000/logs',"_blank");
    fetch("/logs")
      .then(res => res.text())
      .then(text => {
        //   THIS IS TO GET LOG IN NEW TAB PAGE.
        var logWindow = window.open("", "_blank");
        logWindow.document.write("<pre>" + text + "</pre>");
      });
  };

  refershHandler = () => this.componentDidMount();

  render() {
    let { issuesDisplay, usersDisplay, freelancerDisplay, organizationDisplay, loading } = this.state;

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
              <Col sm={2}>
                <h2>Category</h2><hr />
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
                <div id="adminStatistics">
                  <h2>Statistics</h2><hr />
                  <div className="controls"><div className="control small" onClick={this.refershHandler}><img className="action" src={restartIcon} alt="Reload" />Reload Data</div></div>
                </div>
              </Col>
              <div className="vr" xs></div>
              <Col sm={9} lg>
                <Tab.Content>
                  <Tab.Pane eventKey="issueTab" id="issuesContainer">
                    <h2>Posted Issues</h2><hr />
                    {(loading)?<img className="loadingIcon" src={loadingIcon} alt='Loading...' />:issuesDisplay}
                  </Tab.Pane>
                  <Tab.Pane eventKey="customerTab" id="usersContainer">
                    <h2>Registered Customers</h2><hr />
                    {(loading)?<img className="loadingIcon" src={loadingIcon} alt='Loading...' />:usersDisplay}
                  </Tab.Pane>
                  <Tab.Pane eventKey="freelancerTab" id="freelanContainer">
                    <h2>Registered Freelancers</h2><hr />
                    {(loading)?<img className="loadingIcon" src={loadingIcon} alt='Loading...' />:freelancerDisplay}
                  </Tab.Pane>
                  <Tab.Pane eventKey="organizationTab" id="orgContainer">
                    <h2>Registered Organizations</h2><hr />
                    {(loading)?<img className="loadingIcon" src={loadingIcon} alt='Loading...' />:organizationDisplay}
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
