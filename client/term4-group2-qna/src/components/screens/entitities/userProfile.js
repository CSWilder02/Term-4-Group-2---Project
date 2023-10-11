import React from 'react';
import './userProfile.css';
import { AskQuestionWidget } from '../content/askQuestionWidget';

export const UserProfile = () => {
    return (
        <div className='userProfileWrap'>
            <div className='userProfileLeftWrap'></div>
            <div className='userProfileMidWrap'>
                <div className='userProfileHeaderContainer'></div>
                <AskQuestionWidget />
                <div className='userProfileAboutContainer'></div>
                <div className='userProfileQuestionsContainer'></div>
            </div>
            <div className='userProfileRightWrap'></div>
        </div>
    )
}
