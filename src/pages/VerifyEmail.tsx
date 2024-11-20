import { useEffect } from "react";
import { Form, useActionData } from "react-router-dom";

import "../assets/styles/verify-email.css";

export default function VerifyEmail() {
    const actionData = useActionData();
    useEffect(() => {
        if (typeof actionData === "string") {
            console.log(actionData);
        }
    }, [actionData]);
    return (
        <Form method="POST" className="verify-email-form">
            <h2 className="verify-email-heading">Verify Email</h2>
            <label htmlFor="code-input">Verification Code:</label>
            <input
                id="code-input"
                className="input"
                type="text"
                name="code"
                minLength={6}
                maxLength={6}
                required
            />
            <button type="submit" className="button">
                Submit
            </button>
            <p className="verify-email-text">
                Enter the code from the verification email that was sent
            </p>
            <p className="error-message">
                {typeof actionData === "string" ? actionData : ""}
            </p>
        </Form>
    );
}
