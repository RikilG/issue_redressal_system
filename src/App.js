import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import './index.css';
import TopBar from './Components/TopBar'
import FormLogin from './Components/FormLogin';
import FormRegister from './Components/FormRegister';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentView: "Login" };
  }

  setView = (viewName) => {
    this.setState({ currentView: viewName });
  }

  render() {
    let view;
    let currentView = this.state.currentView;
    if(currentView === "Register") {
      view = <FormRegister />;
    }
    else {
      view = <FormLogin />;
    }

    return (
      <div className="App">
        <TopBar setView={this.setView} />
        {view}
      </div>
    );
  }
}

export default App;
