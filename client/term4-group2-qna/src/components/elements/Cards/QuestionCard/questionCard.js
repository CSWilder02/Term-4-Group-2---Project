import React, { useEffect, useRef, useState } from 'react';
import "./questionCard.css";

// Swiper dependencies
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Pagination, Navigation } from "swiper/modules";

export const QuestionCard = ({ question, questioner, community }) => {
    const carouselRef = useRef(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [upVote, setUpVote] = useState(false)
    const [downVote, setDownVote] = useState(false)
    const [saved, setSaved] = useState(false)

    // Carousel Methods
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
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

    }, [question, isDescriptionExpanded]);


    return (
        <div className='questionWrap'>
            <div className='questionTop'>
                <div className='questionTopLeft'>
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
                        <div className='questionTopLeftDetailsName'>@eddie</div>
                    </div>
                </div>
                <div className='questionTopRight'>
                    <div className='questionTopRightTimeAsked text-sm color-text-secondary'>{formatDate(question?.dateAsked)}</div>
                    <span className="material-icons">
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
                                        question?.images?.map((image) => {
                                            return (
                                                <SwiperSlide>
                                                    <img className='questionMidImgsCarouselImage' src={image} alt="Supporting Image" />
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
                        (question?.topics?.map((topic, i) => {
                            const topicsList = question?.topics?.length
                            return (
                                <li className='questionBtmLeftTagsTag text-button-2'>
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
