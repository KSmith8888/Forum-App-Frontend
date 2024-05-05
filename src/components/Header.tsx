import { useRef } from "react";
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
    profilePic,
    setProfilePic,
}: headerProps) {
    const navigate = useNavigate();
    const navModal = useRef<HTMLDialogElement>(null);
    const mobileTopicModal = useRef<HTMLDialogElement>(null);
    const userRole = sessionStorage.getItem("role");
    const isMod = userRole === "mod" || userRole === "admin";

    function closeNavModal() {
        if (navModal.current) {
            navModal.current.close();
        }
    }

    function closeTopicModal() {
        if (mobileTopicModal.current) {
            mobileTopicModal.current.close();
        }
    }

    function logoutUser() {
        closeNavModal();
        sessionStorage.clear();
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
                    4em
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
                <Link to="/search" className="button-link">
                    Search
                </Link>
                <button
                    className="button mobile-button"
                    onClick={() => {
                        if (mobileTopicModal.current) {
                            mobileTopicModal.current.showModal();
                        }
                    }}
                >
                    Topics
                </button>
            </div>
            <dialog ref={navModal} className="nav-modal">
                <div className="profile-container">
                    <img
                        src={`/profile-images/${profilePic.name}`}
                        alt={profilePic.alt}
                        className="profile-image"
                    />
                </div>
                <nav className="main-nav">
                    <Link
                        to="/"
                        className="main-menu-link"
                        onClick={() => {
                            closeNavModal();
                        }}
                    >
                        Home
                    </Link>
                    <Link
                        to="/search"
                        className="main-menu-link"
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
                                className="main-menu-link"
                                onClick={() => {
                                    closeNavModal();
                                }}
                            >
                                Profile
                            </Link>
                            <Link
                                to="/profile/create"
                                className="main-menu-link"
                                onClick={() => {
                                    closeNavModal();
                                }}
                            >
                                Create Post
                            </Link>
                            {isMod && (
                                <Link
                                    to="/moderation"
                                    className="main-menu-link"
                                    onClick={() => {
                                        closeNavModal();
                                    }}
                                >
                                    Moderation
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="main-menu-link"
                                onClick={() => {
                                    closeNavModal();
                                }}
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                className="main-menu-link"
                                onClick={() => {
                                    closeNavModal();
                                }}
                            >
                                Login
                            </Link>
                        </>
                    )}
                </nav>
                <div className="main-menu-button-container">
                    <button
                        className="button"
                        onClick={() => {
                            closeNavModal();
                        }}
                    >
                        Close
                    </button>
                    {isUserLoggedIn && (
                        <button className="button" onClick={logoutUser}>
                            Logout
                        </button>
                    )}
                </div>
            </dialog>
            <dialog className="mobile-topics-nav-modal" ref={mobileTopicModal}>
                <div className="mobile-topics-link-container">
                    <h2 className="mobile-topics-link-heading">Topics</h2>
                    <nav className="mobile-topics-links-nav">
                        <Link
                            to="/posts/movies"
                            className="mobile-topic-link"
                            onClick={() => {
                                closeTopicModal();
                            }}
                        >
                            Movies
                        </Link>
                        <Link
                            to="/posts/space"
                            className="mobile-topic-link"
                            onClick={() => {
                                closeTopicModal();
                            }}
                        >
                            Space
                        </Link>
                        <Link
                            to="/posts/politics"
                            className="mobile-topic-link"
                            onClick={() => {
                                closeTopicModal();
                            }}
                        >
                            Politics
                        </Link>
                        <Link
                            to="/posts/books"
                            className="mobile-topic-link"
                            onClick={() => {
                                closeTopicModal();
                            }}
                        >
                            Books
                        </Link>
                        <Link
                            to="/posts/games"
                            className="mobile-topic-link"
                            onClick={() => {
                                closeTopicModal();
                            }}
                        >
                            Games
                        </Link>
                        <Link
                            to="/posts/news"
                            className="mobile-topic-link"
                            onClick={() => {
                                closeTopicModal();
                            }}
                        >
                            News
                        </Link>
                        <Link
                            to="/posts/programming"
                            className="mobile-topic-link"
                            onClick={() => {
                                closeTopicModal();
                            }}
                        >
                            Programming
                        </Link>
                        <Link
                            to="/posts/other"
                            className="mobile-topic-link"
                            onClick={() => {
                                closeTopicModal();
                            }}
                        >
                            Other
                        </Link>
                    </nav>
                    <button
                        className="button"
                        onClick={() => {
                            closeTopicModal();
                        }}
                    >
                        Close
                    </button>
                </div>
            </dialog>
        </header>
    );
}
