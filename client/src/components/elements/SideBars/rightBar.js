import React from 'react';
import './sideBars.css';
import './rightBar.css';
import Banner from '../../assets/images/util/rightBar/happy_coding_banner.png';
import { useNavigate } from 'react-router-dom';

const RightBar = () => {
    const navigateTo = useNavigate();
    return (
        <div className='sideBarWrap rightBarWrap'>
            <div className='AccountSection'>
                {/* Your AccountSec content */}
                <img className='banner_1' src={Banner} alt='Happy Coding Banner'
                    onClick={e => {
                        navigateTo("/question/create")
                    }}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </div>
    );
}

export default RightBar;