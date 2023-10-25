import React, { useState, useEffect } from 'react';
import './question.css'
import { useParams } from 'react-router-dom';
import { CreateQuestion } from './CRUD/createQuestion';
import { UpdateQuestion } from './CRUD/updateQuestion';
import { useLoggedInUser } from '../../../util/UseContext/loggedInUserContext';
import { useUsers } from '../../../util/UseContext/usersContext';
import { useQuestions } from '../../../util/UseContext/questionsContext';
import { useAnswers } from '../../../util/UseContext/answersContext';
import { useReplies } from '../../../util/UseContext/repliesContext';

// bldn
import LeftBar from "../../../elements/SideBars/leftBar";
import { AnswerCard } from "../../../elements/Cards/AnswerCard/answerCard";
import {
    useToken,
} from "../../../util/UseContext/loggedInUserContext";
import { useInteraction } from "../../../util/UI/interactionListener";
import requestDataOf from "../../../util/DataRequests/fetchData";
import { QuestionCard } from '../../../elements/Cards/QuestionCard/questionCard';
// import from "./";


export const QuestionPage = () => {
    const { answers, setAnswers } = useAnswers();
    const { questions } = useQuestions();
    const { replies } = useReplies();
    const { user } = useLoggedInUser();
    const { users } = useUsers();
    const { token } = useToken();
    const { id } = useParams();

    const specificQuestion = questions.find((question) => question._id === id);
    const specificQuestionAnswers = specificQuestion
        ? specificQuestion.answers
        : [];

    const specificAnswers = () => {

    }

    const [answerText, setAnswerText] = useState("");

    const handlePostAnswer = async () => {

        let payload = {
            answerer: user,
            question: id,
            text: answerText,
        }

        requestDataOf.request("post", "createAnswer", token, payload)
            .then((res) => { console.log(res) })
            .catch((err) => { console.log(err) })
    };


    const options = [
        { label: "Top", value: "top" },

        { label: "Newest", value: "newest" },

        { label: "Oldest", value: "oldest" },
    ];

    useEffect(() => {
        console.log(answerText);
        console.log(answers)
    }, [user, users, questions, useInteraction(), answerText]);


    return (
        // questionPageLogic()

        // bldn
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
                        <QuestionCard question={specificQuestion} />
                        // ""
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
                        value={answerText}
                        onChange={e => { setAnswerText(e.target.value) }}
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
    )
};

export const Question = () => {
    const { id } = useParams();

    const questionPageLogic = () => {
        switch (id) {
            case 'create':
                return (<CreateQuestion />)
                break;
            case 'update':
                return (<UpdateQuestion />)
                break;
            default:
                return (<QuestionPage />)
        }
    }

    return (
        questionPageLogic()
    )
};
