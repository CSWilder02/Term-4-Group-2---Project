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
import { FilterQuestionsWidget } from '../../../elements/FilterQuestions/filterQuestionsWidget';
// import from "./";


export const QuestionPage = () => {
    const { answers, setAnswers } = useAnswers();
    const { questions } = useQuestions();
    const { replies } = useReplies();
    const { user } = useLoggedInUser();
    const { users } = useUsers();
    const { token } = useToken();
    const { id } = useParams();
    const [isPostAnswerVisible, setIsPostAnswerVisible] = useState(false)

    // Retrieving and sending filter states
    const [filterState, setFilterState] = useState("latest");
    const [sortState, setSortState] = useState("reset");

    const specificQuestion = questions.find((question) => question._id === id);

    const findAnswers = (answers) => {
        let specificAnswersArray = []
        if (answers) {
            for (const answer of answers) {
                if (answer?.question === id) {
                    specificAnswersArray.push(answer);
                }
            }
        }
        return specificAnswersArray
    }

    const specificAnswers = findAnswers(answers)

    const [answerText, setAnswerText] = useState("");

    const handlePostAnswer = async () => {

        let payload = {
            answerer: user,
            question: id,
            text: answerText,
        }

        requestDataOf.request("post", "createAnswer", token, payload)
            .then((res) => { setIsPostAnswerVisible(false); console.log(res) })
            .catch((err) => { console.log(err) })
    };


    const options = [
        { label: "Top", value: "top" },

        { label: "Newest", value: "newest" },

        { label: "Oldest", value: "oldest" },
    ];

    const getFilter = (val) => {
        setFilterState(val)
    };
    const getSort = (val) => {
        setSortState(val)
    }

    useEffect(() => {
        console.log(answerText);
        console.log(answers)
        console.log(`Answers for: ${id}:`, specificAnswers)
    }, [user, users, questions, useInteraction(), answers, answerText, isPostAnswerVisible]);


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
                        <QuestionCard question={specificQuestion} />
                    ) : (
                        <p>Cannot find question.</p>
                    )}
                </div>

                {/* -----------------AddComment--------------------------------- */}
                <div className="AddComment-box" >
                    {isPostAnswerVisible &&
                        <textarea rows="4" cols="50" value={answerText} onChange={e => { setAnswerText(e.target.value) }}
                            placeholder="Write your comment here..." />
                    }
                    <br />
                    <button className="button-primary "
                        onClick={e => { isPostAnswerVisible ? handlePostAnswer() : setIsPostAnswerVisible(true) }}>
                        Post Answer
                    </button>
                </div>
                <hr style={{ margin: 0 }} />
                <div className='text-normal'>All Answers {"(" + specificAnswers?.length + ")"}</div>

                {/* ----------------Filter------------------------------------ */}
                <FilterQuestionsWidget getFilter={getFilter} getSort={getSort} />

                {/* ----------------AnswerCard------------------------------------ */}
                <div className="answerCard-Box">
                    {
                        specificAnswers?.map((answer, i) => {
                            return (
                                <AnswerCard key={i} answer={answer} />
                            )
                        })
                    }
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
