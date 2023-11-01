import React from 'react';
import './userSummary.css'

export const UserSummary = ({ user }) => {
    const userSummaryObj = {
        userDetails: {
            profile: user?.profile,
            fullName: user?.fullName
        }
    };

    return (
        <div className='userSummarySection'>
            <div className='userSummaryWrap'>
                o
                <div className='userSummaryTopWrap userSummarySection'></div>
                <div className='userSummaryMidWrap'></div>
                <div className='userSummaryBtmWrap'></div>
            </div>
        </div>
    )
}
