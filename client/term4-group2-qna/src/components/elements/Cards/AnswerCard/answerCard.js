import React, { useState } from "react";

export const AnswerCard = ({ answer, onReplySubmit }) => {
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (replyText.trim() !== "") {
      onReplySubmit(answer._id, replyText); // Pass the answer ID and reply text to the parent component
      setReplyText(""); // Clear the input field
    }
  };

  const ReplyCard = ({ reply }) => {
    return (
      <div className="reply-card">
        <div className="reply-content">
          <p>{reply.text}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="answerCardWrap">
      <div className="answer-card">
        {answer ? ( // Check if answer is defined
          <div>
            <div className="answer-content">
              <p>{answer.text}</p>
            </div>
            <div className="replies">
              {answer.replies && answer.replies.length > 0 ? (
                answer.replies.map((reply) => (
                  <ReplyCard key={reply._id} reply={reply} />
                ))
              ) : (
                <p>No replies available</p>
              )}
            </div>
            <div className="reply-input">
              <input
                type="text"
                placeholder="Add a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button onClick={handleReplySubmit}>Reply</button>
            </div>
          </div>
        ) : (
          <p>No answer available</p>
        )}
      </div>
    </div>
  );
};
