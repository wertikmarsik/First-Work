import React, {useEffect, useState} from "react";
import "./style.css";
import "../../../variables.css";
import Topbar from "../../../topBar";
import Navbar from "../../../navbar";
import arr from "../../../imgs/arr-left.svg";
import arr_both from "../../../imgs/ArrowLeftRight.svg";
import arr_b from "../../../imgs/ArrowBottom.svg";
import arr_t from "../../../imgs/ArrowTop.svg";
import {NavLink} from "react-router-dom";
import axios from "axios";
import arr3 from "../../../imgs/ArrowTop.svg";
import arr2 from "../../../imgs/ArrowBottom.svg";
import arr1 from "../../../imgs/ArrowLeftRight.svg";

function TransactionPage() {

    const [transactions, setTransactions] = useState([])

    const token = sessionStorage.getItem("Authorization")
    axios.defaults.headers.common.Authorization = token

    const getAllTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/transactions/getAll')

            if (response.status === 200) {
                setTransactions(response.data.message)
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllTransactions()
    }, [])

    return (
        <div>
            <Navbar/>
            <div className="main-page">
                <div className="main-wrapper">
                    <Topbar/>
                    <div className="main-page-wrapper">
                        <div className="transaction-page-name">
                            <NavLink to="/my/wallet" className="link-transactions">
                                <img src={arr} alt="arr-back"></img>
                            </NavLink>
                            <div>Transaction:</div>
                        </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionPage;
