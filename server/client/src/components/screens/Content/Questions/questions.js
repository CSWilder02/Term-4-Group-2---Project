import React, { useState, useEffect } from "react";
import "./questions.css";
import { useParams } from "react-router-dom";
import { QuestionCard } from "../../../elements/Cards/QuestionCard/questionCard";
// import questionsDemoData from "../../../../test_data/question.data";
// import answerDemoData from "../../../../test_data/answer.data";
import LeftBar from "../../../elements/SideBars/leftBar";
import { AnswerCard } from "../../../elements/Cards/AnswerCard/answerCard";
import { useQuestions } from "../../../util/UseContext/questionsContext";
import { useAnswers } from "../../../util/UseContext/answersContext";
import {
  useLoggedInUser,
  useToken,
} from "../../../util/UseContext/loggedInUserContext";
import { useUsers } from "../../../util/UseContext/usersContext";
import { useInteraction } from "../../../util/UI/interactionListener";
import requestDataOf from "../../../util/DataRequests/fetchData";
// import from "./";

export const Questions = () => {
  //   const [Questions, setQuestions] = useState(questionsDemoData);
  const { answers, setAnswers } = useAnswers();
  const { questions } = useQuestions();
  const { user } = useLoggedInUser();
  const { users } = useUsers();
  const { token } = useToken();
  const { id } = useParams();

  const specificQuestion = questions.find((question) => question._id === id);
  const specificQuestionAnswers = specificQuestion
    ? specificQuestion.answers
    : [];

  const [newAnswer, setNewAnswer] = useState("");

  const handlePostAnswer = async () => {
    try {
      // Send a POST request to the answers API with the new answer data
      const response = await fetch('${useAnswers}', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: newAnswer,
          question: specificQuestion._id,
        }),
      });

      if (response.ok) {
        const newAnswerData = await response.json();
        setAnswers([...specificQuestionAnswers, newAnswerData]);
        setNewAnswer("");

        console.log("Answer posted successfully", newAnswerData);
      } else {
        console.error("Error posting answer:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  };

  console.log("Specific Question Answers: ", specificQuestionAnswers);
  console.log("Answer Data in Answers component:", questions);
  console.log("question ID ", specificQuestion);
  const options = [
    { label: "Top", value: "top" },

    { label: "Newest", value: "newest" },

    { label: "Oldest", value: "oldest" },
  ];

  useEffect(() => {
    // console.log("tkn: ", token)
    console.log(id)
  }, [user, users, questions, useInteraction()]);

  return (
    <div className="Comment">
      {/* ------------------LeftBar------------------------------------ */}
      <div className="leftBar">
        <LeftBar />
      </div>
      {/* ------------------MiddleSection------------------------------- */}
      <div className="centerWrap">
        {/* ----------------MainQuestion-------------------------------- */}
        <div className="question-box">
          {questions.length > 0 ? (
            // <QuestionCard question={specificQuestion} />
            ""
          ) : (
            <p>No questions available</p>
          )}
        </div>
        {/* ----------------Filter------------------------------------ */}
        <div className="filter-add-comment">
          <div className="comment-filter">
            <label className="dropdown-filter">
              Sort by:
              <select className="select-box">
                {options.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
        {/* -----------------AddComment--------------------------------- */}
        <div className="AddComment-box">
          <textarea
            rows="4"
            cols="50"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Write your comment here..."
          />
          <br />
          <button
            className="addComment-Btn"
            onClick={handlePostAnswer}
          >
            Post Comment
          </button>
        </div>
        {/* ----------------AnswerCard------------------------------------ */}
        <div className="answerCard-Box">
          {answers.length > 0 ? (
            <AnswerCard answer={specificQuestionAnswers} />
          ) : (
            <p>No answers available</p>
          )}
        </div>
      </div>
      <div className="rightBar"></div>
    </div>
  );
};
