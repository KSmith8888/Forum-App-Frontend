import { Form, useActionData, useSearchParams } from "react-router-dom";

import "../assets/styles/reset.css";

export default function CompleteReset() {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");
    const actionData = useActionData();

    return (
        <Form className="reset-password-form" method="POST" autoComplete="off">
            <h2 className="">Complete Password Reset</h2>
            <p>
                Enter the verification code sent to your email and the new
                password you want to use
            </p>
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
                value={typeof userId === "string" ? userId : ""}
                name="userId"
            />
            <label htmlFor="complete-reset-password">
                New Password:
                <span className="block-label-text">
                    (Between 8 and 40 characters)
                </span>
            </label>
            <input
                id="complete-reset-password"
                className="input"
                type="password"
                name="password"
                minLength={8}
                maxLength={40}
                required
            />
            <label htmlFor="complete-reset-confirm">
                Confirm New Password:
            </label>
            <input
                id="complete-reset-confirm"
                className="input"
                type="password"
                name="password-confirm"
                minLength={8}
                maxLength={40}
                required
            />
            <p>
                If the reset email is not in your inbox, please check the spam
                or junk folder
            </p>
            <button type="submit" className="button">
                Submit
            </button>

            <p className="error-message">
                {typeof actionData === "string" ? actionData : ""}
            </p>
        </Form>
    );
}
