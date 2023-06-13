import React, {useEffect, useState} from "react";
import "./style.css";
import "../../variables.css";
import Topbar from "../../topBar";
import Navbar from "../../navbar";
import arr1 from "../../imgs/ArrowLeftRight.svg";
import arr2 from "../../imgs/ArrowBottom.svg";
import arr3 from "../../imgs/ArrowTop.svg";
import dollar from "../../imgs/Dollar.svg";
import bitcoin from "../../imgs/bitcoin.svg";
import litecoin from "../../imgs/litecoin.svg";
import ethereum from "../../imgs/ethereum.svg";
import diagram from "../../imgs/diagram.png";
import {NavLink} from "react-router-dom";
import axios from "axios";

function WalletPage() {

    const [user, setUser] = useState(null)
    const [transactions, setTransactions] = useState([])
    const [currencies, setCurrencies] = useState([])

    const token = sessionStorage.getItem("Authorization")
    axios.defaults.headers.common.Authorization = token

    const getUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:3000/user/profile')

            if (response.status === 200) {
                setUser(response.data)
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getThreeTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/transactions/getThree')

            if (response.status === 200) {
                setTransactions(response.data.message)
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getCurrencies = async () => {
        try {
            const response = await axios.get("http://localhost:3000/currency/getAll")

            if (response.status === 200) {
                setCurrencies(response.data.message)
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!user) {
            getUserProfile()
        }
        getThreeTransactions()
        getCurrencies()
    }, [])

    const logOutButton = async () => {
        sessionStorage.clear()
    }

    return (
        <div>
            <Navbar/>
            <div className="main-page">
                <div className="main-wrapper">
                    <Topbar/>
                    <div className="wallet-wrapper">
                        <div className="block-1">
                            <div className="block-name">Your balance:</div>
                            <div className="balance">{user ? `$ ${user.USD}` : 'Loading...'}</div>
                            <div className="balance-functions">
                                <div>
                                    <img src={arr1} alt="icon"></img>
                                </div>
                                <div>
                                    <img src={arr2} alt="icon"></img>
                                </div>
                                <div>
                                    <img src={arr3} alt="icon"></img>
                                </div>
                                <div>
                                    <img src={dollar} alt="icon"></img>
                                </div>
                            </div>
                        </div>

                        <div className="block-2">
                            <div className="block-name">Transactions:</div>
                            <NavLink
                                to="/my/wallet/transactions"
                                className="link-transactions"
                            >
                                <div className="transaction-table">
                                    {transactions.length === 0 ? (
                                        <h3>No transactions here</h3>) : transactions.map(transaction => (
                                        <div key={transaction._id}>
                                            {transaction.status === 'Requested' && (
                                                <div>
                                                    <div className="square orange">
                                                        {transaction.type === "Sent" && (
                                                            <img src={arr3} alt="icon"/>
                                                        )}
                                                        {transaction.type === "Received" && (
                                                            <img src={arr2} alt="icon"/>
                                                        )}
                                                        {transaction.type === "Exchanged" && (
                                                            <img src={arr1} alt="icon"/>
                                                        )}
                                                    </div>
                                                    <p>{transaction.type}</p>
                                                </div>
                                            )}
                                            {transaction.status === 'Pending' && (
                                                <div>
                                                    <div className="square yellow">
                                                        {transaction.type === "Sent" && (
                                                            <img src={arr3} alt="icon"/>
                                                        )}
                                                        {transaction.type === "Received" && (
                                                            <img src={arr2} alt="icon"/>
                                                        )}
                                                        {transaction.type === "Exchanged" && (
                                                            <img src={arr1} alt="icon"/>
                                                        )}
                                                    </div>
                                                    <p>{transaction.type}</p>
                                                </div>
                                            )}
                                            {transaction.status === 'Completed' && (
                                                <div>
                                                    <div className="square green">
                                                        {transaction.type === "Sent" && (
                                                            <img src={arr3} alt="icon"/>
                                                        )}
                                                        {transaction.type === "Received" && (
                                                            <img src={arr2} alt="icon"/>
                                                        )}
                                                        {transaction.type === "Exchanged" && (
                                                            <img src={arr1} alt="icon"/>
                                                        )}
                                                    </div>
                                                    <p>{transaction.type}</p>
                                                </div>
                                            )}
                                            <p>{transaction.quantity} {transaction.currency}</p>
                                            <p>{transaction.status}</p>
                                        </div>
                                    ))}
                                </div>
                            </NavLink>
                        </div>

                        <div className="block-3">
                            <ul>
                                <li>
                                    <div className="circle--yellow"></div>
                                    Bitcoin
                                </li>
                                <li>
                                    <div className="circle--blue"></div>
                                    Ethereum
                                </li>
                                <li>
                                    <div className="circle--orange"></div>
                                    Litecoin
                                </li>
                            </ul>
                            <div className="diagram">
                                <img src={diagram} alt="diagram"></img>
                            </div>
                        </div>
                        <div className="crypto-cards">
                            {currencies.map(currency => (
                                <div key={currency._id}>
                                    {currency.name === "BTC" && (
                                        <NavLink to="/my/trade/bitcoin" className="trade-btn">
                                            <div className="crypto-card">
                                                <img src={bitcoin} alt="bitcoin"></img>
                                                <div className="percentage--green">+1,16%</div>
                                                <div>${currency.USD}</div>
                                            </div>
                                        </NavLink>
                                    )
                                    }
                                    {currency.name === "LTC" && (
                                        <NavLink to="/my/trade/litecoin" className="trade-btn">
                                            <div className="crypto-card">
                                                <img src={litecoin} alt="litecoin"></img>
                                                <div className="percentage--red">-0,2%</div>
                                                <div>${currency.USD}</div>
                                            </div>
                                        </NavLink>
                                    )}
                                    {currency.name === "ETH" && (
                                        <NavLink to="/my/trade/ethereum" className="trade-btn">
                                            <div className="crypto-card">
                                                <img src={ethereum} alt="ethereum"></img>
                                                <div className="percentage--green">+6,05%</div>
                                                <div>${currency.USD}</div>
                                            </div>
                                        </NavLink>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default WalletPage;
