import React, { Component } from 'react';
import './ComCard.css';
import '../Issue';


class ComCard extends Component {
    constructor(props) {
        super(props);
        let cont;

        if (this.props.content.className === 'Issue') {
            cont = (
                <div className='cardxContent' >
                    <table className="detailsTable"><tbody>
                        <tr><th> Description:   </th><td> {this.props.content.description}</td></tr>
                        <tr><th> WorkNature:    </th><td> {this.props.content.workNature}</td></tr>
                        <tr><th> Status:        </th><td> {this.props.content.status}</td></tr>
                    </tbody></table>
                </div>
            )
        }
        else {
            cont = (
                <div className='cardxContent' >
                    Unable to resolve classname. Check site console for details and contact site admin.
                </div>
            )
            console.log('unresolved class name: ' + this.props.content.className);
            console.log(this.props.content);
        }

        this.state = {
            content: cont,
            upvote: 0,
            downvote: 0,
        };
    }
    componentDidMount() {
        fetch("/comcard2", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                issueid: this.props.issueid
            })
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ downvote: data.nod });
                this.setState({ upvote: data.nou });
            })
    }
    handleUpvote = input => {
        fetch("/comcard", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                issueid: this.props.issueid,
                email: this.props.email,
                type: 'upvote'
            })
        })
            .then(res => res.json())          // convert to plain text
            .then(data => {
                if (!data.errorStatus) {
                    //page reload
                    this.props.parent.componentDidMount();
                }
            });
    }

    handleDownvote = input => {
        fetch("/comcard", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                issueid: this.props.issueid,
                email: this.props.email,
                type: 'downvote'
            })
        })
            .then(res => res.json())          // convert to plain text
            .then(data => {
                if (!data.errorStatus) {
                    this.props.parent.componentDidMount();
                }
            });
    }

    render() {
        let { upvote, downvote, /*uStatus, dStatus*/ } = this.state;
        return (
            <div className="cardxRoot">
                <div className="cardxHeader" >
                    {this.props.header}

                </div>
                <div className="cardxBody">
                    {this.state.content}
                    {
                        <span id="comControls">
                            <div className="control" onClick={this.handleUpvote}>
                                {<img className="action" src={"https://static.thenounproject.com/png/344539-200.png"} alt='govt' />}
                                {upvote}
                            </div>
                            <div className="control" onClick={this.handleDownvote}>
                                {<img className="action" src={"https://static.thenounproject.com/png/781493-200.png"} alt='govt' />}
                                {downvote}
                            </div>
                        </span>
                    }

                </div>
            </div>
        );
    }
}

export default ComCard;