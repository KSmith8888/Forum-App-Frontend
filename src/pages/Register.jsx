import React from "react";

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
                name="confirm-password"
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
