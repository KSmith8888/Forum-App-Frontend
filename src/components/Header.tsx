import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../assets/styles/header.css";

import { headerProps } from "../utils/interfaces.ts";

export default function Header({
    isUserLoggedIn,
    setIsUserLoggedIn,
    profilePic,
    setProfilePic,
}: headerProps) {
    const navigate = useNavigate();
    const navModal = useRef<HTMLDialogElement>(null);
    const mobileTopicModal = useRef<HTMLDialogElement>(null);
    const mainHeading = useRef<HTMLAnchorElement>(null);
    const homeMenuLink = useRef<HTMLAnchorElement>(null);
    const firstTopicLink = useRef<HTMLAnchorElement>(null);
    const userRole = sessionStorage.getItem("role");
    const isMod = userRole === "mod" || userRole === "admin";
    const username = sessionStorage.getItem("username");

    function closeNavModal() {
        if (navModal.current && mainHeading.current) {
            navModal.current.close();
            mainHeading.current.focus();
        }
    }

    function closeTopicModal() {
        if (mobileTopicModal.current && mainHeading.current) {
            mobileTopicModal.current.close();
            mainHeading.current.focus();
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
                <Link to="/" className="main-heading-link" ref={mainHeading}>
                    4em
                </Link>
            </h1>
            <div className="header-info-container">
                <button
                    id="main-menu-button"
                    className="header-menu-button"
                    onClick={() => {
                        if (navModal.current && homeMenuLink.current) {
                            navModal.current.showModal();
                            homeMenuLink.current.focus();
                        }
                    }}
                >
                    Menu
                </button>
                <button
                    id="topics-menu-button"
                    className="header-menu-button"
                    onClick={() => {
                        if (
                            mobileTopicModal.current &&
                            firstTopicLink.current
                        ) {
                            mobileTopicModal.current.showModal();
                            firstTopicLink.current.focus();
                        }
                    }}
                >
                    Topics
                </button>
            </div>
            <dialog
                ref={navModal}
                className="nav-modal"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        closeNavModal();
                    }
                }}
            >
                <div className="menu-top-profile-container">
                    <div className="menu-profile-container">
                        <img
                            src={`/profile-images/${profilePic.name}`}
                            alt={profilePic.alt}
                            className="menu-profile-image"
                        />
                        <p className="main-menu-username">
                            {username || "User"}
                        </p>
                        {isUserLoggedIn && (
                            <button
                                id="menu-logout-button"
                                className="header-menu-button"
                                onClick={logoutUser}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                    <div className="main-menu-button-container">
                        <button
                            className="main-menu-close-button"
                            aria-label="Close main menu"
                            onClick={() => {
                                closeNavModal();
                            }}
                        >
                            X
                        </button>
                    </div>
                </div>
                <nav className="main-nav">
                    <Link
                        to="/"
                        className="main-menu-link"
                        onClick={() => {
                            closeNavModal();
                        }}
                        ref={homeMenuLink}
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
            </dialog>
            <dialog
                className="topics-nav-modal"
                ref={mobileTopicModal}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        closeTopicModal();
                    }
                }}
            >
                <div className="topics-modal-heading-container">
                    <h2 className="topics-link-heading">Topics</h2>
                    <button
                        className="close-topics-modal-button"
                        aria-label="Close topics menu"
                        onClick={() => {
                            closeTopicModal();
                        }}
                    >
                        X
                    </button>
                </div>
                <nav className="topics-links-nav">
                    <Link
                        to="/posts/movies"
                        className="topic-link"
                        onClick={() => {
                            closeTopicModal();
                        }}
                        ref={firstTopicLink}
                    >
                        Movies
                    </Link>
                    <Link
                        to="/posts/space"
                        className="topic-link"
                        onClick={() => {
                            closeTopicModal();
                        }}
                    >
                        Space
                    </Link>
                    <Link
                        to="/posts/politics"
                        className="topic-link"
                        onClick={() => {
                            closeTopicModal();
                        }}
                    >
                        Politics
                    </Link>
                    <Link
                        to="/posts/books"
                        className="topic-link"
                        onClick={() => {
                            closeTopicModal();
                        }}
                    >
                        Books
                    </Link>
                    <Link
                        to="/posts/games"
                        className="topic-link"
                        onClick={() => {
                            closeTopicModal();
                        }}
                    >
                        Games
                    </Link>
                    <Link
                        to="/posts/news"
                        className="topic-link"
                        onClick={() => {
                            closeTopicModal();
                        }}
                    >
                        News
                    </Link>
                    <Link
                        to="/posts/programming"
                        className="topic-link"
                        onClick={() => {
                            closeTopicModal();
                        }}
                    >
                        Programming
                    </Link>
                    <Link
                        to="/posts/other"
                        className="topic-link"
                        onClick={() => {
                            closeTopicModal();
                        }}
                    >
                        Other
                    </Link>
                </nav>
            </dialog>
        </header>
    );
}
