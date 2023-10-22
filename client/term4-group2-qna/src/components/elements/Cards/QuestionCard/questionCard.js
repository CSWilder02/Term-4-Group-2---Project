import React, { useEffect, useRef, useState } from 'react';
import "./questionCard.css";

// Swiper dependencies
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Pagination, Navigation } from "swiper/modules";
import { CardOptions } from './CardOptions/cardOptions';
import FindImages from '../../../util/DataRequests/findImages';
import { useImages } from '../../../util/UseContext/imagesContext';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../../util/UseContext/usersContext';
import { findImages } from './Card Functions/findImages';
import { findUser } from './Card Functions/findUser';
import { findTopics } from './Card Functions/findTopics';
import { useTopics } from '../../../util/UseContext/topicsContext';
import requestDataOf from '../../../util/DataRequests/fetchData';
import { useToken } from '../../../util/UseContext/loggedInUserContext';
import { useInteraction } from '../../../util/UI/interactionListener';
// import { FindImages } from '../../../util/DataRequests/findImages';

export const QuestionCard = ({ question, community, scope }) => {
    const navigatTo = useNavigate();
    const carouselRef = useRef(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [upVote, setUpVote] = useState(false);
    const [downVote, setDownVote] = useState(false);
    const [saved, setSaved] = useState(false);
    const { images } = useImages();
    const { users } = useUsers();
    const { topics } = useTopics();
    let { token } = useToken();

    // Find Images
    let questioner = findUser(question?.questioner, users);
    let topicsOnQuestion = findTopics(question?.topics, topics)

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

    // Card Bottom Interactions
    const cardBtmInteractions = [
        {
            icon: "arrow_circle_up",
            interactionCount: question?.upVotes?.length,
            action: () => { alert("Upvoted!") }
        },
        {
            icon: "arrow_circle_down",
            interactionCount: question?.downVotes?.length,
            action: () => { alert("Downvoted... :(") }
        },
        {
            icon: "mode_comment",
            interactionCount: question?.answers?.length,
            action: () => { alert("I will navigate to Comment section") }
        }
    ]

    useEffect(() => {
        console.log(topics)
    }, [question, isDescriptionExpanded, useInteraction()]);


    return (
        <div className='questionWrap'>
            <div className='questionTop'>
                <div className='questionTopLeft' onClick={e => navigatTo('/profile/user/' + questioner?.usernamer)}>
                    <div className='questionTopLeftImgWrap'>
                        {/* {
                            question?.questionSource === "community" && (
                                <img src='' alt='Community Border' />
                            )
                        } */}
                        {
                            questioner?.profileImage ? (
                                questioner?.profileImage !== "" &&
                                <img className='questionTopLeftImgImage' src={questioner?.profileImage} alt='Community/User Profile' />
                            ) :
                                (
                                    <div className={question?.questionSource !== "community" ? 'questionTopLeftImgEmptyWrap' : "questionTopLeftImgEmptyComWrap"}>
                                        <span className="material-icons md-24 ">
                                            {question?.questionSource !== "community" ? "person" : "groups_3"}
                                        </span>
                                    </div>
                                )
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
                    <CardOptions scope={scope} />
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
                    style={{ display: question?.topics?.length <= 1 && question?.topics[0] !== "" && "none" }}>
                    {question?.topics?.length > 0 && question?.topics[0] !== "" &&
                        (topicsOnQuestion?.map((topic, i) => {
                            const topicsList = topicsOnQuestion?.length
                            return (
                                <li key={i} className='questionBtmLeftTagsTag text-button-2'>
                                    {`#${topic} ${topicsList <= 1 || topicsList - 1 === i ? "" : ", "} `}
                                </li>
                            )
                        }))
                    }
                </ul>
                <hr className='questionBtm-hr' />
                <div className='questionBtmInteractionsWrap'>
                    <ul className='questionBtmRightInteraction'>
                        {
                            cardBtmInteractions?.map((interaction, i) => {
                                return (
                                    <li key={i} className='questionBtmRightInteractionItem'
                                        onClick={interaction?.action}>
                                        <span className='material-icons material-icons.md-36 icon'>
                                            {interaction?.icon}
                                        </span>
                                        <div className='questionBtmRightInteraction-metrics text-normal'>{interaction?.interactionCount}</div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className='questionBtmRightInteractionItem'
                        onClick={e => alert("Saved")}>
                        <span className='material-icons material-icons.md-36 icon'>
                            {saved ? "bookmark_added" : "bookmark_add"}
                        </span>
                    </div>
                </div>
            </div>
        </div >
    )
}
