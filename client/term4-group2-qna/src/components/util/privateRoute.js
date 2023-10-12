import { React, useContext, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
// import { LoginContext } from '../App';
// import { isLogin } from '../u/tils';

const PrivateRoute = ({ children }) => {

    const loggedIn = sessionStorage.getItem("loggedIn")

    useEffect(() => {
    }, [loggedIn])

    return (

        // loggedIn === "true" ? children : <Navigate to="/boarding" />
        children
    )
};

export default PrivateRoute;