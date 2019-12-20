import React from "react";
import logo from "../../../content/images/kaver-logo.svg";
import { kAppName } from "../../Constants";
import LoginButton from "../login-button/Login-button";
import "./App-header.css";

export default function AppHeader() {
    const handleLogoClick = () => {
        document.location.reload();
    };

    return (
        <div>
            <header className="App-header">
                <div className="Left-block-placeholder"></div>
                <div className="Logo-block" onClick={handleLogoClick}>
                    <img src={logo} className="App-logo" alt="Логотип" />
                    <span className="App-logo-text">{kAppName}</span>
                </div>
                <LoginButton></LoginButton>
            </header>
        </div>
    );
}
