import React, { useEffect, useState } from "react";
import "./answerCard.css"
import { useUsers } from "../../../util/UseContext/usersContext";
import { AnswerBottomButtons } from "./Interaction/answerBottomInteraction";
import { useInteraction } from "../../../util/UI/interactionListener";

export const AnswerCard = ({ answer, onReplySubmit, index }) => {
  const [replyText, setReplyText] = useState("");
  const [isViewReplies, setIsViewReplies] = useState(false);
  const [isViewResponsSection, setIsViewResponsSection] = useState(false);
  const { users } = useUsers();

  const handleReplySubmit = () => {
    if (replyText.trim() !== "") {
      onReplySubmit(answer._id, replyText); // Pass the answer ID and reply text to the parent component
      setReplyText(""); // Clear the input field
    }
  };

  const findAnswerer = (listOfUsers) => {
    if (answer) {
      for (const user of listOfUsers) {
        if (user?._id === answer?.answerer) {
          return user
        }
      }
    }
  };
  const userWhoAnswered = findAnswerer(users);

  const buttonFeedback = (val) => {
    if (val) {
      val === "respondOn" ? setIsViewResponsSection(true) : val === "respondOff" && setIsViewResponsSection(false)
    }
  }

  useEffect(() => {

  }, [isViewResponsSection, useInteraction()])

  return (
    <div className="answerCardWrap">
      <div className="answerCardContent">
        <div className="answerLeftWrap">
          <div className="answerLeftTopWrap">
            {userWhoAnswered?.profileImage && userWhoAnswered?.profileImage !== "" ?
              <img className="answerLeftTopImg cardProfileImage" src={userWhoAnswered?.profileImage} alt="Profile Image" /> :
              <div className={"answerLeftTopImgEmptyWrap"}>
                <span className="material-icons md-24 ">
                  person
                </span>
              </div>
            }
          </div>
          <div className="answerLeftBottomWrap">
            <div className="answerLeftBottomLine line" />
            <div className='answerMoreResponds'>
              <span className="material-icons md-16">
                {isViewReplies ? "remove" : "add"}
              </span>
            </div>
          </div>
        </div>
        <div className="answerRightWrap">
          <div className="answerRightTopWrap">
            <div className="answerRightTopLeftWrap">
              <div className="answerRightTopUsername text-normal">@{userWhoAnswered?.username}</div>
              <div className="answerRightTopDate text-sm">{answer?.dateAnswered}</div>
            </div>
            <span className="material-icons moreOptions">more_horizt</span>
          </div>
          <div className="answerRightBottomWrap">
            <div className="answerRightBottomAnswer text-normal color-text-secondary">{answer?.text}</div>
            <div className="answerRightBottomInteraction">
              <AnswerBottomButtons question={answer} feedback={buttonFeedback} />
            </div>
          </div>
        </div>
      </div>
      {
        isViewResponsSection &&
        <div className="answerCardRespondWrap">
          {/* <hr /> */}
          <div className="answerCardRespondLineWrap lineWrap">
            <div className="answerCardRespondLine line" />
          </div>
          <div className="answerCardRespondForm">
            <textarea placeholder="Type response" type="text" className="text" />
            <button className="button-secondary respondButton" >Respond</button>
          </div>
        </div>
      }

    </div>
  );
};
