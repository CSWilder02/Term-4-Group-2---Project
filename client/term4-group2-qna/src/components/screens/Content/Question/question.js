import React, { useEffect } from 'react';
import './question.css'
import { useParams } from 'react-router-dom';
import { CreateQuestion } from './CRUD/createQuestion';
import { UpdateQuestion } from './CRUD/updateQuestion';
import { useLoggedInUser } from '../../../util/UseContext/loggedInUserContext';
import { useUsers } from '../../../util/UseContext/usersContext';
import { useQuestions } from '../../../util/UseContext/questionsContext';
import { useAnswers } from '../../../util/UseContext/answersContext';
import { useReplies } from '../../../util/UseContext/repliesContext';

export const QuestionPage = () => {

    return (
        <div>Question n stuff</div>
    )
};

export const Question = () => {
    const { id } = useParams();
    const { loggedInUser } = useLoggedInUser();
    const { users } = useUsers();
    const { questions } = useQuestions();
    const { answers } = useAnswers();
    const { replies } = useReplies();

    useEffect(() => {
        console.log(id)
    }, [id, loggedInUser, users, questions, answers, replies]);

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
