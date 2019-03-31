import React, { Component } from 'react';
import './CardXFeed.css';
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
                    Email: {this.props.content.email}<br/>
                    Pay: {this.props.content.pay}<br/>
                    Type: {this.props.content.type}<br/>
                    WorkNature: {this.props.content.workNature}<br/>
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

    render() {
        return (
            <div className="cardxRoot">
                <div className="cardxHeader" onClick={this.toggleBody} >
                    {this.props.header}
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