import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../frontend.css';

export const Boarding = ({ user }) => {

    // const api_url = process.env.API_URL
    const api_url = "http://localhost:5000"
    const [loginData, setLoginData] = useState({});
    const [registerData, setRegisterData] = useState({});

    useEffect(() => {
        console.log("Login Data", loginData)
        console.log("Register Data", registerData)
    }, [loginData, registerData]);

    const submitLogin = () => {
        alert("Username: " + loginData.username + ", Password: " + loginData.password + ", url: " + api_url);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: api_url + `/api/loginUser`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: loginData
        };

        axios.request(config)
            .then((response) => {
                console.log(response);
                sessionStorage.setItem("loggedIn", "true")
                sessionStorage.setItem("user", JSON.stringify(response.data.user))
                sessionStorage.setItem("token", response.data.token)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const submitRegister = () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/api/registerUser/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: registerData
        };

        axios.request(config)
            .then((response) => {
                alert("Registered");
                console.log(response);
                sessionStorage.setItem("loggedIn", "true")
                sessionStorage.setItem("user", JSON.stringify(response.data.user))
                sessionStorage.setItem("token", response.data.token)
            })
            .catch((error) => {
                alert(`Error: ${error}`);
                console.log(error);
            });
    }

    return (
        <div className='mainbg'>

            <div className='form'>
                <div className='heading'>Login</div>
                <div className='input_fields'>
                    <input type='text' placeholder='username' onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />
                    <input type='password' placeholder='password' onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                    <button className='login_button' onClick={submitLogin}>Login</button>
                </div>
            </div>

            <div className='form'>
                <div className='heading'>Register</div>
                <div className='input_fields'>
                    <input type='text' onChange={e => setRegisterData({ ...registerData, name: e.target.value })} placeholder='Full name' />
                    <input type='text' onChange={e => setRegisterData({ ...registerData, email: e.target.value })} placeholder='email' />
                    <input type='text' onChange={e => setRegisterData({ ...registerData, username: e.target.value })} placeholder='username' />
                    <input type='file' onChange={e => setRegisterData({ ...registerData, profileImage: e.target.value })} placeholder='Image' />
                    <textarea type='text' onChange={e => setRegisterData({ ...registerData, bio: e.target.value })} placeholder='Bio' />
                    <input type='password' onChange={e => setRegisterData({ ...registerData, password: e.target.value })} placeholder='password' />
                    <button className='login_button' onClick={submitRegister}>Register</button>
                </div>
            </div>

        </div>
    )
}
