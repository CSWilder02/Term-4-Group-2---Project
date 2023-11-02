import React, { createContext, useContext, useState, useEffect } from 'react';
import getDataOf from '../DataRequests/fetchData';


// Use Context Creator
const CommunitiesContext = createContext([]);


// Communities Context
export const CommunitiesProvider = ({ children }) => {
    const [communities, setCommunities] = useState([]);

    return (
        <CommunitiesContext.Provider value={{ communities, setCommunities }}>
            {children}
        </CommunitiesContext.Provider>
    );
};

export const useCommunities = () => {
    return useContext(CommunitiesContext);
};