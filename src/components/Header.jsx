import React, { useRef, useState } from "react";
import { Link, Form } from "react-router-dom";

import { attemptLogin } from "../utils/login";

import profileImage from "../assets/images/blank-profile-picture.png";

export default function Header() {
    const loginModal = useRef();
    const loginForm = useRef();
    const [loginMessage, setLoginMessage] = useState("");
    const userId = sessionStorage.getItem("user-id");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(userId);

    function openLoginModal() {
        loginModal.current.showModal();
    }

    function closeLoginModal() {
        loginModal.current.close();
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
                    <Link to="/create" className="link">
                        Create Post
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
                    <button>Profile</button>
                ) : (
                    <button
                        type="button"
                        className="button"
                        onClick={openLoginModal}
                    >
                        Login
                    </button>
                )}
                <dialog className="modal" ref={loginModal}>
                    <Form
                        className="login-form"
                        ref={loginForm}
                        method="post"
                        onSubmit={(e) => {
                            attemptLogin(e);
                            loginForm.current.reset();
                            closeLoginModal();
                        }}
                    >
                        <h3>Enter Credentials</h3>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            className="input"
                            type="text"
                            name="username"
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            className="input"
                            type="text"
                            name="password"
                            required
                        />
                        <button type="submit" className="button">
                            Submit
                        </button>
                        <button
                            type="button"
                            className="button"
                            onClick={closeLoginModal}
                        >
                            Close
                        </button>
                        <p>{loginMessage}</p>
                    </Form>
                </dialog>
            </div>
        </header>
    );
}
