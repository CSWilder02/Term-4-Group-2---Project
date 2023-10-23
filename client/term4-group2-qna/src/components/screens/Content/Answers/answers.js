import React, { useState, useEffect } from "react";
import "./answers.css";
import { Container, Card, Form, Button, Dropdown } from "react-bootstrap";

// import from "./";

export const Answers = ({ user, users, questions, answers, replies, topics }) => {
  const Male = ""

  const [isCommentInputVisible, setIsCommentInputVisible] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleCommentBtn = () => {
    setIsCommentInputVisible(!isCommentInputVisible);
  };

  const options = [
    { label: "Top", value: "top" },

    { label: "Newest", value: "newest" },

    { label: "Oldest", value: "oldest" },
  ];



  return (
    <div className="Comment">
      <div className="question-box">
        <div className="comment-header">
          <div className="user-header">
            <img
              style={{ width: "35px", float: "left", marginLeft: "10px" }}
              src={Male}
            ></img>
          </div>
          <div className="user-header-title">
            <p>/Second Year/ DV201</p>
          </div>
        </div>

        <div className="comment-main-question">
          <p>
            My Google Analytics is displaying that my user engagement keeps
            bouncing around and fluctuating. Does anyone know how I can fix
            this?
          </p>
        </div>
        <div className="comment-main-img">
          <img
            style={{ width: "712px", marginLeft: "14px", marginRight: "14px" }}
            src="https://s3-alpha-sig.figma.com/img/d196/262f/8dac8b7d50eec53791831876eaf4c351?Expires=1698019200&Signature=jxc0hDu03Zf6V75uHSNZbZjgtMQLLvEg5L23Zi-CufXn6t8ovuxgyztexN2wirF6rSAfwPK~H91uurtt-fpyceB4p5Ki6lF4gN95XRpZTkyCvPpwTbqPt~wcA4yANeUFM0zg0yXiH2qVQPCBBU4uhaoD~ZoX5EE9TmrxXgNTW9jOg91Q3DiHwkq1xaarmIEdMjKjGtz3w-G~JN4SHo0~jBJo31BsHxR2~~riqh2JvsDcTO9f4Bspmf0DEeazrh~-Qq4iFABtHw8KhqDKyb5dYbglvB5qjxlye~1WbeguvOMgiuHBZUcAzWE2a1JRDXz1NuBEkx0ZmOGZi357aXkRaQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          ></img>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="704"
          height="2"
          viewBox="0 0 704 2"
          fill="none"
        >
          <path d="M0 1H704.001" stroke="#595B60" stroke-width="0.5" />
        </svg>
        <div className="comment-vote">
          <div className="vote">
            <div className="up-vote">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  stroke="#B7B4AF"
                  stroke-width="2"
                />
                <path
                  d="M12.0012 6.40063V17.6006M12.0012 6.40063L16.8012 11.2006M12.0012 6.40063L7.20117 11.2006"
                  stroke="#B7B4AF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="vote-count">4</div>
            <div className="down-vote">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  transform="rotate(-180 12 12)"
                  stroke="#B7B4AF"
                  stroke-width="2"
                />
                <path
                  d="M11.9988 17.5999L11.9988 6.39985M11.9988 17.5999L7.19883 12.7999M11.9988 17.5999L16.7988 12.7999"
                  stroke="#B7B4AF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="comment-vote-divide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2"
                height="20"
                viewBox="0 0 2 20"
                fill="none"
              >
                <path d="M1 0V19.5" stroke="#595B60" stroke-width="0.5" />
              </svg>
            </div>
            <button className="comment-btn" onClick={() => handleCommentBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M17 0.999756H3C1.89543 0.999756 1 1.89518 1 2.99975V14.5481V18.9998L8.96068 14.781C9.24917 14.6281 9.5707 14.5481 9.8972 14.5481H17C18.1046 14.5481 19 13.6527 19 12.5481V2.99976C19 1.89519 18.1046 0.999756 17 0.999756Z"
                  stroke="#B7B4AF"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <div className="comment-count">1</div>
          </div>
        </div>
        {isCommentInputVisible && (
          <div className="comment-input">
            <input
              type="text"
              placeholder="Write your comment here"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button >Submit</button>
          </div>
        )}
      </div>
      <div className="filter-add-comment">
        <div className="comment-filter">
          <label className="dropdown-filter">
            Sort by:
            <select className="select-box">
              {options.map((option, i) => (
                <option key={i} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>
        {/* <div
          className="add-comment"
          onClick={() => setIsCommentInputVisible(!isCommentInputVisible)}
        >
          <label className="add-comment-label">Add Comment</label>
          {isCommentInputVisible ? (
            <div className="comment-input">
              <input
                type="text"
                placeholder="Write your comment here"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handleCommentSubmit}>Submit</button>
            </div>
          ) : (
            <div className="add-comment-button">
              <svg
                className="add-btn"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path
                  d="M1 5H9"
                  stroke="#F9F5ED"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 1V9"
                  stroke="#F9F5ED"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};
