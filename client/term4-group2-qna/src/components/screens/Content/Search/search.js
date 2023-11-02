import React, { useEffect, useState } from 'react';
import './search.css';
import { useNavigate, useParams } from 'react-router-dom';
import QueryDisplayBackground from '../../../assets/images/util/gradient_background_transparent.png'
import requestDataOf from '../../../util/DataRequests/fetchData';
import { QuestionCard } from '../../../elements/Cards/QuestionCard/questionCard';
import { AnswerCard } from '../../../elements/Cards/AnswerCard/answerCard';
import { UserCard } from '../../../elements/Cards/UserCard/userCard';

export const Search = (user, users, questions, answers, replies, topics) => {
    const { type, query } = useParams();
    const navigateTo = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState(type);
    const [searchedQuestions, setSearchedQuestions] = useState([]);
    const [searchedAnswers, setSearchedAnswers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [searchedTopics, setSearchedTopics] = useState([])




    const filterTypes = [
        {
            id: 'question',
            label: 'Questions'
        },
        {
            id: 'answer',
            label: 'Answers'
        },
        {
            id: 'user',
            label: 'Users'
        },
        {
            id: 'topic',
            label: 'Topics'
        }
    ];

    useEffect(() => {
        requestDataOf.request("get", `search/${query}`, "", "")
            .then((res) => {
                const searchResults = res?.data;
                console.log(searchResults);

                setSearchedQuestions(searchResults?.questions);
                setSearchedAnswers(searchResults?.answers);
                setSearchedUsers(searchResults?.users);
                setSearchedTopics(searchResults?.topics);

                setSelectedFilter(type)
            })
    }, [selectedFilter, type, query]);


    return (
        <div>
            {/* TYPE:{type},
            <br />
            QUERY:{query} */}

            <div className='back'>
                <span className='material-icons'>
                    keyboard_backspace
                </span>
            </div>

            <div className='queryDisplay'>
                <img className='queryDisplayBackground'
                    src={QueryDisplayBackground} alt='Query Display Gradient Background' />
                <div className='queryDisplayContent'>
                    <div className='contentLeft'>
                        <span className='material-icons searchIcon'>search</span>
                    </div>
                    <div className='contentRight'>
                        <div className='contentRightTop'>`{query}`</div>
                        <div className='contentRightBtm'>No results</div>
                    </div>
                </div>
            </div>

            <div className='filterWrap'>
                {
                    filterTypes?.map((filter, i) => {
                        return (
                            <div className={
                                selectedFilter === filter?.id ?
                                    'filterItem activeFilter text-sm' :
                                    'filterItem text-sm'}
                                onClick={e => {
                                    setSelectedFilter(filter?.id);
                                    navigateTo('/search/' + filter?.id + '/' + query);
                                }}
                                key={i}
                            >
                                {filter?.label}
                                {filter?.id === "question" && " (" + searchedQuestions?.length + ")"}
                                {filter?.id === "answer" && " (" + searchedAnswers?.length + ")"}
                                {filter?.id === "user" && " (" + searchedUsers?.length + ")"}
                                {filter?.id === "topic" && " (" + searchedTopics?.length + ")"}
                            </div>
                        )
                    })
                }
            </div>


            <div className='content-wrap'>
                {
                    selectedFilter === "question" && (
                        searchedQuestions?.map((question, i) => {
                            return (
                                <QuestionCard question={question} index={i} scope={"public"} />
                            )
                        })
                    )
                }
                {
                    selectedFilter === "answer" && (
                        searchedAnswers?.map((answer, i) => {
                            return (
                                <AnswerCard answer={answer} index={i} />
                            )
                        })
                    )
                }
                {
                    selectedFilter === "user" && (
                        searchedUsers?.map((user, i) => {
                            return (
                                <UserCard user={user} index={i} />
                            )
                        })
                    )
                }
            </div>

        </div>
    )
}
