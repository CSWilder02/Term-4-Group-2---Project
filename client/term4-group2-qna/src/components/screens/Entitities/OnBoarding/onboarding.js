import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './onboarding.css';
import { useLoggedInUser, useToken } from '../../../util/UseContext/loggedInUserContext';
import requestDataOf from '../../../util/DataRequests/fetchData';

export const OnBoarding = ({ user, users }) => {
    const { loggedInUser, setLoggedInUser } = useLoggedInUser();
    const { token, setToken } = useToken();
    const [loginData, setLoginData] = useState({});
    const [registerData, setRegisterData] = useState({}); // Declare and initialize registerData
    const navigate = useNavigate(); // Initialize useNavigate

    const loginFormRef = useRef();
    const loginHeadingRef = useRef();
    const loginTextRef = useRef();

    useEffect(() => {
    }, [loginData, registerData, loggedInUser, token, loginFormRef]);

    const submitLogin = (e) => {
        e?.preventDefault()

        // requestDataOf.request(method, endpoint, token, formData) This is the structure of the function
        requestDataOf.request("post", "loginUser", '', loginData)
            .then((response) => {
                let res = response?.data
                sessionStorage.setItem("loggedIn", "true");
                sessionStorage.setItem("user", JSON.stringify(res?.user));
                sessionStorage.setItem("token", res?.token);
                setLoggedInUser(res?.user);
                setToken(res?.token)
                navigate('/'); // Navigate to the "Home" page
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const submitRegister = (e) => {
        e?.preventDefault()
        requestDataOf.request("post", "registerUser", '', registerData)
            .then((response) => {
                sessionStorage.setItem("loggedIn", "true");
                sessionStorage.setItem("user", JSON.stringify(response?.data?.user));
                sessionStorage.setItem("token", response?.data?.token);
                setLoggedInUser(response?.data?.user);
                setToken(response?.data?.token)
            })
            .catch((error) => {
                alert("Error: " + error);
                console.log(error);
            });
    }

    // To switch between Login and Sign Up
    const loginHeading = document.getElementById("login3");
    const loginText = document.getElementById("login2");
    const loginForm = document.getElementById("login");
    const signupBtn = () => {
        // loginForm.style.marginLeft = "-50%";
        // loginText.style.marginLeft = "-50%";
        // loginHeading.style.marginLeft = "-50%";
        loginFormRef.current.style.marginLeft = "-50%"
        loginHeadingRef.current.style.marginLeft = "-50%"
        loginTextRef.current.style.marginLeft = "-50%"
    };
    const loginBtn = () => {
        // loginForm.style.marginLeft = "0%";
        // loginText.style.marginLeft = "0%";
        // loginHeading.style.marginLeft = "0%";
        loginFormRef.current.style.marginLeft = "0%"
        loginHeadingRef.current.style.marginLeft = "0%"
        loginTextRef.current.style.marginLeft = "0%"
    };

    return (
        <div className='mainbg'>

            <div className="wrapper">
                <div className='form'>
                    <div className='title login' id="login3" ref={loginHeadingRef}>Login Form</div>
                    <div className='title2 signup'>Signup Form</div>
                </div>
                <div className="form-container">
                    <div className="slide-controls">
                        <input type="radio" name="slide" id="login" ref={loginFormRef} checked />
                        <input type="radio" name="slide" id="signup" />
                        <label for="login" className="slide primary" onClick={loginBtn}>Login</label>
                        <label for="signup" className="slide signup" onClick={signupBtn}>Signup</label>
                        <div className="slider-tab"></div>
                    </div>
                    <div className="form-inner">
                        <form action="#" className="login" id="login2" ref={loginTextRef}>
                            <div >
                                <input className="field3" type="text" placeholder="Username" onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />
                            </div>
                            <div>
                                <input className="field3" style={{ marginLeft: '1px', marginTop: '10px' }} type="password" placeholder="Password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                            </div>

                            <button className='button-primary' onClick={e => submitLogin(e)}>Log In</button>

                        </form>
                        <form action="#" className="signup">
                            <div>
                                <input className="field2" type="text" placeholder="Username" onChange={e => setRegisterData({ ...registerData, name: e.target.value })} />
                            </div>
                            <div>
                                <input className="field2" style={{ marginTop: '10px' }} type="text" placeholder="Email" onChange={e => setRegisterData({ ...registerData, email: e.target.value })} />
                            </div>
                            <div className="field_file">
                                <input className="field2" style={{ marginTop: '10px', paddingTop: '9px' }} type="file" placeholder="Image" onChange={e => setRegisterData({ ...registerData, profileImage: e.target.value })} />
                            </div>
                            <div>
                                <input className="field2" style={{ marginTop: '10px' }} type="password" placeholder="Password" onChange={e => setRegisterData({ ...registerData, password: e.target.value })} />
                            </div>
                            <div>
                                <button className='signup_button' onClick={e => submitRegister(e)}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}