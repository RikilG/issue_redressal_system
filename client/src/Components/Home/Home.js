import React, { Component } from "react";
import "./Home.css";
import FormLogin from "../Login/FormLogin";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSection: null,
      users: 1,
      organizations: 2,
      freelancers: 3,
      issues: 4,
      usersEnd: 574,
      organizationsEnd: 27,
      freelancersEnd: 263,
      issuesEnd: 498
    };
    // this.counter = this.counter.bind(this);
    // this.count = this.count.bind(this);
  }

  componentDidMount() {
    this.count();
    this.setState({ loginSection: (this.props.signinStatus)?null:<FormLogin setView={this.props.setView} setSigninStatus={this.props.setSigninStatus} setAdmin={this.props.setAdmin} setOmbudsman={this.props.setOmbudsman} setCustomer={this.props.setCustomer} /> });
  }

  counter = () => {
    if (this.state.users < this.state.usersEnd) {
      this.setState({ users: this.state.users + 10 });
    }
    if (this.state.organizations < this.state.organizationsEnd) {
      this.setState({ organizations: this.state.organizations + 1 });
    }
    if (this.state.freelancers < this.state.freelancersEnd) {
      this.setState({ freelancers: this.state.freelancers + 6 });
    }
    if (this.state.issues < this.state.issuesEnd) {
      this.setState({ issues: this.state.issues + 10 });
    }
  };

  count() {
    setInterval(() => { this.counter() }, 30);
  }

  render() {
    //let loginSection = (this.props.signinStatus)?null:<FormLogin setView={this.props.setView} setSigninStatus={this.props.setSigninStatus} />;
    let { users,organizations,freelancers,issues } = this.state;

    return (
        <div id="home">
            <div id="headerPanel">
                <h1>Issue Redressal System</h1>
            </div>
            <div id="infoLoginPanel" >
                <div id="infoSection" >Generally it is observed in case of Metropolitan cities, where the citizens are not so much acquainted with the service providers in their locality because of the non-permanent nature of their jobs, they find it difficult to contact service providers to address their  problems like improper water supply, bad sanitation and electricity failures.<br />
                    Welcome to a one-stop portal where the you can fix your issues by contacting freelancing electricians, plumbers, etc to serve your needs.Have a Problem? why wait?Login and lodge a complaint to avail the service. We will monitor the status of the grievance until its fixation.</div>
                <span id="loginSection">{this.state.loginSection}</span>
            </div>
            <div id="statisicsPanel">
                <span id="usersCount">
                    <h2>{users}</h2>
                    <h3>Total Users</h3>
                </span>
                <span id="organizationsCount">
                    <h2>{organizations}</h2>
                    <h3>Organizations</h3>
                </span>
                <span id="freelancersCount">
                    <h2>{freelancers}</h2>
                    <h3>FreeLancers</h3>
                </span>
                <span id="issuesCount">
                    <h2>{issues}</h2>
                    <h3>Issues</h3>
                </span>
            </div>
        </div>
    );
  }
}

export default Home;
