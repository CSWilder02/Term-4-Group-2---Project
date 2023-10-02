import { React, useContext, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
// import { LoginContext } from '../App';
// import { isLogin } from '../u/tils';

const PrivateRoute = ({ children }) => {

    const loggedIn = sessionStorage.getItem("loggedIn")

    useEffect(() => {
    }, [loggedIn])

    return (

        loggedIn[0] === "true" ? children : <Navigate to="/boarding" />
    )
};

export default PrivateRoute;