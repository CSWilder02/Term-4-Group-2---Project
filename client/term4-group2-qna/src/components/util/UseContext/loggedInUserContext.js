import React, { createContext, useContext, useState, useEffect } from 'react';
import getDataOf from '../DataRequests/fetchData';


// Use Context Creator
const LoggedInUserContext = createContext({});


// User Logged In Context
export const LoggedInUserProvider = ({ children }) => {
    const user = sessionStorage.getItem("user") || {}
    const [loggedInUser, setLoggedInUser] = useState(user);
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("loggedIn"));

    useEffect(() => {
        // Init Value set
        !isLoggedIn || isLoggedIn === "" && sessionStorage.setItem("loggedIn", false);
        !sessionStorage.getItem("user") && sessionStorage.setItem("user", '{ username: "Sign In" }')

        window.addEventListener('storage', function (event) {
            if (event?.storageArea === sessionStorage) {
                const key = event?.key;
                const newValue = event?.newValue;
                const oldValue = event?.oldValue;

                key === "loggedIn" && oldValue !== newValue && setLoggedInUser(newValue)
                console.log(`Key "${key}" changed from "${oldValue}" to "${newValue}"`);
            }
        });
        console.log(loggedInUser)
    }, [loggedInUser, isLoggedIn]);

    return (
        <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </LoggedInUserContext.Provider>
    );
};

export const useLoggedInUser = () => {
    return (useContext(LoggedInUserContext));
};