import React, { useState, useEffect } from "react";
import { Link, Form, useActionData, redirect } from "react-router-dom";

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
        return {
            username: data.username,
            userId: data._id,
            status: data.status,
        };
    } catch (error) {
        const errorMessage = { status: error.message };
        return errorMessage;
    }
}

export default function Login() {
    const loginData = useActionData();
    const [loginMessage, setLoginMessage] = useState("");

    useEffect(() => {
        if (loginData) {
            setLoginMessage(loginData.status);
            if (
                loginData.status === "Login successful" &&
                sessionStorage.getItem("username")
            ) {
                setTimeout(() => {
                    loginForm.current.reset();
                    return redirect("/profile");
                }, 1000);
            }
        }
    }, [loginData]);

    return (
        <section className="login-section">
            <Form className="login-form" method="post">
                <h3>Enter Credentials</h3>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    className="input"
                    type="text"
                    name="username"
                    minLength="4"
                    maxLength="18"
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
                    minLength="4"
                    maxLength="18"
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
                Don't have an account?{" "}
                <Link to="/register">Create a new account</Link>
            </p>
        </section>
    );
}
