import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import './index.css';
import TopBar from './Components/NavBar/TopBar';
import Home from './Components/Home/Home';
import Feed from './Components/Feed/Feed';
import FormLogin from './Components/Login/FormLogin';
import AdminHome from './Components/Admin/AdminHome';
import OmbudsmanHome from './Components/Ombudsman/OmbudsmanHome';
import FillDetails from './Components/IssueDetails/FillDetails';
import FormRegister from './Components/Register/FormRegister';
import ServiceProvider from './Components/Register/ServiceProvider';
import Profile from './Components/Profile/ProfilePage';
// import Footer from './Components/Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "Home",
      signinStatus: false,
      isAdmin: false,
      isOmbudsman: false,
      completedIssues: false,
      email: ""
    };
  }

  setView = (viewName) => {
    this.setState({ currentView: viewName });
    this.forceUpdate();
  }

  setSigninStatus = (boolValue,userEmail) => {
    if(boolValue === false) {
      this.setState({ isAdmin: false, isOmbudsman: false });
    }
    this.setState({ signinStatus: boolValue, email: userEmail });
  }
  setAdmin = (boolValue) => this.setState({ isAdmin: boolValue });
  setCompletedIssues = (boolValue) => this.setState({ completedIssues: boolValue });
  setOmbudsman = (boolValue) => this.setState({ isOmbudsman: boolValue });

  render() {
    let view;
    let currentView = this.state.currentView;
    switch(currentView) {
      case "Register" : view = <FormRegister setView={this.setView} />;break;
      case "Profile"  : view = <Profile />;break;
      case "Login"    : view = <FormLogin setView={this.setView} setSigninStatus={this.setSigninStatus} setAdmin={this.setAdmin} setOmbudsman={this.setOmbudsman} />;break;
      case "Home"     : view = <Home setView={this.setView} signinStatus={this.state.signinStatus} setSigninStatus={this.setSigninStatus} setAdmin={this.setAdmin} setOmbudsman={this.setOmbudsman} />;break;
      case "Feed"     : view = <Feed setView={this.setView} email={this.state.email} />;break;
      case "FillDetails":view =<FillDetails email={this.state.email} setView={this.setView} />;break;
      case "AdminHome": view = <AdminHome email={this.state.email} />;break;
      case "OmbudsmanHome":view = <OmbudsmanHome email={this.state.email} setView={this.setView} completedIssues={this.state.completedIssues} />;break;
      case "ServiceProviderReg":view=<ServiceProvider setView={this.setView} />;break;
      default         : alert("No Page To Load (case:default:App.js)");
    }

    return (
      <div className="App">
        <TopBar setView={this.setView} signinStatus={this.state.signinStatus} setSigninStatus={this.setSigninStatus} isAdmin={this.state.isAdmin} isOmbudsman={this.state.isOmbudsman} setCompletedIssues={this.setCompletedIssues} completedIssues={this.state.completedIssues} />
        {view}
        {/* <footer id="footer"><Footer /></footer> */}
      </div>
    );
  }
}

export default App;
