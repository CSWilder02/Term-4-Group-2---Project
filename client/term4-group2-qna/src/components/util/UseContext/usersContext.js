import React, { createContext, useContext, useState, useEffect } from 'react';
import getDataOf from '../DataRequests/fetchData';


// Use Context Creator
const UsersContext = createContext([]);


// Users Context
export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    return (
        <UsersContext.Provider value={{ users, setUsers }}>
            {children}
        </UsersContext.Provider>
    );
};

export const useUsers = () => {
    return useContext(UsersContext);
};
