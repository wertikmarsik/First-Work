import React, {useState} from "react";
import "./style.css";
import logo from "../imgs/logo-orange.png";
import google from "../imgs/google-icon.svg";

import {useCallback} from "react";
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";

import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";

function LoginPage() {
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    let navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = userData

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
            const response = await axios.post('http://localhost:3000/user/login', userData)

            if (response.status = 201) {
                const token = response.data.token
                sessionStorage.setItem("Authorization", `Bearer ${token}`)
                navigate('/my')
            } else {
                throw new Error("Error")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login-page">
            <div className="login-wrapper">
                <div className="login-form">
                    <NavLink to="/">
                        <div>
                            <img className="logo" src={logo} alt="logo-orange"></img>
                        </div>
                    </NavLink>
                    <div className="header">Log in</div>
                    <div className="subheader">
                        Welcome back! Please enter your details
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <label className="email-label">
                            Email
                            <input type="text" name="email" className="email-input" value={email} onChange={handleChange}/>
                        </label>
                        <label className="password-label">
                            Password
                            <input
                                type="password"
                                name="password"
                                className="password-input"
                                value={password} onChange={handleChange}
                            />
                        </label>
                        <div>
                            <div>
                                <input type="checkbox" name="checkbox"></input>
                                <label for="checkbox" className="checkbox-label">
                                    Remember for 30 days
                                </label>
                            </div>
                            <a href="#" className="forgot-password">
                                Forgot password
                            </a>
                        </div>
                        <input
                            type="submit"
                            className="sign-in"
                            id="account"
                            value="Sign In"
                        />
                        <a href="http://localhost:3000/auth/google/" className="sign-in" id="google">
                            <img className="google-icon" src={google} alt="logo-google"></img>
                            Sign in with Google
                        </a>
                    </form>
                    <div className="sign-up">
                        Don't have an account?
                        <NavLink to="/signup" className="sign-up-href">
                            <div>Sign up</div>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="animated-bg-login">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={{
                        background: {
                            color: {
                                value: "#F29829",
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

export default LoginPage;
