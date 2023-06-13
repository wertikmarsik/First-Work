import React, {useEffect, useState} from "react";
import "./style.css";
import "../../variables.css";
import Topbar from "../../topBar";
import Navbar from "../../navbar";
import {NavLink} from "react-router-dom";
import bitcoin from "../../imgs/bitcoin.svg";
import litecoin from "../../imgs/litecoin.svg";
import ethereum from "../../imgs/ethereum.svg";
import axios from "axios";

function TradePage() {

    const [currencies, setCurrencies] = useState([])

    const getCurrencies = async () => {
        try {
            const response = await axios.get('http://localhost:3000/currency/getAll')

            if (response.status === 200) {
                setCurrencies(response.data.message)
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCurrencies()
    }, [])

    return (
        <div>
            <Navbar/>
            <div className="main-page">
                <div className="main-wrapper">
                    <Topbar/>
                    {currencies.map(currency => (
                        <div className="trade-wrapper" key={currency._id}>
                            {currency.name === "BTC" && (
                                <NavLink to="/my/trade/bitcoin" className="link-trade">
                                    <div className="crypto-block">
                                        <div className="crypto-name">
                                            <div className="icon-wrapper">
                                                <img src={bitcoin} alt="bitcoin"></img>
                                            </div>
                                            <div>Bitcoin</div>
                                        </div>
                                        <div className="crypto-change-green">+1,16%</div>
                                        <div className="crypto-price">${currency.USD}</div>
                                    </div>
                                </NavLink>
                            )}
                            {currency.name === "LTC" && (
                                <NavLink to="/my/trade/litecoin" className="link-trade">
                                    <div className="crypto-block">
                                        <div className="crypto-name">
                                            <div className="icon-wrapper">
                                                <img src={litecoin} alt="litecoin"></img>
                                            </div>
                                            <div>Litecoin</div>
                                        </div>
                                        <div className="crypto-change-red">-0,2%</div>
                                        <div className="crypto-price">${currency.USD}</div>
                                    </div>
                                </NavLink>
                            )}
                            {currency.name === "ETH" && (
                                <NavLink to="/my/trade/ethereum" className="link-trade">
                                    <div className="crypto-block">
                                        <div className="crypto-name">
                                            <div className="icon-wrapper">
                                                <img src={ethereum} alt="ethereum"></img>
                                            </div>
                                            <div>Ethereum</div>
                                        </div>
                                        <div className="crypto-change-green">+6,05%</div>
                                        <div className="crypto-price">${currency.USD}</div>
                                    </div>
                                </NavLink>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TradePage;
