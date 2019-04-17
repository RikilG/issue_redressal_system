import React , { Component} from 'react';
import './Comments.css';
// import CommentForm from './CommentForm';

class Comments extends Component {

    render() {
        const { name, message, time } = this.props.comment;
        return (
            <div >
                <div >
                    <div className="commentSection">
                        <img className="adorableimage" width="48" height="48"
                            src={`https://api.adorable.io/avatars/48/${name.toLowerCase()}@adorable.io.png`} alt={name}
                        />
                        <div className="messageClass">
                             <small className="float-right text-muted">{time}</small> 
                             <h6 className="mt-0 mb-1 text-muted">{name}</h6> 
                             {message}
                        </div>  
                    </div>
                        {/* <CommentForm addComment={this.props.addComment} /> */}
                </div>
            </div>
        );
    }
    
}

export default Comments;