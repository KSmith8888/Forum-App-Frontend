import { redirect } from "react-router";
import { loaderActionInterface } from "../utils/interfaces";

export default async function registerAction({
    request,
}: loaderActionInterface) {
    try {
        const loginData = await request.formData();
        const username = loginData.get("username");
        const password = loginData.get("password");
        const email = loginData.get("email");
        const terms = loginData.get("terms");
        const passwordConfirm = loginData.get("password-confirm");
        const reg = new RegExp("^[a-zA-Z0-9.:,?/_'!@-]+$");
        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            typeof passwordConfirm !== "string" ||
            typeof email !== "string" ||
            terms !== "terms"
        ) {
            throw new Error(
                "You must provide a valid username and password and agree to the terms of service"
            );
        }
        if (
            !reg.test(password) ||
            !reg.test(passwordConfirm) ||
            !reg.test(email)
        ) {
            throw new Error("Please do not include special characters");
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
                body: JSON.stringify({ username, password, terms, email }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!res.ok) {
            const errorData = await res.json();
            if (errorData && errorData.message) {
                throw new Error(errorData.message);
            } else {
                throw new Error(`Response error: ${res.status}`);
            }
        }
        const data = await res.json();
        if (
            !data ||
            typeof data !== "object" ||
            !("pendingId" in data) ||
            typeof data.pendingId !== "string"
        ) {
            throw new Error(
                "There has been an error creating your account, please try again later"
            );
        }
        return redirect(`/verify/?id=${data.pendingId}`);
    } catch (error) {
        let errorMsg = "There has been an error, please try again later";
        if (error instanceof Error) {
            errorMsg = error.message;
        }
        return errorMsg;
    }
}
