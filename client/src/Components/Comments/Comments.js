import React , { Component} from 'react';
import './Comments.css';
// import CommentForm from './CommentForm';

class Comments extends Component {

    
    render() {
        const { name, message, time } = this.props.comment;
        let msDay = 60*60*1000;
        
        return (
            
            <div >
                <div className="commentSection1">
                    <img className="adorableimage" width="48" height="48"
                        src={`https://api.adorable.io/avatars/48/${name.toLowerCase()}@adorable.io.png`} alt={name}
                    />
                    <div className="messageClass">
                            <small className="float-right text-muted">{Math.floor((new Date()- Date.parse(time))/msDay)} hours ago</small> 
                            <h6 className="mt-0 mb-1 text-muted">{name}</h6> 
                            <div className="mt-0 mb-1 text-muted">{message}</div>
                    </div>  
                </div>
                {/* <CommentForm addComment={this.props.addComment} /> */}
            </div>
        );
        
    }
    
}

export default Comments;