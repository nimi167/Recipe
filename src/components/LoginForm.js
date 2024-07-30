import React, { useState } from 'react';
import { FaRegEnvelope } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function LoginForm() {
    const BaseURL = process.env.REACT_APP_BASE_URL;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert('Please provide both email and password.');
            return;
        }

        try {
            const response = await fetch(`${BaseURL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                if (data.authToken) {
                    console.log(data.authToken)
                    const response = await fetch(`${BaseURL}/auth/Get/User`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': data.authToken
                        }
                    });
                    if (response.status === 200) {
                        const data = await response.json();
                        console.log(data.user._id)
                        localStorage.setItem('userId', data.user._id);
                    } else {
                        alert(response.status)
                    }
                    localStorage.setItem('token', data.authToken);
                    navigate('/');
                    setFormData({
                        email: '',
                        password: ''
                    })
                }
            } else {
                alert('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <div className="col-lg-6 col-12 p-5 position-relative">
                <div className="fs-3 fw-semibold mb-3">Welcome Back!</div>
                <form className='mx-2' onSubmit={handleLogin}>
                    <div className="row border rounded-top mx-3 my-1 pt-1">
                        <div className="col-1 text-end pe-0"><FaRegEnvelope className='colorGray' size={20} /></div>
                        <div className="col-11 ps-0">
                            <input
                                type="email"
                                placeholder='Enter Email'
                                className='border-0 ms-3 w-75 py-1'
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row border rounded-bottom border-top-0 mx-3 my-1 pt-1">
                        <div className="col-1 text-end pe-0"><MdLockOutline className='colorGray' size={20} /></div>
                        <div className="col-11 ps-0">
                            <input
                                type="password"
                                placeholder='Enter Password'
                                className='border-0 ms-3 w-75 py-1'
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="fs-6 colorGray m-3 ">
                        <input type="checkbox" className='' name="" id="" />
                        <span className='fs-small ps-1'> I agree to the term & policy </span>
                    </div>
                    <div className="fs-6 colorGray m-3 ">
                        <button type="submit" className="btn bgRed colorWhite mx-1 boxShadowRed px-5 border-0">Login</button>
                    </div>
                </form>
                <div className="fs-6 colorGray my-2 mx-3 my-4"><span className='fs-small'>Or you can join with</span></div>
                <div className="row d-flex justify-content-evenly">
                    <div className="my-1 col-5 d-flex justify-content-center text-center rounded py-1 pointer fs-small">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                try {
                                    const decoded = jwtDecode(credentialResponse.credential);

                                    // Prepare the registration data
                                    const userData = {
                                        name: decoded.name,
                                        email: decoded.email,
                                        password: "G-Auth",
                                        repeatPassword: "G-Auth",
                                        agreedToTerms: decoded.email_verified,
                                    };

                                    // Send the user data to the server
                                    const response = await fetch(`${BaseURL}/Google/Signup`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(userData),
                                    });

                                    if (response.ok) {
                                        const data = await response.json();
                                        if (data.authToken) {
                                            const response = await fetch(`${BaseURL}/auth/Get/User`, {
                                                method: 'GET',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': data.authToken
                                                }
                                            });
                                            if (response.status === 200) {
                                                const data = await response.json();
                                                localStorage.setItem('userId', data.user._id);
                                            }
                                            localStorage.setItem('token', data.authToken);
                                            navigate('/');
                                            setFormData({
                                                name: '',
                                                email: '',
                                                password: '',
                                                repeatPassword: '',
                                                agreedToTerms: false,
                                            })
                                            window.location.reload()
                                        }
                                    } else if (response.status === 400) {
                                        alert('User Already Exists with this Email');
                                    } else {
                                        // Handle other error scenarios
                                        console.error('Error during Google login:', response.statusText);
                                    }
                                } catch (error) {
                                    console.error('Error during Google login:', error);
                                    alert('An error occurred. Please try again later.');
                                }
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                </div>
                <div className="colorGray fs-small mx-3 my-2">Don't have an account? <span className='colorRed' id='SignUp'>SignUp</span></div>
                <div className="logoPosition">
                    <Logo />
                </div>
            </div>
        </>
    );
}