import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import Logo from '../components/Logo'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
export default function JoinOurFamily() {
    const BaseURL = process.env.REACT_APP_BASE_URL;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        agreedToTerms: false,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        // Check if passwords match
        if (formData.password !== formData.repeatPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Prepare the registration data
        const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            isTnC: formData.agreedToTerms,
        };

        try {
            const response = await fetch(`${BaseURL}/Signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            // console.log(response)
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
                        console.log(data.user._id)
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
                }
            }
            if (response.status === 400) {
                alert("User Already exist with this Email")
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="col-lg-6 col-12 p-5 position-relative">
            <div className="fs-3 fw-semibold ">Want to Join Our Family</div>
            <form className='mx-md-2 mx-0' onSubmit={handleSignUp}>
                <div className="row border rounded-top mx-sm-3 mx-0 my-1 pt-1">
                    <div className="col-1  text-end pe-0"><FaRegUserCircle className='colorGray' size={20} /></div>
                    <div className="col-11  ps-0"> <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Enter Name' className='border-0 ms-3 w-75 py-1' required /></div>
                </div>
                <div className="row border  border-top-0 mx-sm-3 mx-0 my-1 pt-1">
                    <div className="col-1  text-end pe-0"><FaRegEnvelope className='colorGray' size={20} /></div>
                    <div className="col-11  ps-0"> <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter Email' className='border-0 ms-3 w-75 py-1' required /></div>
                </div>
                <div className="row border  border-top-0 mx-sm-3 mx-0 my-1 pt-1">
                    <div className="col-1  text-end pe-0"><MdLockOutline className='colorGray' size={20} /></div>
                    <div className="col-11  ps-0"> <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Enter Password' className='border-0 ms-3 w-75 py-1' required /></div>
                </div>
                <div className="row border  rounded-bottom border-top-0 mx-sm-3 mx-0 my-1 pt-1">
                    <div className="col-1  text-end pe-0"><MdLockOutline className='colorGray' size={20} /></div>
                    <div className="col-11  ps-0"> <input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} placeholder='Repeat Password' className='border-0 ms-3 w-75 py-1' required /></div>
                </div>
                <div className="fs-6 colorGray m-3 ">
                    <input
                        type="checkbox"
                        className=""
                        name="agreedToTerms"
                        id=""
                        checked={formData.agreedToTerms}
                        onChange={handleChange}
                    />
                    <span className='fs-small ps-1'> I agree to the terms & policy </span>
                </div>
                <div className="fs-6 colorGray m-3 ">
                    <button type="submit" className="btn bgRed colorWhite mx-1 boxShadowRed px-5 border-0">Sign up</button>
                </div>
            </form>
            <div className="fs-6 colorGray my-2 mx-3 my-4"><span className='fs-small'>Or you can join with</span></div>
            <div className="row d-md-flex d-block justify-content-evenly">

                <div className="my-1 col-6 d-flex justify-content-center text-center rounded py-1 pointer fs-small">
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
                                const response = await fetch(`${BaseURL}/Signup`, {
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
                                            // console.log(data.user._id)
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
            <div className="colorGray fs-small mx-3 my-2">Already have an account?<span className='colorRed'>login</span></div>

            <div className="logoPosition">
                <Logo />
            </div>
        </div>
    );
}