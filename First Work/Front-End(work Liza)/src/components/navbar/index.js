import React, {useEffect, useState} from "react";
import "./style.css";
import "../variables.css";
import profile from "../imgs/person-circle.svg";
import wallet from "../imgs/wallet.svg";
import robot from "../imgs/robot.svg";
import settings from "../imgs/sliders.svg";
import graph from "../imgs/graph-up-arrow.svg";
import logout_icon from "../imgs/box-arrow-left.svg";
import {NavLink} from "react-router-dom";
import axios from "axios";

function Navbar() {

    const [user, setUser] = useState(null)

    const getUserProfile = async () => {
        try {
            const token = sessionStorage.getItem("Authorization")
            axios.defaults.headers.common.Authorization = token
            const response = await axios.get('http://localhost:3000/user/profile')

            if (response.status === 200) {
                setUser(response.data)
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!user) {
            getUserProfile()
        }
    }, [])

    const logOutButton = async () => {
        sessionStorage.clear()
    }

    return (
        <div className="navbar">
            <div className="wrapper">
                <NavLink to="/my" className="logo">
                    <div>CryptoHive</div>
                </NavLink>
                <div className="profile">
                    <div>
                        <img src={user ? user.avatar : profile} alt="profile-icon"/>
                        <div>{user ? user.username : 'Loading...'}</div>
                    </div>
                </div>
                <div className="links">
                    <div>
                        <img src={wallet} alt="wallet-icon"/>
                        <NavLink to="/my/wallet" className="link" activeclassname="active">
                            <div>Wallet</div>
                        </NavLink>
                    </div>
                    <div>
                        <img src={settings} alt="settings-icon"/>
                        <NavLink
                            to="/my/settings"
                            className="link"
                            activeclassname="active"
                        >
                            <div>Settings</div>
                        </NavLink>
                    </div>
                    <div>
                        <img src={graph} alt="graph-icon"/>
                        <NavLink to="/my/trade" className="link" activeclassname="active">
                            <div>Trade</div>
                        </NavLink>
                    </div>
                    <div>
                        <img src={robot} alt="robot-icon"/>
                        <NavLink to="/my/chatbot" className="link" activeclassname="active">
                            <div>ChatBot</div>
                        </NavLink>
                    </div>
                    <div className="link-logout">
                        <img src={logout_icon} alt="logout_icon"/>
                        <NavLink to="/" className="link" activeclassname="active" onClick={logOutButton}>
                            <div>Log out</div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
