import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const QuestionPage = () => {
    const [questionData, setQuestionData] = useState({});
    const user = JSON.stringify(sessionStorage.getItem("user"));

    useEffect(() => {
        console.log("Question", questionData)
    }, [questionData]);

    const submitQuestion = () => {
        setQuestionData({ ...questionData, questioner: user?._id })
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/api/createQuestion/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            data: questionData
        };

        axios.request(config)
            .then((response) => {
                alert("Qustion submitted");
                console.log(response);
            })
            .catch((error) => {
                alert(`Error: ${error}`);
                console.log(error);
            });
    };

    return (
        <div style={{ width: '400px', display: 'flex', gap: '20px', margin: '0 auto' }}>
            <div style={{ border: '1px solid #999', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                <div>Ask question</div>
                <input type='text' onChange={e => setQuestionData({ ...questionData, title: e.target.value })} placeholder='Title' />
                <textarea type='text' onChange={e => setQuestionData({ ...questionData, question: e.target.value })} placeholder='Vra jou vraag' />
                <input type='text' onChange={e => setQuestionData({ ...questionData, topic: e.target.value })} placeholder='Topic' />
                <button onClick={submitQuestion}>Ask Question</button>
            </div>
        </div>
    )
}
