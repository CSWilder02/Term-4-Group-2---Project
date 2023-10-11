import React, { useEffect, useState } from 'react';
import './userProfile.css';
import { AskQuestionWidget } from '../content/askQuestionWidget';
import { LeftBar } from '../../elements/SideBars/leftBar';
import { RightBar } from '../../elements/SideBars/rightBar';
// https://ucarecdn.com/adcb4679-f8e5-4c8a-a4bd-38af2c934f48/christopherburnsKj2SaNHGhgunsplash.jpg

export const UserProfile = ({ user }) => {
    const staticBg = "https://ucarecdn.com/adcb4679-f8e5-4c8a-a4bd-38af2c934f48/christopherburnsKj2SaNHGhgunsplash.jpg"
    const staticProfileImg = "https://ucarecdn.com/89f9e618-9617-4ce3-8498-0842734f899f/-/preview/500x500/-/quality/smart_retina/-/format/auto/"

    const userContent = ["Questions", "Answers", "Replies"]
    const [selectedUserContent, setSelectedUserContent] = useState("Questions");

    useEffect(() => {

    }, [selectedUserContent])

    return (
        <div className='userProfileWrap'>
            <div className='userProfileLeftWrap'>Left section</div>
            <div className='userProfileMidWrap'>
                <div className='userProfileHeaderContainer'>
                    <div className='userProfileHeaderTopSection'>
                        <div className='userProfileHeaderBackground'>
                            <img className='userProfileHeaderBackgroundImg' src={staticBg} />
                            <div className='userProfileHeaderGradient' />
                        </div>
                        <div className='userProfileHeaderUserDetails'>
                            <div className='userProfileHeaderUserDetailsLeft'>
                                <img className='userProfileHeaderUserProfileImg' src={staticProfileImg} />
                                <div className='userProfileHeaderUserName text-heading-2'>Eddie</div>
                            </div>
                            <button className='button-primary'>Follow</button>
                        </div>
                    </div>
                    <div className='userProfileHeaderBottomSection  text-normal' >
                        {
                            userContent.map((content) => {
                                return (
                                    <div
                                        style={{ color: selectedUserContent === content ? 'orange' : 'gray', cursor: "pointer" }}
                                        onClick={e => setSelectedUserContent(content)}
                                    >
                                        {content}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <AskQuestionWidget />
                <div className='userProfileAboutContainer'></div>
                <div className='userProfileQuestionsContainer'></div>
            </div>
            <div className='userProfileRightWrap'>Right Section</div>
        </div>
    )
};
