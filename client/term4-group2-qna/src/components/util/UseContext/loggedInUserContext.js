import React, { createContext, useContext, useState, useEffect } from 'react';

const LoggedInUserContext = createContext({});
const TokenContext = createContext("");
const LoggedInContext = createContext("");


// Current User Logged In
export const LoggedInUserProvider = ({ children }) => {
    const initialUser = sessionStorage.getItem("user");
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        if (sessionStorage.getItem("user") !== null) {
            if (initialUser) {
                try {
                    let user = JSON.parse(initialUser)
                    setLoggedInUser(user)
                } catch (error) {
                    setLoggedInUser({})
                }
            } else {
                setLoggedInUser({})
            }
        }
    }, []);

    return (
        <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </LoggedInUserContext.Provider>
    );
};

export const useLoggedInUser = () => {
    return useContext(LoggedInUserContext);
};


// Token
export const TokenProvider = ({ children }) => {
    const initialToken = sessionStorage.getItem("token");
    const [token, setToken] = useState(initialToken);

    useEffect(() => {
        if (sessionStorage.getItem("token") !== null) {
            if (initialToken) {
                try {
                    let tkn = JSON.parse(initialToken)
                    setToken(tkn)
                } catch (error) {
                    setToken("")
                }
            } else {
                setToken("")
            }
        }
    }, []);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => {
    return useContext(TokenContext);
};


// Logged In status
export const LoggedInProvider = ({ children }) => {
    const initialIsLoggedIn = sessionStorage.getItem("loggedIn");
    const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);

    useEffect(() => {
        if (sessionStorage.getItem("loggedIn") !== null) {
            if (initialIsLoggedIn) {
                try {
                    let status = JSON.parse(initialIsLoggedIn)
                    setIsLoggedIn(status)
                } catch (error) {
                    setIsLoggedIn("")
                }
            } else {
                setIsLoggedIn("")
            }
        }
    }, []);

    return (
        <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </LoggedInContext.Provider>
    );
};

export const useLoggedIn = () => {
    return useContext(LoggedInContext);
};
