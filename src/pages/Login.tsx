import React, { useState, useEffect, useRef } from "react";
import {
    Link,
    Form,
    useActionData,
    useNavigate,
    useOutletContext,
} from "react-router-dom";

import { outletInterface } from "../utils/interfaces.ts";

export async function loginAction({ ...args }) {
    try {
        const loginData = await args.request.formData();
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
        localStorage.setItem("profileImageName", data.profileImageName);
        localStorage.setItem("profileImageAlt", data.profileImageAlt);
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("_id", data._id);
        sessionStorage.setItem("token", data.token);
        return {
            username: data.username,
            userId: data._id,
            status: data.status,
        };
    } catch (error) {
        const errorMessage = {
            status: "There has been an error, please try again later",
        };
        if (error instanceof Error) {
            errorMessage.status = error.message;
        }
        return errorMessage;
    }
}

interface actionInterface {
    status: string;
    username?: string;
    userId?: string;
}

export default function Login() {
    const loginData = useActionData() as actionInterface;
    const loginForm = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const [loginMessage, setLoginMessage] = useState("");
    const { setIsUserLoggedIn } = useOutletContext<outletInterface>();

    useEffect(() => {
        if (loginData) {
            setLoginMessage(loginData.status);
            if (
                loginData.status === "Login successful" &&
                sessionStorage.getItem("username")
            ) {
                setTimeout(() => {
                    if (loginForm.current) {
                        loginForm.current.reset();
                        setIsUserLoggedIn(true);
                        navigate("/profile");
                    }
                }, 1000);
            }
        }
    }, [loginData]);

    return (
        <section className="login-section">
            <Form className="login-form" method="post" ref={loginForm}>
                <h3>Enter Credentials</h3>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    className="input"
                    type="text"
                    name="username"
                    minLength={4}
                    maxLength={18}
                    pattern="[a-zA-Z0-9]+"
                    title="Letters and numbers only, between 4 and 18 characters"
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    className="input"
                    type="password"
                    name="password"
                    minLength={4}
                    maxLength={18}
                    pattern="[a-zA-Z0-9]+"
                    title="Letters and numbers only, between 4 and 18 characters"
                    required
                />

                <button type="submit" className="button">
                    Submit
                </button>

                <p className="login-form-message">{loginMessage}</p>
            </Form>
            <p className="new-account-text">
                Don{`'`}t have an account?{" "}
                <Link to="/register">Create a new account</Link>
            </p>
        </section>
    );
}