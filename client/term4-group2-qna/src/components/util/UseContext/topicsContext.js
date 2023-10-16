import React, { createContext, useContext, useState, useEffect } from 'react';
import getDataOf from '../DataRequests/fetchData';


// Use Context Creator
const TopicsContext = createContext([]);


// Topics Context
export const TopicsProvider = ({ children }) => {
    const [topics, setTopics] = useState([]);

    return (
        <TopicsContext.Provider value={{ topics, setTopics }}>
            {children}
        </TopicsContext.Provider>
    );
};

export const useTopics = () => {
    return useContext(TopicsContext);
};