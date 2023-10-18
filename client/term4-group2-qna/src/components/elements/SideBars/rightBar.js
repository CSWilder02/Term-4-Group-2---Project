import React from 'react';
import './sideBars.css';

const RightBar = () => {
    return (
        <div className='sideBarWrap'>
            <div className='AccountSec'>
                {/* Your AccountSec content */}
            </div>
            <div className='StudentSec'>
                <p className='LecTitle'>LECTURES</p>
                <div className='Lecture1'>
                    {/* Your Lecture1 content */}
                </div>
                <br />
                <div className='Lecture2'>
                    {/* Your Lecture2 content */}
                </div>
            </div>
            <div className='LecturerSec'>
                <p className='LecTitle'>STUDENTS</p>
                <div className='Student1'>
                    {/* Your Student1 content */}
                </div>
                <br />
                <div className='Student2'>
                    {/* Your Student2 content */}
                </div>
            </div>
        </div>
    );
}

export default RightBar;