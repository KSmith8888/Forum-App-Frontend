import { Form, useActionData, Link } from "react-router-dom";

import "../assets/styles/register.css";

export default function Register() {
    const registrationMessage = useActionData();

    return (
        <Form className="register-form" method="post" autoComplete="off">
            <h2>Create new account</h2>
            <label htmlFor="register-username">
                Username
                <span className="block-label-text">
                    (Letters, numbers and underscores only, between 4 and 18
                    characters)
                </span>
            </label>
            <input
                id="register-username"
                className="input"
                type="text"
                name="username"
                pattern="[a-zA-Z0-9_]+"
                minLength={4}
                maxLength={18}
                required
            />
            <label htmlFor="register-password">
                Password
                <span className="block-label-text">
                    (Between 8 and 40 characters)
                </span>
            </label>
            <input
                id="register-password"
                className="input"
                type="password"
                name="password"
                minLength={8}
                maxLength={40}
                required
            />
            <label htmlFor="register-password-confirm">Confirm Password</label>
            <input
                id="register-password-confirm"
                className="input"
                type="password"
                name="password-confirm"
                minLength={8}
                maxLength={40}
                required
            />
            <div id="terms-input-container">
                <input
                    id="accept-terms-input"
                    className="checkbox"
                    type="checkbox"
                    name="terms"
                    value="terms"
                    required
                />
                <label htmlFor="accept-terms-input">
                    I agree to the{" "}
                    <Link to="/terms" target="_blank" className="link">
                        Terms of Service
                    </Link>
                </label>
            </div>

            <button type="submit" className="button">
                Submit
            </button>

            <p className="error-message">
                {typeof registrationMessage === "string"
                    ? registrationMessage
                    : ""}
            </p>
        </Form>
    );
}
