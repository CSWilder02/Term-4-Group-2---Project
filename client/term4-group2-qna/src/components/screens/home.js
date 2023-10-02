import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

export const Home = ({ user }) => {
    const [questions, setQuestions] = useState([]);
    const [users, setUsers] = useState([])
    return (
        <div>
            <div>home</div>
            <NavLink to={`user/1`}>user</NavLink>
        </div>
    )
}
