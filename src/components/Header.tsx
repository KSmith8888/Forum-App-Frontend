import React from "react";
import { Link, useNavigate } from "react-router-dom";

import profileImage from "../assets/images/blank-profile-picture.png";

interface headerProps {
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
}

export default function Header({
    isUserLoggedIn,
    setIsUserLoggedIn,
}: headerProps) {
    const navigate = useNavigate();

    function logoutUser() {
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("_id");
        sessionStorage.removeItem("token");
        setIsUserLoggedIn(false);
        navigate("/?message=You have logged out successfully");
    }

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
                    <Link to="/posts/books" className="link">
                        Books
                    </Link>
                    <Link to="/posts/games" className="link">
                        Games
                    </Link>
                    <Link to="/posts/movies" className="link">
                        Movies
                    </Link>
                    <Link to="/posts/other" className="link">
                        Other
                    </Link>
                    <Link to="/register" className="link">
                        Create Account
                    </Link>
                </nav>
            </div>
            <div className="profile-container">
                <img
                    src={profileImage}
                    alt="A generic blank avatar image of a mans head"
                    className="profile-image"
                />
                {isUserLoggedIn ? (
                    <div className="vertical-button-container">
                        <Link to="/profile" className="button-link">
                            Profile
                        </Link>
                        <button className="button" onClick={logoutUser}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="button-link">
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}
