import React, { useEffect, useState } from 'react';
import './userProfile.css';
import { AskQuestionWidget } from '../content/askQuestionWidget';
import { LeftBar } from '../../elements/SideBars/leftBar';
import { RightBar } from '../../elements/SideBars/rightBar';
// https://ucarecdn.com/adcb4679-f8e5-4c8a-a4bd-38af2c934f48/christopherburnsKj2SaNHGhgunsplash.jpg

export const UserProfile = ({ user }) => {
    const staticBg = "https://ucarecdn.com/adcb4679-f8e5-4c8a-a4bd-38af2c934f48/christopherburnsKj2SaNHGhgunsplash.jpg"
    const staticProfileImg = "https://ucarecdn.com/89f9e618-9617-4ce3-8498-0842734f899f/-/preview/500x500/-/quality/smart_retina/-/format/auto/"

    const userContent = ["Questions", "Answers", "Replies"];
    const [selectedUserContent, setSelectedUserContent] = useState("Questions");

    const userInfo = [
        {
            icon: "recommend",
            info: "reliable",
            preInfo: "33%",
        },
        {
            icon: "calendar_month",
            info: "04 December 2023",
            preInfo: "Joined",
        },
        {
            icon: "info",
            info: "This is my bio and what I am up to.",
            preInfo: "",
        }
    ]

    useEffect(() => {

    }, [selectedUserContent])

    return (
        <div className='userProfileWrap'>
            <div className='userProfileLeftWrap'>Left section</div>
            <div className='userProfileMidWrap'>
                <div className='userProfileHeaderContainer'>
                    <div className='userProfileHeaderBack'><span className="material-icons  userProfileAboutInfoIcon">keyboard_backspace</span></div>
                    <div className='userProfileHeaderTopSection'>
                        <div className='userProfileHeaderBackground'>
                            <img className='userProfileHeaderBackgroundImg' src={staticBg} />
                            <div className='userProfileHeaderGradient' />
                        </div>
                        <div className='userProfileHeaderUserDetails'>
                            <div className='userProfileHeaderUserDetailsLeft'>
                                <img className='userProfileHeaderUserProfileImg' src={staticProfileImg} />
                                <div className='userProfileHeaderUserName text-heading-sub'>Eddie</div>
                            </div>
                            <button className='button-secondary userProfileHeaderUserFollow theme-secondary'>Follow</button>
                        </div>
                    </div>
                    <div className='userProfileHeaderBottomSection  text-normal' >
                        {
                            userContent.map((content) => {
                                return (
                                    <div className={selectedUserContent === content ? 'userProfileHeaderBottomSectionItm headerSectionItm-active' :
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
                                userInfo.map((info) => {
                                    return (
                                        <div className='userProfileAboutInfoContainerItm'>
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
                </div>
            </div>
            <div className='userProfileRightWrap'>Right Section</div>
        </div>
    )
};