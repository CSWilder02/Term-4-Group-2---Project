import React from 'react';
import './askQuestionWidget.css';
import { useNavigate } from 'react-router-dom';

export const AskQuestionWidget = () => {
    const navigateTo = useNavigate()
    const staticProfileImg = "https://ucarecdn.com/89f9e618-9617-4ce3-8498-0842734f899f/-/preview/500x500/-/quality/smart_retina/-/format/auto/"
    return (
        <div className='askQuestionWidgetWrap' onClick={e => navigateTo('/question/create')}>
            <div className='askQuestionLeftContainer'>
                <div className='askQuestionUserContainer'>
                    <img className='askQuestionUserImg' src={staticProfileImg} />
                    <div className='askQuestionUserOnlineStatus' />
                </div>
                <div className='askQuestionInput text-normal'>What do you need help with?</div>
            </div>
            <span className="material-icons md-24 askQuestionMediaIcon">photo_library</span>
        </div>
    )
}
