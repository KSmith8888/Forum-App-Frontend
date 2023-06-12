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
            const errorData = await res.json();
            if (errorData && errorData.msg) {
                throw new Error(errorData.msg);
            } else {
                throw new Error(`Response error: ${res.status}`);
            }
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
    const registrationMessage = useActionData();

    return (
        <Form className="register-form" method="post">
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
                Password{" "}
                <span className="block-label-text">
                    (Letters, numbers and underscores only, between 4 and 18
                    characters)
                </span>
            </label>
            <input
                id="register-password"
                className="input"
                type="password"
                name="password"
                pattern="[a-zA-Z0-9_]+"
                minLength={4}
                maxLength={18}
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
                pattern="[a-zA-Z0-9_]+"
                minLength={4}
                maxLength={18}
                required
            />

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
