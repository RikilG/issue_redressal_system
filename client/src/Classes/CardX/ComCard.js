import React, { Component } from 'react';
import './ComCard.css';
import '../Issue';


class ComCard extends Component {
    constructor(props) {
        super(props);
        let cont;
        
        if(this.props.content.className === 'Issue') {
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
            console.log('unresolved class name: '+this.props.content.className);
            console.log(this.props.content);
        }

        this.state = {
            content: cont
        };
    }

    render() {
        return (
            <div className="cardxRoot">
                <div className="cardxHeader" >
                    {this.props.header}
                   
                </div>
                <div className="cardxBody">
                    {this.state.content} 
                    {
                        <span id="comControls">
                            <div className="control" onClick={null}>
                                {/* uncomment img tage and get suitable icon */}
                                {/* <img className="action" src={govtIcon} alt='govt' /> */}
                                Upvote
                            </div>
                            <div className="control" onClick={null}>
                                {/* uncomment img tage and get suitable icon */}
                                {/* <img className="action" src={govtIcon} alt='govt' /> */}
                                Downvote
                            </div>
                        </span>
                    } 
                  
                </div>
            </div>
        );
    }
}

export default ComCard;