import React, { Component } from 'react';
import './SPFeed.css';
import Issue from '../../Classes/Issue';
import loadingIcon from '../../Assets/loading.gif';
import SPCard from '../../Classes/CardX/SPCard';
import ModalMiddle from '../../Classes/Modals/ModalMiddle';

class SPFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            acceptedIssues: [],
            loading: false,
            modalShow: false,
            modalData: {head:"Unavailable", body:"Data Unavailable", issue:"No Data"},
        }
    }

    componentDidMount() {
        //fetch issue details from backend
        this.setState({ loading: true });
        fetch('/spfeed', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.props.email
            })
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    issues: data.allIss.map((issue, index) => { return <div className="cardWrapper" key={index}><SPCard header={issue.complaintName} content={new Issue(issue)} parent={this} key={index} myIssues={true} /></div>; }),
                    acceptedIssues: data.acptdIss.map((issue, index) => { return <div className="cardWrapper" key={index}><SPCard header={issue.complaintName} content={new Issue(issue)} parent={this} key={index} myIssues={true} /></div>; }),
                });
            }).then( () => {
                this.setState({ loading:false });
            });
    }

    handleClose = () => {this.setState({ modalShow: false });}
    handleOpen = (data) => {this.setState({ modalShow: true, modalData: data });}
    handleAcceptIssue = () => {
        if(window.confirm("Do you want to accept this issue?")) {
            //issue accepted.
            fetch('/acceptIssue', {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.props.email,
                    id: this.state.modalData.issue.id
                })
            }).then(res => res.json())
            .then(data => {
                if (!data.errorStatus) {
                    window.alert("Issue taken up Successfully");
                    this.componentDidMount();
                }
            });
        }
        this.handleClose();
    }

    render() {
        let { issues, acceptedIssues, loading } = this.state;

        let ai = (
            <React.Fragment>
            <h2 id="spFeedHeading">Selected Issues</h2>
            <div id="spFeedRoot">
                {acceptedIssues}
            </div>
            </React.Fragment>
        )

        return (
            <React.Fragment>
            {(acceptedIssues.length!=0)?ai:null}
            <h2 id="spFeedHeading">Available Issues</h2>
            <div id="spFeedRoot">
                {(loading) ? <img className="loadingIcon" src={loadingIcon} alt='Loading...' /> : issues}
            </div>
            <ModalMiddle show={this.state.modalShow} onHide={this.handleClose} accept={this.handleAcceptIssue} content={this.state.modalData} />
            </React.Fragment>
        );
    }
}

export default SPFeed;