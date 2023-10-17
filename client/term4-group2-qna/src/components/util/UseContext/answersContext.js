import React, { createContext, useContext, useState, useEffect } from 'react';
import getDataOf from '../DataRequests/fetchData';


// Use Context Creator
const AnswersContext = createContext([]);


// Answers Context
export const AnswersProvider = ({ children }) => {
    const [answers, setAnswers] = useState([]);

    return (
        <AnswersContext.Provider value={{ answers, setAnswers }}>
            {children}
        </AnswersContext.Provider>
    );
};

export const useAnswers = () => {
    return useContext(AnswersContext);
};