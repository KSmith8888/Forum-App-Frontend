import React from "react";
import { Form, redirect } from "react-router-dom";

export async function registerAction({ request }) {
    try {
        const loginData = await request.formData();
        const username = loginData.get("username");
        const password = loginData.get("password");
        const passwordConfirm = loginData.get("password-confirm");
        if (password !== passwordConfirm) {
            throw new Error(
                "The values in the password and confirm password fields must match"
            );
        }
        const res = await fetch("http://127.0.0.1:3000/api/v1/users", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error(`Status error ${res.status}`);
        }
        const data = await res.json();
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("_id", data._id);
        sessionStorage.setItem("token", data.token);
        return redirect("/search");
    } catch (error) {
        const errorMessage = { status: error.message };
        return errorMessage;
    }
}

export default function Register() {
    return (
        <Form className="login-form" ref={loginForm} method="post">
            <h3>Create new account</h3>
            <label htmlFor="register-username">
                Username (Letters and numbers only, between 4 and 18 characters)
            </label>
            <input
                id="register-username"
                className="input"
                type="text"
                name="username"
                pattern="[a-z0-9]{4,18}"
                title="Letters and numbers only, between 4 and 18 characters"
                required
            />
            <label htmlFor="register-password">
                Password (Letters and numbers only, between 4 and 18 characters)
            </label>
            <input
                id="register-password"
                className="input"
                type="text"
                name="password"
                pattern="[a-z0-9]{4,18}"
                title="Letters and numbers only, between 4 and 18 characters"
                required
            />
            <label htmlFor="register-password-confirm">
                Confirm your password:
            </label>
            <input
                id="register-password-confirm"
                className="input"
                type="text"
                name="password-confirm"
                pattern="[a-z0-9]{4,18}"
                title="Letters and numbers only, between 4 and 18 characters"
                required
            />

            <button type="submit" className="button">
                Submit
            </button>

            <p className="register-form-message"></p>
        </Form>
    );
}
