import "./App.css";
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// import Navbar from "./components/navbar";
import MainPage from "./components/pages/mainPage";
import ChatBot from "./components/pages/chatBot";
import WalletPage from "./components/pages/walletPage";
// import TradePage from "./components/pages/tradePage";
import SettingsPage from "./components/pages/settingsPage";
import LoginPage from "./components/loginPage";
import SignUpPage from "./components/signUpPage";
import HomePage from "./components/homePage";
import BitcoinTrade from "./components/pages/tradePage/bitcoin";
import LitecoinTrade from "./components/pages/tradePage/litecoin";
import EthereumTrade from "./components/pages/tradePage/ethereum";
import TradePage from "./components/pages/tradePage";
import TransactionPage from "./components/pages/walletPage/transactions";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
        <div className="content">
          <Routes>
            <Route path="/my" element={<MainPage />} />
            <Route path="/my/chatbot" element={<ChatBot />} />
            <Route path="/my/wallet" element={<WalletPage />} />
            <Route
              path="/my/wallet/transactions"
              element={<TransactionPage />}
            />
            <Route path="/my/trade" element={<TradePage />} />
            <Route path="/my/trade/bitcoin" element={<BitcoinTrade />} />
            <Route path="/my/trade/litecoin" element={<LitecoinTrade />} />
            <Route path="/my/trade/ethereum" element={<EthereumTrade />} />
            <Route path="/my/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
