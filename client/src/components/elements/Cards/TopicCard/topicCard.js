import React, { useEffect } from 'react';
import './topicCard.css';
import { useQuestions } from '../../../util/UseContext/questionsContext';
import { useNavigate } from 'react-router-dom';

export const TopicCard = ({ topic }) => {
    const navigateTo = useNavigate();
    const { questions } = useQuestions();

    const topicFrequency = (questions, topicId) => {
        let freq = 0;

        if (topicId) {
            for (const question of questions) {
                if (question?.topics) { // Ensure 'topics' is defined
                    for (const topic of question?.topics) {
                        if (topic?.id === topicId) {
                            freq = freq + 1;
                        }
                    }
                }
            }
        }

        return freq;
    };

    useEffect(() => {
        // console.log(topicFrequency(questions, topic?._id))
    }, []);

    let topicFreq = topicFrequency(questions, topic?._id)


    return (
        <div className='topicCard'>
            <div className='topicLeftWrap'>
                <div className='topicLeftWrapLeft'>
                    <span className='material-icons topic-icon'>tag</span>
                </div>
                <div className='topicLeftWrapRight'>
                    <div className='topicLeftWrapRightTopicName text-normal'
                        onClick={e => {
                            navigateTo('/search/question/with_topic:_' + topic?.title)
                        }}
                    >{topic?.title}</div>
                    <div className='topicLeftWrapRightQuestionCount text-sm'>Found in {topicFreq} questions</div>
                </div>
            </div>
            {/* <button className='button-secondary'
                onClick={e => {
                    navigateTo('/search/question/with_topic:_' + topic?.title)
                }}
            >
                View Questions
                <span className='material-icons add-icon'>add</span>
            </button> */}
        </div>
    )
}
