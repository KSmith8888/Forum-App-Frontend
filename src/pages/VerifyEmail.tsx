import { Form, useActionData, useSearchParams } from "react-router";

import "../assets/styles/verify-email.css";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const pendingId = searchParams.get("id");
    const actionData = useActionData();

    return (
        <Form method="POST" className="verify-email-form">
            <h2 className="verify-email-heading">
                Enter the code that was sent to your email
            </h2>
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
                If the verification email is not in your inbox, please check the
                spam or junk folder
            </p>
            <p className="error-message">
                {typeof actionData === "string" ? actionData : ""}
            </p>
        </Form>
    );
}
