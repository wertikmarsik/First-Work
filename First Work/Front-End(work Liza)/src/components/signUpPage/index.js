import React, {useEffect, useState} from "react";
import "./style.css";
import logo from "../imgs/logo-orange.png";
import google from "../imgs/google-icon.svg";
import apple from "../imgs/Apple_logo_black.svg";

import {useCallback} from "react";
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";

import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";


function SignUpPage() {
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);
    //===================

    let navigate = useNavigate()

    useEffect(() => {
        const token = sessionStorage.getItem("Authorization")

        if (token) {
            navigate('/my')
        } else {
            console.log("Nea")
        }

    }, [navigate])

    const [userData, setUserData] = useState({
        username: '',
        surname: '',
        email: '',
        password: ''
    })

    const {username, surname, email, password} = userData

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        })
        console.log(userData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:3000/user/register', userData)

            if (response.status = 201) {
                navigate('/login')
            } else {
                throw new Error("Error")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="sign-page">
            <div className="sign-wrapper">
                <NavLink to="/">
                    <div>
                        <img className="logo-small" src={logo} alt="logo-orange"></img>
                    </div>
                </NavLink>
                <div className="sign-form">
                    <div className="header">Create an account</div>
                    <div className="subheader">
                        Describe yourself as clearly so that there are no mistakes
                    </div>
                    <a href="http://localhost:3000/auth/google/" className="sign-up-btn" id="google-sign-up">
                        <img className="google-icon" src={google} alt="logo-google"></img>
                        Continue with Google
                    </a>
                    <a href="http://localhost:3000/auth/google/" className="sign-up-btn" id="apple-sign-up">
                        <img className="apple-icon" src={apple} alt="logo-apple"></img>
                        Continue with Apple
                    </a>
                    <div className="hr">
                        <hr/>
                        <div>or</div>
                        <hr/>
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="name-wrapper">
                            <input
                                type="text"
                                name="username"
                                className="name-input"
                                placeholder="Name"
                                value={username}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="surname"
                                className="name-input"
                                placeholder="Surname"
                                value={surname}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            type="text"
                            name="email"
                            className="email-input"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            className="password-input"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                        />
                        <div className="terms-of-service">
                            <input type="checkbox" name="checkbox"></input>
                            <label for="checkbox" className="checkbox-label">
                                <a href="#">Yes, I agree with Terms of service</a>
                            </label>
                        </div>
                        <input
                            type="submit"
                            className="sign-up-submit"
                            id="account"
                            value="Create an account"
                        />
                    </form>
                    <div className="log-in">
                        Already have an account?
                        <NavLink to="/login" className="log-in-href">
                            <div>Log in</div>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="animated-bg-sign">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={{
                        background: {
                            color: {
                                value: "#522882",
                            },
                        },
                        fullScreen: {enable: true, zIndex: -10},
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: false,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: false,
                                    mode: "repulse",
                                },
                                resize: true,
                            },
                            modes: {
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: "#ffffff",
                            },
                            links: {
                                color: "#ffffff",
                                distance: 150,
                                enable: true,
                                opacity: 0.5,
                                width: 1,
                            },
                            collisions: {
                                enable: true,
                            },
                            move: {
                                directions: "none",
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: false,
                                speed: 1,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 1000,
                                },
                                value: 120,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: {min: 1, max: 5},
                            },
                        },
                        detectRetina: true,
                    }}
                />
            </div>
        </div>
    );
}

export default SignUpPage;
