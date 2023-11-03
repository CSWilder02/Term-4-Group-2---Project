import React, { useEffect, useState } from 'react';
import './userProfile.css';

import { AskQuestionWidget } from '../../../../elements/AskQuestion/askQuestionWidget';
import { QuestionCard } from '../../../../elements/Cards/QuestionCard/questionCard';
import questionsDemoData from '../../../../../test_data/question.data';
import LeftBar from '../../../../elements/SideBars/leftBar';
import RightBar from '../../../../elements/SideBars/rightBar';
import { useLoggedInUser } from '../../../../util/UseContext/loggedInUserContext';
import { useQuestions } from '../../../../util/UseContext/questionsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useInteraction } from '../../../../util/UI/interactionListener';
// https://ucarecdn.com/adcb4679-f8e5-4c8a-a4bd-38af2c934f48/christopherburnsKj2SaNHGhgunsplash.jpg

export const UserProfile = ({ user, users, communities, questio, answers, replies, topics }) => {
    const staticBg = "https://ucarecdn.com/adcb4679-f8e5-4c8a-a4bd-38af2c934f48/christopherburnsKj2SaNHGhgunsplash.jpg"
    const staticProfileImg = "https://ucarecdn.com/89f9e618-9617-4ce3-8498-0842734f899f/-/preview/500x500/-/quality/smart_retina/-/format/auto/"

    const navigateTo = useNavigate();
    const { loggedInUser } = useLoggedInUser();
    const userContent = ["Questions", "Answers", "Replies", "Following"];
    const [selectedUserContent, setSelectedUserContent] = useState("Questions");
    const { questions } = useQuestions();
    const { id } = useParams();

    const userQuestions = (questions, userId) => {
        let listOfUserQuestions = [];

        if (userId === "me") {
            for (const question of questions) {
                if (question?.questioner === loggedInUser?._id) {
                    listOfUserQuestions?.push(question);
                }
            }
        }
        return listOfUserQuestions
    }

    // Format date
    const formatDate = (rawDate) => {
        const dateParts = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}.\d{3})Z$/.exec(rawDate);

        if (!dateParts) {
            return "Invalid date";
        }
        const year = dateParts[1];
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(`${year}-${dateParts[2]}-01T00:00:00Z`));
        const day = dateParts[3];

        return `${day} ${month} ${year}`;
    }

    // Reliable score
    const generateReliableScore = () => {

    }

    const userInfo = [
        {
            // Reliable score
            icon: "recommend",
            info: "reliable",
            preInfo: "33%",
        },
        {
            // Date User Joined
            icon: "calendar_month",
            info: formatDate(loggedInUser?.dateJoined),
            preInfo: "Joined",
        },
        {
            // User Bio
            icon: "info",
            info: loggedInUser?.bio,
            preInfo: "",
        }
    ];

    useEffect(() => {
        // setQuestions(questionsDemoData);
        // console.log("User Questions", userQuestions(questions, id));
        // console.log("logged in user: ", loggedInUser)

        // id === "me" && !loggedInUser?.username && navigateTo("/onboarding")

    }, [selectedUserContent, questions, useInteraction()])

    return (
        <div className='userProfileWrap'>
            <div className='userProfileLeftWrap'>
                <LeftBar />
            </div>
            <div className='userProfileMidWrap'>
                <div className='userProfileHeaderContainer'>
                    <div className='userProfileHeaderBack' onClick={e => navigateTo(-1)}><span className="material-icons  userProfileAboutInfoIcon">keyboard_backspace</span></div>
                    <div className='userProfileHeaderTopSection'>
                        <div className='userProfileHeaderBackground'>
                            <img className='userProfileHeaderBackgroundImg' src={staticBg} />
                            <div className='userProfileHeaderGradient' />
                        </div>
                        <div className='userProfileHeaderUserDetails'>
                            <div className='userProfileHeaderUserDetailsLeft'>
                                <img className='userProfileHeaderUserProfileImg' src={loggedInUser?.profileImage} />
                                <div className='userProfileHeaderUserName text-heading-sub'>{loggedInUser?.username}</div>
                            </div>
                            {
                                id?.slice(0, 2) === "me" ? (
                                    <button className='button-secondary userProfileHeaderUserFollow theme-secondary'>Edit Profile</button>
                                ) : (
                                    <button className='button-secondary userProfileHeaderUserFollow theme-secondary'>Follow</button>
                                )
                            }

                        </div>
                    </div>
                    <div className='userProfileHeaderBottomSection  text-normal' >
                        {
                            userContent.map((content, i) => {
                                return (
                                    <div key={i} className={selectedUserContent === content ? 'userProfileHeaderBottomSectionItm headerSectionItm-active' :
                                        'userProfileHeaderBottomSectionItm'}
                                        style={{ color: selectedUserContent === content ? '#FF8328' : 'gray', cursor: "pointer" }}
                                        onClick={e => setSelectedUserContent(content)}
                                    >
                                        {content}</div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='userProfileAboutContainer'>
                    {/* <div className='userProfileAboutRealibityContainer'>
                        <div className='userProfileAboutRealibityTop'>
                            Realibity
                        </div>
                        <div className='userProfileAboutRealibityScoreContainer'>
                            <div className='userProfileAboutRealibityScore'>33</div>
                            <div className='userProfileAboutRealibityLabel'>%</div>
                        </div>
                    </div> */}
                    <div className='userProfileAboutInfoContainer'>
                        <div className='userProfileAboutInfoTop'>
                            About
                        </div>
                        <div className='userProfileAboutInfo'>
                            {
                                userInfo.map((info, i) => {
                                    return (
                                        <div key={i} className='userProfileAboutInfoContainerItm'>
                                            <span className="material-icons  userProfileAboutInfoIcon">{info?.icon}</span>
                                            <div className='userProfileAboutInfoDetail'>{info?.preInfo + " " + info?.info}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <AskQuestionWidget />
                <hr />
                <div className='userProfileQuestionsContainer'>
                    {/* QUESTIONS | ANSWERS | REPLIES Section */}
                    {
                        userQuestions(questions, id).map((question, i) => {
                            return (
                                <QuestionCard key={i} question={question} scope={"private"} />
                            )
                        })
                    }
                </div>
            </div>
            <div className='userProfileRightWrap'>
                <RightBar />
            </div>
        </div>
    )
};
