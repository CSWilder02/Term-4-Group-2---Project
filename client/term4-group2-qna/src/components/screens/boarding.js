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

    // To switch between Login and Sign Up
    const loginHeading = document.getElementById("login3");
    const loginText = document.getElementById("login2");
    const loginForm = document.getElementById("login");
    const signupBtn = () => {
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
        loginHeading.style.marginLeft = "-50%";
    };
    const loginBtn = () => {
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
        loginHeading.style.marginLeft = "0%";
    };

    return (
        <div className='mainbg'>

            <div className="wrapper">
                <div className='form'>
                    <div className='title login' id="login3">Login Form</div>
                    <div className='title signup'>Signup Form</div>
                </div>
                <div className="form-container">
                    <div className="slide-controls">
                        <input type="radio" name="slide" id="login" checked/>
                        <input type="radio" name="slide" id="signup"/>
                        <label for="login" className="slide login" onClick={loginBtn}>Login</label>
                        <label for="signup" className="slide signup" onClick={signupBtn}>Signup</label>
                        <div class="slider-tab"></div>
                    </div>
                    <div class="form-inner">
                        <form action="#" className="login" id="login2">
                            <div className="field">
                                <input type="text" placeholder="Username" onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}/>
                            </div>
                            <div className="field">
                                <input type="password" placeholder="Password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}/>
                            </div>
                            <div className="field btn">
                            <button className='login_button' onClick={submitLogin}>Log In</button>
                            </div>
                        </form>
                        <form action="#" className="signup">
                            <div className="field">
                                <input type="text" placeholder="Full Name" onChange={e => setRegisterData({ ...registerData, name: e.target.value })}/>
                            </div>
                            <div className="field">
                                <input type="text" placeholder="Email"  onChange={e => setRegisterData({ ...registerData, email: e.target.value })}/>
                            </div>
                            <div className="field">
                                <input type="text" placeholder="Username" onChange={e => setRegisterData({ ...registerData, username: e.target.value })}/>
                            </div>
                            <div className="field_file">
                                <input type="file" placeholder="Image" className="" onChange={e => setRegisterData({ ...registerData, profileImage: e.target.value })}/>
                            </div>
                            <div className="field">
                                <input type="text" placeholder="Bio" onChange={e => setRegisterData({ ...registerData, bio: e.target.value })}/>
                            </div>
                            <div className="field">
                                <input type="password" placeholder="Password" onChange={e => setRegisterData({ ...registerData, password: e.target.value })}/>
                            </div>
                            <div>
                                <button className='signup_button' onClick={submitRegister}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
