import React, { Component } from 'react';
import './Feed.css';
import Issue from '../../Classes/Issue';
import CardXFeed from '../../Classes/CardX/CardXFeed';
import ComCard from '../../Classes/CardX/ComCard';
import loadingIcon from '../../Assets/loading.gif';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      comIssues: [],
      loading: false
    }
  }

  componentDidMount() {
    //fetch issue details from backend
    this.setState({ loading: true });
    fetch('/feed', {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.props.email
      })
    }).then(res => res.json())
      .then(data => {
        this.setState({
          issues: data.myIssues.map((issue, index) => { return <CardXFeed header={issue.complaintName} content={new Issue(issue)} parent={this} key={index} myIssues={true} setView={this.props.setView} storeData={this.props.storeData} />; }),
          comIssues: data.comIssues.map((issue, index) => { return <ComCard header={issue.complaintName} content={new Issue(issue)} parent={this} key={index} email={this.props.email} issueid={issue._id} />; })
        });
      }).then(() => {
        this.setState({ loading: false });
      });
  };


  render() {
    let { issues, comIssues, loading } = this.state;

    return (
      <div id="feedRoot">
        <h1 id="myFeed"> My Feed </h1> <br />
        {(loading) ? <img className="loadingIcon" src={loadingIcon} alt='Loading...' /> : issues}
        <br />
        <h1 id="myFeed"> Community Feed</h1>
        <br />
        <div className="panel panel-default" id="panelMain">
          <div className="panel panel-default" id="panel">
            <div className="panel-heading">
              <h1 className="panel-title">Daily Feed</h1>
            </div>
            <div className="panel-body">
              {(loading) ? <img className="loadingIcon" src={loadingIcon} alt='Loading...' /> : comIssues}
            </div>
          </div>
          <div className="vr"></div>
          <div className="panel panel-default" id="panel">
            <div className="panel-heading">
              <h1 className="panel-title"> Trendy Issues</h1>
            </div>
            <div className="panel-body"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
