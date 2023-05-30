import React from "react";
import { Form, useActionData, redirect } from "react-router-dom";

export async function registerAction({ ...args }) {
    try {
        const loginData = await args.request.formData();
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
        return redirect(
            "/?message=New account created successfully, please log in"
        );
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}

export default function Register() {
    const registrationMessage = useActionData() as string;

    return (
        <Form className="register-form" method="post">
            <h2>Create new account</h2>
            <label htmlFor="register-username">
                Username (Letters and numbers only, between 4 and 18 characters)
            </label>
            <input
                id="register-username"
                className="input"
                type="text"
                name="username"
                pattern="[a-zA-Z0-9]+"
                minLength={4}
                maxLength={18}
                title="Letters and numbers only, between 4 and 18 characters"
                required
            />
            <label htmlFor="register-password">
                Password (Letters and numbers only, between 4 and 18 characters)
            </label>
            <input
                id="register-password"
                className="input"
                type="password"
                name="password"
                pattern="[a-zA-Z0-9]+"
                minLength={4}
                maxLength={18}
                title="Letters and numbers only, between 4 and 18 characters"
                required
            />
            <label htmlFor="register-password-confirm">
                Confirm your password:
            </label>
            <input
                id="register-password-confirm"
                className="input"
                type="password"
                name="password-confirm"
                pattern="[a-zA-Z0-9]+"
                minLength={4}
                maxLength={18}
                title="Letters and numbers only, between 4 and 18 characters"
                required
            />

            <button type="submit" className="button">
                Submit
            </button>

            <p className="error-message">
                {registrationMessage ? registrationMessage : ""}
            </p>
        </Form>
    );
}
