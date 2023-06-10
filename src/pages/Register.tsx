import { Form, useActionData, redirect } from "react-router-dom";

import { loaderActionInterface } from "../utils/interfaces";

export async function registerAction({ request }: loaderActionInterface) {
    try {
        const loginData = await request.formData();
        const username = loginData.get("username");
        const password = loginData.get("password");
        const passwordConfirm = loginData.get("password-confirm");
        if (!username || !password) {
            throw new Error("You must provide a valid username and password");
        }
        if (typeof username !== "string" || typeof password !== "string") {
            throw new Error(
                "Please do not include special characters in your credentials"
            );
        }
        if (password !== passwordConfirm) {
            throw new Error(
                "The values in the password and confirm password fields must match"
            );
        }
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`,
            {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
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
