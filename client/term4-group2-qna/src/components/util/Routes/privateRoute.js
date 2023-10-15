import { React, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const loggedIn = sessionStorage.getItem("loggedIn")

    useEffect(() => {
    }, [loggedIn])

    return (
        loggedIn === "true" ? children : <Navigate to="/boarding" />
        // children
    )
};

export default PrivateRoute;