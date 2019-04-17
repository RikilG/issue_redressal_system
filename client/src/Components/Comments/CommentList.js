import React from "react";
import Comment from "./Comments";
import './Comments.css'

class CommentList extends React.Component {
    
    render() {
        return (
            <div className="commentList">
                <h5 className="text-muted ">
                    <span className="badge badge-success">{this.props.comments.length}</span>{" "}
                    Comment{this.props.comments.length > 0 ? "s" : ""}
                </h5>
                {this.props.comments.length === 0 && !this.props.loading ? (
                    <div className="alert text-center alert-info">
                    Be the first to comment
                    </div>
                ) : null}
                {this.props.comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                ))}
            </div>
        );
      }
}

export default CommentList;