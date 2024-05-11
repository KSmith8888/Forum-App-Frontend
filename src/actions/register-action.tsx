import { redirect } from "react-router-dom";
import { loaderActionInterface } from "../utils/interfaces";

export default async function registerAction({
    request,
}: loaderActionInterface) {
    try {
        const loginData = await request.formData();
        const username = loginData.get("username");
        const password = loginData.get("password");
        const terms = loginData.get("terms");
        const passwordConfirm = loginData.get("password-confirm");
        if (!username || !password || !terms) {
            throw new Error(
                "You must provide a valid username and password and agree to the terms of service"
            );
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
                body: JSON.stringify({ username, password, terms }),
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
            "/login/?message=New account created successfully, please log in"
        );
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}
