import React, { Component } from 'react';
import deleteIcon from '../../Assets/delete.png';
import './CardX.css';
import '../Customer';
import '../Freelancer';
import '../Issue';
import '../Organization';

class CardX extends Component {
    constructor(props) {
        super(props);
        let cont;
        
        if(this.props.content.className === 'Issue') {
            cont = (
                <div className='cardxContent' >
                    Complaint Name: {this.props.content.complaintName}<br/>
                    Email: {this.props.content.email}<br/>
                    Pay: {this.props.content.pay}<br/>
                    Type: {this.props.content.type}<br/>
                    WorkNature: {this.props.content.workNature}<br/>
                    Description: {this.props.content.description}<br/>
                </div>
            )
        }
        else if(this.props.content.className === 'Customer') {
            cont = (
                <div className='cardxContent' >
                    First Name: {this.props.content.fname}<br/>
                    Last Name: {this.props.content.lname}<br/>
                    Email: {this.props.content.email}<br/>
                    Password: {this.props.content.password}<br/>
                    Address: {this.props.content.address}<br/>
                    City: {this.props.content.city}<br/>
                    State: {this.props.content.state}<br/>
                    Pincode: {this.props.content.pincode}<br/>
                    Mobile: {this.props.content.mobile}<br/>
                    Aadhaar: {this.props.content.aadhaar}<br/>
                </div>
            )
        }
        else if(this.props.content.className === 'Freelancer') {
            cont = (
                <div className='cardxContent' >
                    First Name: {this.props.content.fname}<br/>
                    Last Namename: {this.props.content.lname}<br/>
                    Email: {this.props.content.email}<br/>
                    Password: {this.props.content.password}<br/>
                    Address: {this.props.content.address}<br/>
                    City: {this.props.content.city}<br/>
                    State: {this.props.content.state}<br/>
                    Mobile: {this.props.content.mobile}<br/>
                    Aadhaar: {this.props.content.aadhaar}<br/>
                    Pincode: {this.props.content.pincode}<br/>
                </div>
            )
        }
        else if(this.props.content.className === 'Organization') {
            cont = (
                <div className='cardxContent' >
                    Name: {this.props.content.name}<br/>
                    Email: {this.props.content.email}<br/>
                    Password: {this.props.content.password}<br/>
                    Headquaters: {this.props.content.headquaters}<br/>
                    Mobile: {this.props.content.mobile}<br/>
                    Workforce: {this.props.content.workforce}<br/>
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
    deleteItemHandler = () => {
        if(window.confirm("This operation is not reversible. Do you want to continue?")) {
            fetch('/adminDelete', {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    documentName: this.props.content.className,
                    id: this.props.content.id
                })
            }).then(res => res.json())
            .then(data => {
                if(!data.errorStatus) {
                    //page reload
                    this.props.parent.componentDidMount();
                }
            });
        }
    }

    render() {
        return (
            <div className="cardxRoot">
                <div className="cardxHeader" onClick={this.toggleBody} >
                    {this.props.header}
                    {this.state.showBody && (
                        <div id="controls">
                            <img src={deleteIcon} alt='delete' onClick={this.deleteItemHandler} />
                        </div>
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