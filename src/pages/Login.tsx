import { useState, useEffect, useRef } from "react";
import {
    Link,
    Form,
    useActionData,
    useNavigate,
    useOutletContext,
} from "react-router-dom";

import { outletInterface, loaderActionInterface } from "../utils/interfaces.ts";

export async function loginAction({ request }: loaderActionInterface) {
    try {
        const loginData = await request.formData();
        const username = loginData.get("username");
        const password = loginData.get("password");
        if (!username || !password) {
            throw new Error("No username or password present");
        }
        if (typeof username !== "string" || typeof password !== "string") {
            throw new Error(
                "Please do not include special characters in your credentials"
            );
        }
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/login`,
            {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!res.ok) {
            if (res.status === 401) {
                throw new Error("Provided credentials do not match");
            } else {
                throw new Error(`Status error ${res.status}`);
            }
        }
        const data = await res.json();
        if (
            typeof data === "object" &&
            "role" in data &&
            "displayName" in data &&
            "_id" in data &&
            "token" in data
        ) {
            sessionStorage.setItem("role", data.role);
            sessionStorage.setItem("username", data.displayName);
            sessionStorage.setItem("_id", data._id);
            sessionStorage.setItem("token", data.token);
        } else {
            throw new Error("There has been an error, please try again later");
        }
        return data;
    } catch (error) {
        let errorMessage = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return errorMessage;
    }
}

export default function Login() {
    const loginData = useActionData();
    const loginForm = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const [loginMessage, setLoginMessage] = useState("");
    const { setIsUserLoggedIn, setProfilePic } =
        useOutletContext<outletInterface>();

    useEffect(() => {
        if (
            loginData &&
            typeof loginData === "object" &&
            !Array.isArray(loginData) &&
            "status" in loginData &&
            typeof loginData.status === "string" &&
            "profileImageName" in loginData &&
            "profileImageAlt" in loginData &&
            typeof loginData.profileImageName === "string" &&
            typeof loginData.profileImageAlt === "string" &&
            loginData.status === "Login successful" &&
            sessionStorage.getItem("username")
        ) {
            if (loginForm.current) {
                loginForm.current.reset();
            }
            setProfilePic({
                name: loginData.profileImageName,
                alt: loginData.profileImageAlt,
            });
            setIsUserLoggedIn(true);
            navigate("/profile");
        } else if (typeof loginData === "string") {
            setLoginMessage(loginData);
        }
    }, [loginData]);

    return (
        <section className="login-section">
            <Form className="login-form" method="post" ref={loginForm}>
                <h3>Enter Credentials</h3>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    className="input"
                    type="text"
                    name="username"
                    minLength={4}
                    maxLength={18}
                    pattern="[a-zA-Z0-9]+"
                    title="Letters and numbers only, between 4 and 18 characters"
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    className="input"
                    type="password"
                    name="password"
                    minLength={4}
                    maxLength={18}
                    pattern="[a-zA-Z0-9]+"
                    title="Letters and numbers only, between 4 and 18 characters"
                    required
                />

                <button type="submit" className="button">
                    Submit
                </button>

                <p className="login-form-message">{loginMessage}</p>
            </Form>
            <p className="new-account-text">
                Don{`'`}t have an account?{" "}
                <Link to="/register">Create a new account</Link>
            </p>
        </section>
    );
}
