import { useEffect, useRef } from "react";
import { Form, useActionData } from "react-router-dom";

import "../assets/styles/reset.css";

export default function ResetPassword() {
    const actionData = useActionData();
    const resetForm = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (typeof actionData === "string" && resetForm.current) {
            console.log(actionData);
            resetForm.current.reset();
        }
    }, [actionData]);
    return (
        <Form method="POST" className="reset-password-form" ref={resetForm}>
            <h2 className="reser-password-heading">Reset Password</h2>
            <label htmlFor="reset-username">Username:</label>
            <input
                id="reset-username"
                className="input"
                type="text"
                name="username"
                minLength={4}
                maxLength={18}
                required
            />
            <label htmlFor="reset-email">Email:</label>
            <input
                id="reset-email"
                className="input"
                type="email"
                name="email"
                minLength={6}
                maxLength={40}
                required
            />
            <button type="submit" className="button">
                Submit
            </button>
            <p className="reset-form-text">
                If the email on your account is not verified, check for the
                verification message and verify it first.
            </p>
            <p className="reset-form-text">
                You should receive a message soon with instructions for how to
                reset your password.
            </p>
        </Form>
    );
}
