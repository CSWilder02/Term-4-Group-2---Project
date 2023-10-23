import React, { createContext, useContext, useState, useEffect } from 'react';
import requestDataOf from '../DataRequests/fetchData';
import { useToken } from './loggedInUserContext';
import { useInteraction } from '../UI/interactionListener';

const QuestionsContext = createContext([]);

export const QuestionsProvider = ({ children }) => {
    const { token } = useToken();
    const interaction = useInteraction();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Initialize questions from session storage
        const storedQuestions = sessionStorage.getItem('questions');
        requestDataOf
            .request("get", "getQuestions", token, "")
            .then((response) => {
                const newQuestions = response?.data;
                sessionStorage.setItem('questions', JSON.stringify(newQuestions));
                setQuestions(newQuestions);
            });
    }, [token,]); // Dependencies that trigger the initialization

    return (
        <QuestionsContext.Provider value={{ questions, setQuestions }}>
            {children}
        </QuestionsContext.Provider>
    );
};

export const useQuestions = () => {
    return useContext(QuestionsContext);
};
