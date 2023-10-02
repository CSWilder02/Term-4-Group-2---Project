import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Boarding = ({ user }) => {

    const api_url = process.env.API_URL
    const [loginData, setLoginData] = useState({});
    const [RegisterData, setRegisterData] = useState({});

    useEffect(() => {
        console.log("Login Data", loginData)
        console.log("Register Data", RegisterData)
    }, [loginData]);

    const submitLogin = () => {
        alert("Username: " + loginData.username + ", Password: " + loginData.password + ", url: " + api_url);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `/api/loginUser`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: loginData
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div style={{ width: '400px', display: 'flex', gap: '20px', margin: '0 auto' }}>

            <div style={{ border: '1px solid #999', padding: '10px' }}>
                <div>Login</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input type='text' placeholder='username' onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />
                    <input type='password' placeholder='password' onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                    <button onClick={submitLogin}>Login</button>
                </div>
            </div>

            <div style={{ border: '1px solid #999', padding: '10px' }}>
                <div>Register</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input type='text' placeholder='Full name' />
                    <input type='text' placeholder='email' />
                    <input type='text' placeholder='username' />
                    <input type='file' placeholder='Image' />
                    <textarea type='text' placeholder='Bio' />
                    <input type='password' placeholder='password' />
                    <button>Register</button>
                </div>
            </div>

        </div>
    )
}
