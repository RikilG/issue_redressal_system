import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import profileIcon from '../../Assets/user.png';
import './TopBar.css';

class TopBar extends Component {

  handleLoginLink     = () => { this.props.setView("Login"); };
  handleRegisterLink  = () => { this.props.setView("Register"); };
  handleDetailsLink   = () => { this.props.setView("PostIssue"); };
  handleProfileLink   = () => { this.props.setView("Profile"); };
  handleFeedLink      = () => { this.props.setView("Feed"); };

  handleHomeLink      = () => {
    if(this.props.isAdmin)
      this.props.setView("AdminHome");
    else if(this.props.isOmbudsman)
      this.props.setView("OmbudsmanHome");
    else
      this.props.setView("Home")
  };

  handleLogoutLink = () => {
    this.props.setSigninStatus(false,"");
    this.props.setView("Login");
  };

  handleOmbudsmanPosts = () => {
    this.props.setCompletedIssues(!this.props.completedIssues);
  }

  render() {
    let loginLink, logoutLink, registerLink;
    if (this.props.signinStatus) {
      logoutLink = (
        <NavDropdown title={
          <span className="pull-right dropdown-menu-right">
            {/* {user.username} */}
            Welcome User
            <img className="thumbnail-image" src={profileIcon} alt="Account" style={{ height: "1.6em", width: "1.6em", marginLeft: "0.5em" }} />
          </span>
          } id="collasible-nav-dropdown">
           <NavDropdown.Item href="#profile" onSelect={this.handleProfileLink}> 
             Profile
           </NavDropdown.Item>
           <NavDropdown.Divider />
           <NavDropdown.Item href="#home" onSelect={this.handleLogoutLink}>
             Logout
           </NavDropdown.Item>
        </NavDropdown>
      );
    }
    else {
      loginLink = (
        <Nav.Link href="#login" onSelect={this.handleLoginLink}>
          Login
        </Nav.Link>
      );
      registerLink = (
        <Nav.Link eventKey={2} href="#register" onSelect={this.handleRegisterLink} >
          Register
        </Nav.Link>
      );
    }

    return (
      <Navbar collapseOnSelect expand="lg" /*bg="dark"*/ variant="dark" sticky="top" id="navbar" >
        <Navbar.Brand href="#home" onClick={this.handleHomeLink}>
          Issue Redressal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home" onSelect={this.handleHomeLink}>
              Home
            </Nav.Link>
            {/* add features and pricing here */}
            {(this.props.signinStatus && this.props.isCustomer)?
            <React.Fragment>
            <Nav.Link href="#feed" onSelect={this.handleFeedLink}>Feed</Nav.Link>
            <Nav.Link href="#postIssue" onSelect={this.handleDetailsLink}>Post Issue</Nav.Link>
            </React.Fragment>
            :null}
            {(this.props.isOmbudsman)?
            <Nav.Link href="#prevPosts" onSelect={this.handleOmbudsmanPosts} >Completed Issues</Nav.Link>
            :null}
          </Nav>
          <Nav>
            {registerLink}
            {loginLink}
            {logoutLink}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default TopBar;
