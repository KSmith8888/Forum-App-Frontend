import { Link, useNavigate } from "react-router-dom";
import { profilePicInterface } from "../utils/interfaces";

import "../assets/styles/header.css";

interface headerProps {
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
    numOfNotifications: number;
    profilePic: profilePicInterface;
    setProfilePic: (pic: profilePicInterface) => void;
}

export default function Header({
    isUserLoggedIn,
    setIsUserLoggedIn,
    numOfNotifications,
    profilePic,
    setProfilePic,
}: headerProps) {
    const navigate = useNavigate();
    const newNotifications = numOfNotifications > 0 ? true : false;

    function logoutUser() {
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("_id");
        sessionStorage.removeItem("token");
        setIsUserLoggedIn(false);
        setProfilePic({
            name: "blank.png",
            alt: "A generic, blank outline of a mans upper body",
        });
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
                        src={`/profile-images/${profilePic.name}`}
                        alt={profilePic.alt}
                        className="profile-image"
                    />
                    {isUserLoggedIn ? (
                        <div className="vertical-button-container">
                            {newNotifications && (
                                <p>Notifications: {numOfNotifications}</p>
                            )}
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
