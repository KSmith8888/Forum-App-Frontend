import { useState, useEffect, useRef } from "react";
import {
    Link,
    Form,
    useActionData,
    useNavigate,
    useOutletContext,
    useSearchParams,
} from "react-router-dom";

import { outletInterface } from "../utils/interfaces.ts";

import "../assets/styles/login.css";

export default function Login() {
    const loginData = useActionData();
    const loginForm = useRef<HTMLFormElement>(null);
    const [searchParams] = useSearchParams();
    const paramsMessage = searchParams.get("message");
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
            <Form
                className="login-form"
                method="post"
                autoComplete="on"
                ref={loginForm}
            >
                <p className="login-params-message">{paramsMessage}</p>
                <h3 className="login-form-heading">Enter Credentials</h3>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    className="input"
                    type="text"
                    name="username"
                    minLength={4}
                    maxLength={18}
                    pattern="[a-zA-Z0-9_]+"
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    className="input"
                    type="password"
                    name="password"
                    minLength={8}
                    maxLength={40}
                    required
                />

                <button type="submit" className="button">
                    Submit
                </button>

                <p className="login-form-message">{loginMessage}</p>
                <p className="new-account-text">
                    Don{`'`}t have an account?{" "}
                    <Link to="/register" className="link">
                        Create a new account
                    </Link>
                </p>
            </Form>
        </section>
    );
}
