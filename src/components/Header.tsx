import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../assets/styles/header.css";

interface headerProps {
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
    hasPicBeenUpdated: boolean;
}

export default function Header({
    isUserLoggedIn,
    setIsUserLoggedIn,
    hasPicBeenUpdated,
}: headerProps) {
    const navigate = useNavigate();
    let profileImageName = "blank.png";
    let profileImageAlt = "A generic, blank outline of a mans upper body";
    function profilePicPath() {
        const profileImage = localStorage.getItem("profileImageName");
        const profileAltText = localStorage.getItem("profileImageAlt");
        if (profileImage && profileAltText) {
            profileImageName = profileImage;
            profileImageAlt = profileAltText;
        }
    }
    if (isUserLoggedIn) {
        profilePicPath();
    }
    useEffect(() => {
        if (hasPicBeenUpdated) {
            profilePicPath();
        }
    }, [hasPicBeenUpdated]);

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
            <h1 className="main-heading">The Forum App</h1>
            <div className="header-info-container">
                <nav className="main-nav">
                    <Link to="/" className="link">
                        Home
                    </Link>
                    <Link to="/search" className="link">
                        Search Posts
                    </Link>
                    <Link to="/register" className="link">
                        Create Account
                    </Link>
                </nav>

                <div className="profile-container">
                    <img
                        src={`/profile-images/${profileImageName}`}
                        alt={profileImageAlt}
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
            </div>
        </header>
    );
}
