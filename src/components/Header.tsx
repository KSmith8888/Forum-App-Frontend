import { useRef } from "react";
import { Link, useNavigate, Form } from "react-router-dom";
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
    const navModal = useRef<HTMLDialogElement>(null);

    function closeNavModal() {
        if (navModal.current) {
            navModal.current.close();
        }
    }

    function logoutUser() {
        closeNavModal();
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
            <h1 className="main-heading">
                <Link to="/" className="main-heading-link">
                    The Forum App
                </Link>
            </h1>
            <div className="header-info-container">
                <button
                    className="hamburger-menu-button"
                    aria-label="Open Menu"
                    onClick={() => {
                        if (navModal.current) {
                            navModal.current.showModal();
                        }
                    }}
                ></button>
                <Form
                    className="header-search-form"
                    method="post"
                    action="/search"
                    autoComplete="false"
                >
                    <label htmlFor="search-input">Search:</label>
                    <input
                        id="search-input"
                        type="search"
                        name="search"
                        className="header-search-input"
                        maxLength={30}
                    />
                    <button type="submit" className="header-search-button">
                        Search
                    </button>
                </Form>
            </div>
            <dialog ref={navModal} className="nav-modal">
                <div className="profile-container">
                    <img
                        src={`/profile-images/${profilePic.name}`}
                        alt={profilePic.alt}
                        className="profile-image"
                    />
                    {newNotifications && (
                        <p>Notifications: {numOfNotifications}</p>
                    )}
                </div>
                <nav className="main-nav">
                    <Link
                        to="/"
                        className="button-link"
                        onClick={() => {
                            closeNavModal();
                        }}
                    >
                        Home
                    </Link>
                    <Link
                        to="/search"
                        className="button-link"
                        onClick={() => {
                            closeNavModal();
                        }}
                    >
                        Search
                    </Link>
                    {isUserLoggedIn ? (
                        <>
                            <Link
                                to="/profile"
                                className="button-link"
                                onClick={() => {
                                    closeNavModal();
                                }}
                            >
                                Profile
                            </Link>
                            <Link
                                to="/profile/create"
                                className="button-link"
                                onClick={() => {
                                    closeNavModal();
                                }}
                            >
                                Create Post
                            </Link>
                            <button className="button" onClick={logoutUser}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="button-link"
                                onClick={() => {
                                    closeNavModal();
                                }}
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                className="button-link"
                                onClick={() => {
                                    closeNavModal();
                                }}
                            >
                                Login
                            </Link>
                        </>
                    )}
                </nav>
                <button
                    className="button"
                    onClick={() => {
                        closeNavModal();
                    }}
                >
                    Close
                </button>
            </dialog>
        </header>
    );
}
