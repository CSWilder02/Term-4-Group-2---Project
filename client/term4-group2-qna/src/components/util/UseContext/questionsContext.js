import React, { createContext, useContext, useState, useEffect } from 'react';
import requestDataOf from '../DataRequests/fetchData';
import { useToken } from './loggedInUserContext';

const QuestionsContext = createContext([]);

export const QuestionsProvider = ({ children }) => {
    const { token } = useToken();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Initialize questions from session storage
        const storedQuestions = sessionStorage.getItem('questions');
        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
        } else {
            requestDataOf
                .request("get", "getQuestions", token, "")
                .then((response) => {
                    const newQuestions = response?.data;
                    sessionStorage.setItem('questions', JSON.stringify(newQuestions));
                    setQuestions(newQuestions);
                });
        }
    }, [token]); // Make sure to include dependencies that trigger the initialization

    useEffect(() => {
        // Listen for changes in session storage
        const handleStorageChange = (event) => {
            if (event?.storageArea === sessionStorage && event?.key === 'questions') {
                const newValue = event?.newValue;
                setQuestions(JSON.parse(newValue));
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <QuestionsContext.Provider value={{ questions, setQuestions }}>
            {children}
        </QuestionsContext.Provider>
    );
};

export const useQuestions = () => {
    return useContext(QuestionsContext);
};
