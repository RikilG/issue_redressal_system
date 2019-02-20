import React, { Component } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class TopBar extends Component {

  handleLoginLink = () => {
    this.props.setView("Login");
  }

  handleRegisterLink = () => {
    this.props.setView("Register");
  }

  handleHomeLink = () => {
    this.props.setView("Home");
  }

  render() {
      return(
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
              <Navbar.Brand href="#home" onClick={this.handleHomeLink} >Issue Redressal</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Nav>
                    <Nav.Link href="#login" onSelect={this.handleLoginLink} >Login</Nav.Link>
                    <Nav.Link eventKey={2} href="#register" onSelect={this.handleRegisterLink} >Register</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
      );
  }
}

export default TopBar;