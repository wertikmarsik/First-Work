import {React, useEffect, useRef, useState} from "react";
import "./style.css";
import Topbar from "../../../topBar";
import Navbar from "../../../navbar";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {CategoryScale, Chart, LinearScale, LineElement, PointElement} from "chart.js";
import {Line} from "react-chartjs-2";

function BitcoinTrade() {
    const buttonCrypto = useRef(null);
    const [cryptoList, setcryptoList] = useState(false);
    const [limit, setLimit] = useState(2000)
    const [chartData, setChartData] = useState(null);

    Chart.register(CategoryScale, LinearScale, PointElement, LineElement);


    const getBTC = () => {
        axios
            .get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=${limit}`)
            .then((response) => {
                const data = response.data.Data.Data;
                const chartLabels = data.map((item) => new Date(item.time * 1000).toLocaleDateString());
                const chartValues = data.map((item) => item.close);

                setChartData({
                    labels: chartLabels,
                    datasets: [
                        {
                            label: 'Bitcoin Price (USD)',
                            data: chartValues,
                            fill: false,
                            borderColor: '#ffe150',
                        },
                    ],
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const changeCrypto = () => {
        if (cryptoList) {
            setcryptoList(false);
        }
        if (!cryptoList) {
            setcryptoList(true);
        }
    };

    const [currency, setCurrency] = useState({})

    const [selectedValue, setSelectedValue] = useState('value1')

    const getCurrency = async () => {
        try {
            const response = await axios.get('http://localhost:3000/currency/getBTC')

            if (response.status === 200) {
                setCurrency(response.data.message[0])
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = (value) => {
        setLimit(value)
        getBTC()
    }
    useEffect(() => {
        getCurrency()
        getBTC()
    }, [])

    return (
        <div>
            <Navbar/>
            <div className="main-page">
                <div className="main-wrapper">
                    <Topbar/>
                    <div className="trade-crypto-wrapper">
                        <div className="graphic-wrapper">
                            <div className="trade-panel">
                                <div className="time-period">
                                    <div onClick={() => handleClick(1)}>1D</div>
                                    <div onClick={() => handleClick(7)}>7D</div>
                                    <div onClick={() => handleClick(31)}>1M</div>
                                    <div onClick={() => handleClick(93)}>3M</div>
                                    <div onClick={() => handleClick(366)}>1Y</div>
                                    <div onClick={() => handleClick(2000)}>YTD</div>
                                </div>
                                <div
                                    className="crypto-name-block-bitcoin"
                                    useref={buttonCrypto}
                                    onClick={changeCrypto}
                                >
                                    BTC
                                    <div
                                        className={
                                            cryptoList
                                                ? "crypto-name-content open"
                                                : "crypto-name-content"
                                        }
                                    >
                                        <NavLink to="/my/trade/bitcoin" className="trade-btn">
                                            <div>BTC</div>
                                        </NavLink>
                                        <NavLink to="/my/trade/litecoin" className="trade-btn">
                                            <div>LTC</div>
                                        </NavLink>
                                        <NavLink to="/my/trade/ethereum" className="trade-btn">
                                            <div>ETH</div>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="currency-trade">Currency</div>
                                <select className="currency-dropdown" value={selectedValue}
                                        onChange={(e) => setSelectedValue(e.target.value)}>
                                    <option value="value1">USD - $</option>
                                    <option value="value2">UAH - ₴</option>
                                    <option value="value3">EUR - €</option>
                                </select>
                            </div>
                            <div className="graphic-img">
                                <div>
                                    <h2>Bitcoin Price Chart</h2>
                                    {chartData ? <Line data={chartData}/> : <p>Loading chart...</p>}
                                </div>
                            </div>
                        </div>
                        <div className="crypto-calculator">
                            {selectedValue === "value1" && (
                                <div className="price-block-bitcoin">1 BTC = USD $ {currency.USD}</div>
                            )}
                            {selectedValue === "value2" && (
                                <div className="price-block-bitcoin">1 BTC = UAH ₴ {currency.UAH}</div>
                            )}
                            {selectedValue === "value3" && (
                                <div className="price-block-bitcoin">1 BTC = EUR € {currency.EUR}</div>
                            )}
                            <div className="calculator"></div>
                            <p>BTC Price Calculator</p>
                        </div>
                        <div className="crypto-description">
                            <h3>BTC Price Live Data</h3>
                            <div>
                                The live price of Bitcoin is C$ 38,074.59 per (BTC / CAD) today
                                with a current market cap of C$ 736.98B CAD. 24-hour trading
                                volume is C$ 21.65B CAD. BTC to CAD price is updated in
                                real-time. Bitcoin is +2.1% in the last 24 hours. It has a
                                circulating supply of 19.36M CAD.
                            </div>
                        </div>
                        <div className="crypto-table">
                            <div className="top-elem">
                                <div>Change</div>
                                <div>Amount</div>
                                <div>%</div>
                            </div>
                            <div>
                                <div>Today</div>
                                <div className="crypto-red">$ -0.9107464</div>
                                <div className="crypto-red">-1%</div>
                            </div>
                            <div>
                                <div>30 Days</div>
                                <div className="crypto-green">$ 5.7573653</div>
                                <div className="crypto-green">+6.3%</div>
                            </div>
                            <div>
                                <div>60 Days</div>
                                <div className="crypto-red">$ -5.2854197</div>
                                <div className="crypto-red">-5.78%</div>
                            </div>
                            <div>
                                <div>90 Days</div>
                                <div className="crypto-green">$ 19.18</div>
                                <div className="crypto-green">+20.98%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BitcoinTrade;
