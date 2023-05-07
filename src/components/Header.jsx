import React from "react";
import { Link } from "react-router-dom";

import profileImage from "../assets/images/blank-profile-picture.png";

export default function Header() {
    return (
        <header className="header">
            <div className="heading-nav-container">
                <h1 className="main-heading">The Forum App</h1>
                <nav className="main-nav">
                    <Link to="/" className="link">
                        Home
                    </Link>
                    <Link to="/search" className="link">
                        Search Posts
                    </Link>
                    <Link to="/test" className="link">
                        Not Found
                    </Link>
                </nav>
            </div>
            <div className="profile-container">
                <img
                    src={profileImage}
                    alt="A generic blank avatar image of a mans head"
                    className="profile-image"
                />
                <button type="button" className="button">
                    Login
                </button>
            </div>
        </header>
    );
}
