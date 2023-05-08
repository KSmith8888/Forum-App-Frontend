import React, { useRef } from "react";
import { Link, Form } from "react-router-dom";

import profileImage from "../assets/images/blank-profile-picture.png";

export default function Header() {
    const loginModal = useRef();

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
                <button
                    type="button"
                    className="button"
                    onClick={openLoginModal}
                >
                    Login
                </button>
                <dialog className="modal" ref={loginModal}>
                    <Form className="login-form" method="post">
                        <h3>Enter Credentials</h3>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
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
                    </Form>
                </dialog>
            </div>
        </header>
    );
}
