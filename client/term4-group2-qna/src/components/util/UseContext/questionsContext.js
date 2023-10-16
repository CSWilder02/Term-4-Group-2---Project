import React, { createContext, useContext, useState, useEffect } from 'react';
import requestDataOf from '../DataRequests/fetchData';
import { useToken } from './loggedInUserContext';


// Use Context Creator
const QuestionsContext = createContext([]);


// Questions Context
export const QuestionsProvider = ({ children }) => {
    const { token } = useToken();
    const [questions, setQuestions] = useState([]);

    // Init
    useEffect(() => {
        requestDataOf.request("get", "getQuestions", token, "")
            .then((response) => {
                sessionStorage.setItem('questions', JSON.stringify(response?.data))
            }).then(setQuestions(JSON.parse(sessionStorage.getItem('questions'))));
    }, [])

    // Listen for changes
    useEffect(() => {
        window.addEventListener('storage', function (event) {
            if (event?.storageArea === sessionStorage) {
                const key = event?.key;
                const newValue = event?.newValue;
                const oldValue = event?.oldValue;

                key === "questions" && oldValue !== newValue && setQuestions(JSON.parse(newValue))
                console.log(`Key "${key}" changed from "${oldValue}" to "${newValue}"`);

                // Get Questions on change
                requestDataOf.request("get", "getQuestions", token, "")
                    .then((response) => {
                        sessionStorage.setItem('questions', JSON.stringify(response?.data))
                    }).then(setQuestions(JSON.parse(sessionStorage.getItem('questions'))));
            }
        });
    }, [questions]);

    return (
        <QuestionsContext.Provider value={{ questions, setQuestions }}>
            {children}
        </QuestionsContext.Provider>
    );
};

export const useQuestions = () => {
    return useContext(QuestionsContext);
};