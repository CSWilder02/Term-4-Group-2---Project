import React, { createContext, useContext, useState, useEffect } from 'react';
import getDataOf from '../DataRequests/fetchData';
import requestDataOf from '../DataRequests/fetchData';
import { useInteraction } from '../UI/interactionListener';
import { useToken } from './loggedInUserContext';


// Use Context Creator
const AnswersContext = createContext([]);


// Answers Context
export const AnswersProvider = ({ children }) => {
    const [answers, setAnswers] = useState([]);
    const { token } = useToken();
    const interaction = useInteraction();

    useEffect(() => {
        // Initialize questions from session storage
        const storedAnswers = sessionStorage.getItem('answers');
        requestDataOf
            .request("get", "getAnswers", token, "")
            .then((response) => {
                const newAnswers = response?.data;
                sessionStorage.setItem('questions', JSON.stringify(newAnswers));
                setAnswers(newAnswers);
            });
    }, [token, interaction]);

    return (
        <AnswersContext.Provider value={{ answers, setAnswers }}>
            {children}
        </AnswersContext.Provider>
    );
};

export const useAnswers = () => {
    return useContext(AnswersContext);
};