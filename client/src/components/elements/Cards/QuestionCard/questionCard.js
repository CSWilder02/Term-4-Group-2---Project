import React, { useEffect, useRef, useState } from 'react';
import "./questionCard.css";

// Swiper dependencies
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Pagination, Navigation } from "swiper/modules";
import { CardOptions } from './CardOptions/cardOptions';
import { useImages } from '../../../util/UseContext/imagesContext';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../../util/UseContext/usersContext';
import { findImages } from './Card Functions/FindData/findImages';
import { findUser } from './Card Functions/FindData/findUser';
import requestDataOf from '../../../util/DataRequests/fetchData';
import { useLoggedInUser, useToken } from '../../../util/UseContext/loggedInUserContext';
import { useInteraction } from '../../../util/UI/interactionListener';
import { BottomButtons } from './Card Functions/Interaction/BottomButtons';
import { UserSummary } from '../../Tooltip/UserSummary/userSummary';

export const QuestionCard = ({ question, index, community, scope, }) => {
    const navigatTo = useNavigate();
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const { images } = useImages();
    const { users } = useUsers();
    const { loggedInUser } = useLoggedInUser();

    // UI Components
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const getOptionVisibilityState = (state) => {
        setIsOptionsVisible(state)
    }

    useEffect(() => {

    }, [question, isDescriptionExpanded, useInteraction(), isOptionsVisible]);

    // Find Images
    let questioner = findUser(question?.questioner, users);

    // Carousel Methods
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span className="' + className + '">' + (index + 1) + '</span>';
        },
    };

    // Toggle Description with See More/Less button
    const toggleExpand = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    // Format date
    function formatDate(rawDate) {
        const date = new Date(rawDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
        const year = date.getFullYear();
        return `${day} ${month} ${year}`
    }

    const navigateToProfile = () => {
        questioner?.username === loggedInUser?.username ? navigatTo('/profile/user/me') : navigatTo('/profile/user/' + questioner?.username)
    };

    const returnProfileImage = (imageId, images) => {
        for (const image of images) {
            if (image?._id === imageId) {
                return image
            }
        }
    };

    let profileImage = returnProfileImage(questioner?.profileImage, images)
    let profileImageIcon = returnProfileImage("65439993cd6293a690be6859", images)
    useEffect(() => {
        console.log("PROFF IMG", questioner?.profileImage)
    })

    return (
        <div className='questionWrap'>
            {isOptionsVisible && <CardOptions question={question} scope={scope} state={getOptionVisibilityState} />}
            {/* {<UserSummary />} */}
            <div className='questionTop'>
                <div className='questionTopLeft' onClick={navigateToProfile}>
                    <div className='questionTopLeftImgWrap'>
                        {/* {
                            question?.questionSource === "community" && (
                                <img src='' alt='Community Border' />
                            )
                        } */}
                        {
                            questioner?.profileImage ? (
                                questioner?.profileImage !== "" && questioner?.profileImage?.slice(0, 5) !== "https" &&
                                (
                                    questioner?.profileImage === "65439993cd6293a690be6859"
                                        ? <img className='questionTopLeftImgImage' src={"data:image/png;base64," + profileImageIcon?.data} alt='Community/User Profile' />
                                        : <img className='questionTopLeftImgImage' src={"data:image/png;base64," + profileImage?.data} alt='Community/User Profile' />
                                )
                            ) :
                                questioner?.profileImage?.slice(0, 5) === "https"
                                && <img className='questionTopLeftImgImage' src={questioner?.profileImage} alt='User Profile' />
                            // : (
                            //     <div className={question?.questionSource !== "community" ? 'questionTopLeftImgEmptyWrap' : "questionTopLeftImgEmptyComWrap"}>
                            //         <span className="material-icons md-24 ">
                            //             {question?.questionSource !== "community" ? "person" : "groups_3"}
                            //         </span>
                            //     </div>
                            // )
                        }
                    </div>
                    <div className='questionTopLeftDetailsWrap text-normal'>
                        {
                            question?.questionSource === "community" && (
                                <div className='questionTopLeftDetailsName color-text-secondary'>c/{question?.community?.name}/</div>
                            )
                        }
                        <div className='questionTopLeftDetailsName'>@{questioner?.username}</div>
                    </div>
                </div>
                <div className='questionTopRight'>
                    <div className='questionTopRightTimeAsked text-sm color-text-secondary'>{formatDate(question?.dateAsked)}</div>
                    <span className="material-icons questionMore" onClick={e => { setIsOptionsVisible(true) }}>
                        more_horiz
                    </span>
                </div>
            </div>
            <hr className='questionTop-hr' />
            <div className='questionMid'>
                <div className='questionMidText'>
                    <div className='questionMidTextTitle text-heading-sub'>{question?.title}</div>
                    <div>
                        <div className={`questionMidCard ${isDescriptionExpanded ? 'expanded' : ''}`}>
                            <div className={`questionMidTextDescription text-normal color-text-secondary ${isDescriptionExpanded ? 'expanded' : ''}`}
                                style={{ maxHeight: isDescriptionExpanded ? 'none' : '67px', minHeight: isDescriptionExpanded ? 'none' : 'fit-content' }}
                            >
                                {question?.descriptionOfIssue}
                            </div>
                        </div>
                        {question?.descriptionOfIssue?.length > 120 && (
                            <div className="text-sm text-button" onClick={e => toggleExpand()}>
                                {isDescriptionExpanded ? 'Read Less' : 'Read More'}
                            </div>
                        )}
                    </div>
                </div>
                <div className='questionMidImgs' style={{ display: question?.images?.length === 1 && question?.images[0] === "" && "none" }}>
                    {
                        question?.images?.length > 0 && question?.images[0] !== "" && (
                            <div className='questionMidImgsCarousel'>
                                <Swiper
                                    slidesPerView={'auto'}
                                    spaceBetween={10}
                                    pagination={pagination}
                                    navigation={true}
                                    modules={[Pagination, Navigation]}
                                    className="mySwiper">
                                    {
                                        findImages(question?.images, images)?.map((image, i) => {
                                            return (
                                                <SwiperSlide key={i}>
                                                    <img key={i} className='questionMidImgsCarouselImage' src={"data:image/png;base64," + image} alt="Supporting Image" />
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='questionBtm'>
                <ul className='questionBtmLeftTags'
                    style={{ display: question?.topics?.length <= 0 && question?.topics[0] !== "" && "none" }}>
                    {question?.topics.length > 0 && question?.topics[0]?.title !== "" &&
                        (question?.topics?.map((topic, i) => {
                            const topicsList = question?.topics?.length
                            return (
                                <li key={i} className='questionBtmLeftTagsTag text-button-2' onClick={e => navigatTo("/topic/" + topic?.title)}>
                                    {`#${topic?.title} ${topicsList <= 1 || topicsList - 1 === i ? "" : ", "} `}
                                </li>
                            )
                        }))
                    }
                </ul>
                <hr className='questionBtm-hr' />
                {/* ---> Insert Bottom Buttons <--- */}
                <BottomButtons loggedInUser={loggedInUser} question={question} index={index} />
            </div>
        </div >
    )
}
