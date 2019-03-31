import React, { Component } from 'react';
import './Feed.css';
import Issue from '../../Classes/Issue';
import CardXFeed from '../../Classes/CardXFeed/CardXFeed';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: []
        }
    }

    componentDidMount() {
        //fetch issue details from backend
        fetch('/feed', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.props.email
            })
        }).then(res => res.json())
        .then(data => {
            let allIssues = data.map((issue, index) => { return new Issue(issue); });
            this.setState({ issues: allIssues, });
        });
    }

    render() {
        let { issues } = this.state;

        return (
            <div id="feedRoot">
                <h1 id="myFeed"> My Feed </h1>
                <br/> 
                {issues.map((issue, index) => <CardXFeed header={issue.complaintName} content={issue} parent={this} key={index} /> )}
                <br/> 
                <h1 id="myFeed"> Community Feed</h1>
                <br/>
                <div class="panel panel-default" id="panelMain">
                <div class="panel panel-default" id="panel">
                    <div class="panel-heading">
                    <h1 class="panel-title">Daily Feed</h1>
                    </div>
                    <div class="panel-body">
                    {issues.map((issue, index) => <CardXFeed header={issue.complaintName} content={issue} parent={this} key={index} /> )}
                    </div>
                </div>
                <div class="panel panel-default" id="panel">
                    <div class="panel-heading">
                    <h1 class="panel-title">Important Noted Feed</h1>
                    </div>
                    <div class="panel-body">Panel content…</div>
                </div>
                
                </div>
               


            </div>
        );
    }
}

export default Feed;