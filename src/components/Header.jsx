import React, { useRef, useState, useEffect } from "react";
import { Link, Form, useActionData } from "react-router-dom";

import profileImage from "../assets/images/blank-profile-picture.png";

export async function loginAction({ request }) {
    try {
        const loginData = await request.formData();
        const username = loginData.get("username");
        const password = loginData.get("password");
        if (!username || !password) {
            throw new Error("No username or password present");
        }
        const res = await fetch("http://127.0.0.1:3000/api/v1/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            if (res.status === 401) {
                throw new Error("Provided credentials do not match");
            } else {
                throw new Error(`Status error ${res.status}`);
            }
        }
        const data = await res.json();
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("_id", data._id);
        sessionStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        const errorMessage = { status: error.message };
        return errorMessage;
    }
}

export default function Header() {
    const loginModal = useRef();
    const loginForm = useRef();
    const [loginMessage, setLoginMessage] = useState("");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const loginData = useActionData();

    useEffect(() => {
        if (loginData) {
            setLoginMessage(loginData.status);
            if (loginData.status === "Login successful") {
                setTimeout(() => {
                    loginForm.current.reset();
                    closeLoginModal();
                }, 1000);
            }
            if (sessionStorage.getItem("username")) {
                setIsUserLoggedIn(true);
            }
        } else {
            setIsUserLoggedIn(false);
        }
    }, [loginData]);

    function openLoginModal() {
        loginModal.current.showModal();
    }

    function closeLoginModal() {
        loginModal.current.close();
    }

    function logoutUser() {
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("_id");
        sessionStorage.removeItem("token");
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
                    <Link to="/register" className="link">
                        Create Account
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
                    <div className="vertical-button-container">
                        <button className="button">Profile</button>
                        <button className="button" onCLick={logoutUser}>
                            Logout
                        </button>
                    </div>
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
                    <Form className="login-form" ref={loginForm} method="post">
                        <h3>Enter Credentials</h3>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            className="input"
                            type="text"
                            name="username"
                            minLength="4"
                            maxLength="18"
                            pattern="[a-z0-9]+"
                            title="Letters and numbers only, between 4 and 18 characters"
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            className="input"
                            type="text"
                            name="password"
                            minLength="4"
                            maxLength="18"
                            pattern="[a-z0-9]+"
                            title="Letters and numbers only, between 4 and 18 characters"
                            required
                        />
                        <div className="button-container">
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
                        </div>
                        <p className="login-form-message">{loginMessage}</p>
                    </Form>
                    <p className="new-account-text">
                        Don't have an account?{" "}
                        <Link to="/register">Create a new account</Link>
                    </p>
                </dialog>
            </div>
        </header>
    );
}
