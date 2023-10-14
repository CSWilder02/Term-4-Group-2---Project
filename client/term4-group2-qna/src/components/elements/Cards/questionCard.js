import React, { useEffect, useRef, useState } from 'react';
import "./questionCard.css";
import { Carousel, Button } from "antd";

export const QuestionCard = ({ question, questioner, community }) => {
    const carouselRef = useRef(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    // Carousel Methods
    const next = () => {
        carouselRef.current.next();
    };
    const prev = () => {
        carouselRef.current.prev();
    };

    // Toggle Description with See More/Less button
    const toggleExpand = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };


    // questioner
    // Format date
    function formatDate(rawDate) {
        const date = new Date(rawDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
        const year = date.getFullYear();
        return `${day} ${month} ${year}`
    }

    useEffect(() => {

    }, [question]);


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
                            <div className={`questionMidTextDescription text-normal color-text-secondary ${isDescriptionExpanded ? 'expanded' : ''}`}>
                                {question?.descriptionOfIssue}
                            </div>
                        </div>
                        <div className="see-more-button" onClick={toggleExpand}>
                            {question?.descriptionOfIssue?.length > 200 && isDescriptionExpanded ? 'Read Less' : 'See More'}
                        </div>
                    </div>
                </div>
                <div className='questionMidImgs'>
                    {
                        question?.images?.length > 0 && question?.images[0] !== "" && (
                            <div className='questionMidImgsCarousel'>
                                {question?.images?.length > 1 &&
                                    (
                                        <div className='ImgCarouselButtons'>
                                            <div className='button-icon-2 carasoul-button c-b-left'>
                                                <span className="material-icons" onClick={prev} >chevron_left</span>
                                            </div>
                                            <div className='button-icon-2 carasoul-button c-b-right'>
                                                <span className="material-icons" onClick={next}>chevron_right</span>
                                            </div>
                                        </div>
                                    )
                                }
                                <Carousel ref={carouselRef} autoplay dots={true} effect="scrollx">
                                    {
                                        question?.images?.map((image) => {
                                            return (
                                                <img className='questionMidImgsCarouselImage' src={image} alt="Supporting Image" />
                                            )
                                        })
                                    }
                                </Carousel>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='questionBtm'>
                <div className='questionBtmLeftTags'></div>
                <div className='questionBtmRightInteraction'></div>
            </div>
        </div>
    )
}
