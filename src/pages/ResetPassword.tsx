import { useEffect, useRef } from "react";
import { Form, useActionData } from "react-router";

import "../assets/styles/reset.css";

export default function ResetPassword() {
    const actionData = useActionData();
    const resetForm = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (
            actionData &&
            typeof actionData === "object" &&
            "token" in actionData &&
            resetForm.current
        ) {
            resetForm.current.reset();
        }
    }, [actionData]);
    return (
        <Form method="POST" className="reset-password-form" ref={resetForm}>
            <h2 className="reset-password-heading">Reset Password</h2>
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
            <p
                className={
                    typeof actionData === "string"
                        ? "error-message"
                        : "reset-form-text"
                }
            >
                {typeof actionData === "string"
                    ? actionData
                    : "An email will be sent with instructions for how to reset your password"}
            </p>
        </Form>
    );
}
