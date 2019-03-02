import React, { Component } from 'react';
import './Feed.css';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            issues: []
        }
    }

    componentDidMount() {
        //fetch issue details from backend
        fetch('/feed', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email
            })
        }).then(res => res.json())
        .then(data => {
            this.setState({ issues: data.issues });
        });
    }

    render() {
        let { issues } = this.state;

        return (
            <div id="feedRoot">
                {issues.map((issue, index) =>
                    <p id="issues" key={index}>
                    {issue.compliantName}
                    </p>
                )}
            </div>
        );
    }
}

export default Feed;