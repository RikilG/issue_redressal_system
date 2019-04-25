import React, { Component } from 'react';
import { Tab, Row, Col, Nav } from "react-bootstrap";
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
            modalData: {head:"Unavailable", body:"Data Unavailable", issue:"No Data", isSelected:true},
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
            {/* <h2 id="spFeedHeading">Selected Issues</h2> */}
            {acceptedIssues}
            </React.Fragment>
        )

        return (
            <React.Fragment>
            {/* <h2 id="spFeedHeading">Available Issues</h2> */}
            <div style={{padding: "0.2vh 2vw"}}>
                <br />
                <Tab.Container defaultActiveKey="acceptedTab">
                    <Row>
                    <Col sm={2}>
                        <h2>Category</h2><hr />
                        <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="issueTab">Issues nearby</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="acceptedTab">Selected Issues</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="customerTab">All Issues</Nav.Link>
                        </Nav.Item>
                        </Nav>
                        {/* <div id="adminStatistics">
                        <h2>Controls</h2><hr />
                        <div className="controls">
                            <div className="control small" onClick={this.refershHandler}><img className="action" src={restartIcon} alt="Reload" />
                            Reload Data
                        </div></div>
                        <FormControl className="searchbar" type="text" placeholder="Search" onChange={this.searchinput} />
                        <Button id="btnDashboard" variant="outline-info" size="lg" onClick={this.dashboardHandler}>Dashboard</Button>
                        <Button id="btnLog" variant="outline-info" size="lg" onClick={this.fetchLog}>Site Log</Button>
                        </div> */}
                    </Col>
                    <div className="vr" xs="true"></div>
                    <Col sm={9} lg>
                        <Tab.Content>
                        <Tab.Pane eventKey="issueTab" className="container">
                            <h2>Issues Near Me</h2><hr />
                            <div id="spFeedRoot">
                                {(loading) ? <img className="loadingIcon" src={loadingIcon} alt='Loading...' /> : issues}
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="acceptedTab" className="container">
                            <h2>Selected Issues</h2><hr />
                            <div id="spFeedRoot">
                                {(acceptedIssues.length !== 0) ? 
                                    ai : (loading) ?
                                        <img className="loadingIcon" src={loadingIcon} alt='Loading...' /> : <h3>In need of work?<br />checkout issues in your locality!</h3>}
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="customerTab" className="container">
                            <h2>All Issues</h2><hr />
                            <div id="spFeedRoot">
                                {(loading) ? <img className="loadingIcon" src={loadingIcon} alt='Loading...' /> : issues}
                            </div>
                        </Tab.Pane>
                        </Tab.Content>
                    </Col>
                    </Row>
                </Tab.Container>
            </div>
            <ModalMiddle show={this.state.modalShow} onHide={this.handleClose} accept={this.handleAcceptIssue} content={this.state.modalData} />
            </React.Fragment>
        );
    }
}

export default SPFeed;