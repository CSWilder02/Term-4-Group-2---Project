import React, { createContext, useContext, useState, useEffect } from 'react';
import getDataOf from '../DataRequests/fetchData';


// Use Context Creator
const RepliesContext = createContext([]);


// Replies Context
export const RepliesProvider = ({ children }) => {
    const [replies, setReplies] = useState([]);

    return (
        <RepliesContext.Provider value={{ replies, setReplies }}>
            {children}
        </RepliesContext.Provider>
    );
};

export const useReplies = () => {
    return useContext(RepliesContext);
};