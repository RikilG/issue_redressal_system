import React, { Component } from 'react';
import govtIcon from '../../Assets/govt.png';
import '../CardX/CardX.css';
import '../Issue';

class CardX extends Component {
    constructor(props) {
        super(props);
        let cont;
        
        if(this.props.content.className === 'Issue') {
            cont = (
                <div className='cardxContent' >
                    Complaint Name: {this.props.content.complaintName}<br/>
                    Description:  <br/> {this.props.content.description}<br/>
                    Pay: {this.props.content.pay}<br/>
                    Type: {this.props.content.type}<br/>
                    WorkNature: {this.props.content.workNature}<br/>
                    Status: {this.props.content.status}<br/>
                </div>
            )
        }
        else {
            cont = (
                <div className='cardxContent' >
                    Unable to resolve classname. Check site console for details and contact site admin.
                </div>
            )
            console.log('unresolved class name: '+this.props.content.className);
            console.log(this.props.content);
        }

        this.state = {
            showBody: false,
            content: cont
        };
    }

    toggleBody = () => { this.setState({ showBody: !this.state.showBody }); }

    redToGovt = () => {
        fetch('/redirectGovt', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.props.content.id,
            })
        }).then(res => res.json())
        .then(data => {
            if(!data.errorStatus) {
                //page reload
                this.props.parent.componentDidMount();
            }
        });
    }

    render() {
        return (
            <div className="cardxRoot">
                <div className="cardxHeader" onClick={this.toggleBody} >
                    {this.props.header}
                    {this.state.showBody && this.props.myIssues && !(this.props.content.type==="Government") && (
                        <span id="controls">
                            <div className="control" onClick={this.redToGovt}>
                                <img className="action" src={govtIcon} alt='govt' />
                                Redirect to Govt
                            </div>
                        </span>
                    )}
                </div>
                {this.state.showBody && (
                    <div className="cardxBody" onClick={this.toggleBody} >
                        {this.state.content}
                    </div>
                )}
            </div>
        );
    }
}

export default CardX;