import { useEffect, useRef } from "react";
import {
    Link,
    Form,
    useActionData,
    useNavigate,
    useOutletContext,
    useSearchParams,
} from "react-router";

import {
    outletInterface,
    loginActionData,
    savedPostInterface,
} from "../../utils/interfaces.ts";

import "../../assets/styles/login.css";

export default function Login() {
    const loginData = useActionData() as loginActionData;
    const loginForm = useRef<HTMLFormElement>(null);
    const [searchParams] = useSearchParams();
    const paramsMessage = searchParams.get("message");
    const navigate = useNavigate();
    const { setIsUserLoggedIn, setProfilePic } =
        useOutletContext<outletInterface>();

    useEffect(() => {
        if (loginData && typeof loginData === "object") {
            sessionStorage.setItem("role", loginData.role);
            sessionStorage.setItem("username", loginData.displayName);
            sessionStorage.setItem("_id", loginData._id);
            sessionStorage.setItem("token", loginData.token);
            const savedPosts: string[] = loginData.savedPosts.map(
                (post: savedPostInterface) => post.postId
            );
            sessionStorage.setItem("saved-posts", JSON.stringify(savedPosts));
            sessionStorage.setItem(
                "likedPosts",
                JSON.stringify(loginData.likedPosts)
            );
            sessionStorage.setItem(
                "likedComments",
                JSON.stringify(loginData.likedComments)
            );
            if (loginData.viewNSFW) {
                sessionStorage.setItem("view-nsfw", "true");
            }
            if (loginForm.current) {
                loginForm.current.reset();
            }
            setProfilePic({
                name: loginData.profileImageName,
                alt: loginData.profileImageAlt,
            });
            setIsUserLoggedIn(true);
            navigate("/profile");
        }
    }, [loginData]);

    return (
        <section className="login-section">
            <Form
                className="login-form"
                method="POST"
                autoComplete="on"
                ref={loginForm}
            >
                <p className="login-params-message">{paramsMessage}</p>
                <h3 className="login-form-heading">Enter Credentials</h3>
                <label htmlFor="username">Username or Email:</label>
                <input
                    id="username"
                    className="input"
                    type="text"
                    name="username"
                    minLength={4}
                    maxLength={40}
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
                <p className="new-account-text">
                    Don{`'`}t have an account?{" "}
                    <Link to="/register/" className="link">
                        Create a new account
                    </Link>
                </p>
                <p className="forgot-password-text">
                    Forgot your password?{" "}
                    <Link to="/reset/" className="link">
                        Reset it here
                    </Link>
                </p>
            </Form>
        </section>
    );
}
