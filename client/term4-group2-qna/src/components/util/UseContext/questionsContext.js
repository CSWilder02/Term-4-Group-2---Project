import React, { createContext, useContext, useState, useEffect } from 'react';
import getDataOf from '../DataRequests/fetchData';


// Use Context Creator
const QuestionsContext = createContext([]);


// Questions Context
export const QuestionsProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);

    return (
        <QuestionsContext.Provider value={{ questions, setQuestions }}>
            {children}
        </QuestionsContext.Provider>
    );
};

export const useQuestions = () => {
    return useContext(QuestionsContext);
};