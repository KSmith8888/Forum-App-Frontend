import { Form, useActionData, useSearchParams } from "react-router-dom";

import "../assets/styles/verify-email.css";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const pendingId = searchParams.get("id");
    const actionData = useActionData();

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
            <input
                type="hidden"
                name="pendingId"
                value={typeof pendingId === "string" ? pendingId : ""}
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
