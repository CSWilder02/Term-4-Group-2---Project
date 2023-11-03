import React, { createContext, useContext, useState, useEffect } from 'react';
import requestDataOf from '../DataRequests/fetchData';
import { useToken } from './loggedInUserContext';


// Use Context Creator
const TopicsContext = createContext([]);


// Topics Context
export const TopicsProvider = ({ children }) => {
    const [topics, setTopics] = useState([]);
    let token = sessionStorage?.getItem("token")

    useEffect(() => {
        requestDataOf
            .request("get", "getTopics", token, "")
            .then((response) => {
                const newTopics = response;
                setTopics(newTopics);
                console.log("get topics", response)
            })
            .catch(err => { console.log(err); setTopics(err) });
    }, []);

    return (
        <TopicsContext.Provider value={{ topics, setTopics }}>
            {children}
        </TopicsContext.Provider>
    );
};

export const useTopics = () => {
    return useContext(TopicsContext);
};