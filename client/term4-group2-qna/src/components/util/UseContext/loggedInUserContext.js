import React, { createContext, useContext, useState, useEffect } from 'react';
import getDataOf from '../DataRequests/fetchData';


// Use Context Creator
const LoggedInUserContext = createContext({});
const TokenContext = createContext("");


// User Logged In Context
export const LoggedInUserProvider = ({ children }) => {
    const user = sessionStorage.getItem("user") || {}
    const [loggedInUser, setLoggedInUser] = useState(user);
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("loggedIn"));

    useEffect(() => {
        setLoggedInUser(user)
    }, [])

    useEffect(() => {
        // Init Value set
        !isLoggedIn || isLoggedIn === "" && sessionStorage.setItem("loggedIn", false);
        !sessionStorage.getItem("user") && sessionStorage.setItem("user", '{ username: "Sign In" }')

        window.addEventListener('storage', function (event) {
            if (event?.storageArea === sessionStorage) {
                const key = event?.key;
                const newValue = event?.newValue;
                const oldValue = event?.oldValue;

                key === "user" && oldValue !== newValue && setLoggedInUser(JSON.parse(newValue));
                sessionStorage.setItem('user', newValue)
                console.log(`Key "${key}" changed from "${oldValue}" to "${JSON.parse(newValue)}"`);
            }
        });
        // console.log(loggedInUser)
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


// User Token Context
export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    useEffect(() => {
        window.addEventListener('storage', function (event) {
            if (event?.storageArea === sessionStorage) {
                const key = event?.key;
                const newValue = event?.newValue;
                const oldValue = event?.oldValue;

                key === "token" && oldValue !== newValue && setToken(newValue)
                console.log(`Token "${key}" changed from "${oldValue}" to "${newValue}"`);
            }
        });
    }, [token])

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => {
    return useContext(TokenContext);
};