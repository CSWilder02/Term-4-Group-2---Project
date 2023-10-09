import React from 'react';


    const CommentCard = ({ commentText, timestamp }) => {

        
        return (
          <div className="comment-card">
            <div className="comment-content">{commentText}</div>
            <div className="comment-timestamp">{timestamp}</div>
          </div>
        );
      };

export default CommentCard;
