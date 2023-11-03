import React, { useEffect } from 'react';
import './userCard.css'
import { useImages } from '../../../util/UseContext/imagesContext';
import { useNavigate } from 'react-router-dom';

export const UserCard = ({ user, index }) => {
    const navigateTo = useNavigate();
    const { images } = useImages();

    const returnProfileImage = (imageId, images) => {
        for (const image of images) {
            if (image?._id === imageId) {
                return image
            }
        }
    };

    useEffect(() => {
        console.log(returnProfileImage(user?.profileImage, images));
    }, [])

    let profileImage = returnProfileImage(user?.profileImage, images)
    let profileImageIcon = returnProfileImage("65439993cd6293a690be6859", images)


    return (
        <div className='userCard'>
            <div className='userInfoSection'>
                <div className='userInfoLeftWrap'>
                    <div className='userInfoLeftProfile'>
                        {
                            profileImage ?
                                <img className='userInfoProfileImg' src={"data:image/png;base64," + profileImage?.data} />
                                : <img className='userInfoProfileImg' src={"data:image/png;base64," + profileImageIcon?.data} />
                        }

                    </div>
                    <div className='userInfoLeftProfileInfo'>
                        <div className='userInfoLeftProfileUsername text-normal'>@{user?.username}</div>
                        <div className='userInfoLeftProfileContentNumber text-sm'>
                            {user?.questions?.length} questions
                        </div>
                    </div>
                </div>
                {/* <button className='button-secondary'>
                    Follow
                    <span className='material-icons add-icon'>add</span>
                </button> */}
            </div>
            <hr className='user-content-hr' />
            <div className='userContentSection'>
                <div className='userContentMore'
                    onClick={e => {
                        navigateTo('/search/question/by_' + user?.username)
                    }}
                >
                    <div className='userContentMoreTxt text-normal'>Questions by {user?.fullName}</div>
                    <span className='material-icons'>navigate_next</span>
                </div>
            </div>
        </div>
    )
}
